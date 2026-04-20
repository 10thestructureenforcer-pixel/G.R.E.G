import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

function buildStrategyPrompt(intake) {
  return `You are G.R.E.G — an elite AI immigration law strategist.

CASE INTAKE:
- Client: ${intake.clientName}
- Type: ${intake.caseType}
- Jurisdiction: ${intake.jurisdiction}
- Facts: ${intake.facts}

Generate a complete strategy tree. Return ONLY valid JSON in this exact shape:
{
  "primary": {
    "title": "string",
    "description": "string",
    "probability": number,
    "actions": ["string", "string"]
  },
  "fallbackB": {
    "title": "string",
    "description": "string",
    "probability": number,
    "actions": ["string", "string"]
  },
  "fallbackC": {
    "title": "string",
    "description": "string",
    "probability": number,
    "actions": ["string", "string"]
  }
}`;
}

function buildRiskPrompt(intake) {
  return `You are G.R.E.G — an elite AI immigration law risk analyst.

CASE:
- Type: ${intake.caseType}
- Jurisdiction: ${intake.jurisdiction}
- Facts: ${intake.facts}

Identify all legal risk factors. Return ONLY valid JSON array:
[
  {
    "severity": "CRITICAL" | "MEDIUM" | "LOW",
    "title": "string",
    "detail": "string",
    "action": "string"
  }
]
Include 3-6 risks. Always include at least one CRITICAL if facts suggest exposure.`;
}

function buildCrossExamPrompt(intake) {
  return `You are G.R.E.G — an elite AI immigration law trial strategist.

CASE:
- Client: ${intake.clientName}
- Type: ${intake.caseType}
- Jurisdiction: ${intake.jurisdiction}
- Facts: ${intake.facts}

Generate cross-examination flows for TWO witnesses. Return ONLY valid JSON array:
[
  {
    "witnessName": "string",
    "witnessRole": "string",
    "witnessType": "HOSTILE" | "FRIENDLY" | "NEUTRAL",
    "questions": [
      {
        "question": "string",
        "intent": "string",
        "redirect": "string"
      }
    ]
  }
]
Each witness should have 3-4 questions. Make questions specific to the facts provided.`;
}

async function runAnalysis(intakeId) {
  const intake = await prisma.caseIntake.findUnique({ where: { id: intakeId } });
  if (!intake) throw new Error(`Intake ${intakeId} not found`);

  await prisma.caseIntake.update({ where: { id: intakeId }, data: { status: "PROCESSING" } });

  try {
    const [strategyRaw, riskRaw, crossExamRaw] = await Promise.all([
      generateText({ model: openai("gpt-4o-mini"), prompt: buildStrategyPrompt(intake), maxTokens: 1000 }),
      generateText({ model: openai("gpt-4o-mini"), prompt: buildRiskPrompt(intake), maxTokens: 800 }),
      generateText({ model: openai("gpt-4o-mini"), prompt: buildCrossExamPrompt(intake), maxTokens: 1200 }),
    ]);

    const strategyJson = JSON.parse(strategyRaw.text.trim());
    await prisma.strategyTree.create({
      data: {
        caseIntakeId: intakeId,
        primaryPath: JSON.stringify(strategyJson.primary),
        fallbackB: JSON.stringify(strategyJson.fallbackB),
        fallbackC: JSON.stringify(strategyJson.fallbackC),
        primaryProb: strategyJson.primary.probability,
        fallbackBProb: strategyJson.fallbackB.probability,
        fallbackCProb: strategyJson.fallbackC.probability,
        rawOutput: strategyRaw.text,
      },
    });

    const riskJson = JSON.parse(riskRaw.text.trim());
    const hasCritical = riskJson.some((r) => r.severity === "CRITICAL");
    await prisma.riskFlag.createMany({
      data: riskJson.map((risk) => ({
        caseIntakeId: intakeId,
        severity: risk.severity,
        title: risk.title,
        detail: risk.detail,
        action: risk.action,
      })),
    });

    const crossExamJson = JSON.parse(crossExamRaw.text.trim());
    await prisma.crossExam.createMany({
      data: crossExamJson.map((exam) => ({
        caseIntakeId: intakeId,
        witnessName: exam.witnessName,
        witnessRole: exam.witnessRole,
        witnessType: exam.witnessType,
        questions: JSON.stringify(exam.questions),
      })),
    });

    await prisma.caseIntake.update({
      where: { id: intakeId },
      data: { status: "COMPLETE", riskTier: hasCritical ? "HIGH" : intake.riskTier },
    });
  } catch (error) {
    await prisma.caseIntake.update({ where: { id: intakeId }, data: { status: "FAILED" } });
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { intakeId } = await req.json();
    if (!intakeId) return NextResponse.json({ error: "intakeId required" }, { status: 400 });
    await runAnalysis(intakeId);
    return NextResponse.json({ success: true, intakeId });
  } catch (error) {
    console.error("[intake/analyze POST]", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const intakeId = searchParams.get("intakeId");
  if (!intakeId) return NextResponse.json({ error: "intakeId required" }, { status: 400 });

  const intake = await prisma.caseIntake.findUnique({
    where: { id: intakeId },
    select: {
      id: true, status: true, riskTier: true, clientName: true, caseType: true, jurisdiction: true,
      strategyTree: true,
      riskFlags: { orderBy: [{ severity: "asc" }, { createdAt: "asc" }] },
      crossExams: true,
    },
  });

  return NextResponse.json(intake);
}
