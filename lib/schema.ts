import { z } from "zod";

export const visaComparisonSchema = z.object({
  comparisons: z.array(
    z.object({
      visaType: z.string(),
      eligibility: z.object({
        requirements: z.array(z.string()),
        qualifications: z.array(z.string()),
        restrictions: z.array(z.string()).optional(),
        specialRequirements: z.array(z.string()).optional(),
      }),
      timeline: z.object({
        processingTime: z.string(),
        steps: z.array(z.string()),
        estimatedDuration: z.string(),
      }),
      risks: z.object({
        redFlags: z.array(z.string()),
        riskLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
        mitigationStrategies: z.array(z.string()).optional(),
      }),
      documents: z.object({
        required: z.array(z.string()),
        optional: z.array(z.string()).optional(),
        specialRequirements: z.array(z.string()).optional(),
      }),
      recommendation: z.object({
        suitability: z.enum(["RECOMMENDED", "CONSIDER", "NOT_RECOMMENDED"]),
        reasoning: z.string(),
        alternatives: z.array(z.string()).optional(),
      }),
    })
  ),
});
