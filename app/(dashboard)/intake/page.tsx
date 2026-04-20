"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  FileTextIcon, GitBranchIcon, ShieldAlertIcon, BrainCircuitIcon,
  CheckCircle2Icon, ArrowRightIcon, Loader2Icon, AlertCircleIcon,
} from "lucide-react";
import { createCaseIntake } from "@/actions/create-intake";

type Step = 0 | 1 | 2 | 3;

const CASE_TYPES = [
  "Asylum / CAT", "H-1B / Work Visa", "Removal Defense", "Green Card",
  "DACA / TPS", "Deportation Appeal", "Family Petition", "Naturalization", "Other",
];

function StepIndicator({ step }: { step: Step }) {
  const steps = ["Client", "Case Type", "Jurisdiction", "Facts"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < step ? "bg-green-500 text-black" : i === step ? "bg-green-500/20 border border-green-500 text-green-400" : "bg-white/5 border border-white/10 text-white/30"
            }`}>
              {i < step ? <CheckCircle2Icon className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs hidden sm:block ${i === step ? "text-white" : "text-white/30"}`}>{label}</span>
          </div>
          {i < steps.length - 1 && <div className={`flex-1 h-px transition-all ${i < step ? "bg-green-500/50" : "bg-white/10"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function AnalyzingState({ clientName }: { clientName: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    { icon: <FileTextIcon className="w-4 h-4" />, label: "Structuring case profile", color: "text-green-400" },
    { icon: <GitBranchIcon className="w-4 h-4" />, label: "Building strategy tree", color: "text-blue-400" },
    { icon: <BrainCircuitIcon className="w-4 h-4" />, label: "Generating cross-exam flows", color: "text-purple-400" },
    { icon: <ShieldAlertIcon className="w-4 h-4" />, label: "Scanning for risk flags", color: "text-red-400" },
  ];
  React.useEffect(() => {
    const interval = setInterval(() => setActiveStage((s) => (s < stages.length - 1 ? s + 1 : s)), 1800);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
        <Loader2Icon className="w-7 h-7 text-green-400 animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Analyzing {clientName}&apos;s case</h2>
      <p className="text-white/50 text-sm mb-10">G.R.E.G is working. This takes about 30 seconds.</p>
      <div className="w-full max-w-sm space-y-3">
        {stages.map((stage, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${i <= activeStage ? "bg-white/[0.04] border-white/10" : "bg-transparent border-transparent opacity-30"}`}>
            <span className={i <= activeStage ? stage.color : "text-white/20"}>{stage.icon}</span>
            <span className="text-sm text-white/70">{stage.label}</span>
            {i < activeStage && <CheckCircle2Icon className="w-4 h-4 text-green-400 ml-auto" />}
            {i === activeStage && <Loader2Icon className="w-4 h-4 text-white/40 ml-auto animate-spin" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CaseIntakePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<Step>(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ clientName: "", caseType: "", jurisdiction: "", facts: "" });

  const update = (key: keyof typeof formData, value: string) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setError(null);
    setAnalyzing(true);
    startTransition(async () => {
      const result = await createCaseIntake(formData);
      if (result.status === "error") { setAnalyzing(false); setError(result.message); return; }
      if (result.intakeId) {
        const poll = async () => {
          const res = await fetch(`/api/intake/analyze?intakeId=${result.intakeId}`);
          const data = await res.json();
          if (data?.status === "COMPLETE") { router.push(`/dashboard/research?intakeId=${result.intakeId}`); }
          else if (data?.status === "FAILED") { setAnalyzing(false); setError("Analysis failed. Please try again."); }
          else { setTimeout(poll, 3000); }
        };
        setTimeout(poll, 4000);
      }
    });
  };

  if (analyzing) return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <AnalyzingState clientName={formData.clientName} />
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <FileTextIcon className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Case Intake</h1>
            <p className="text-white/50 text-sm">Structured instantly</p>
          </div>
        </div>
      </div>

      <StepIndicator step={step} />

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
          <AlertCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {step === 0 && (
        <div className="space-y-6">
          <div>
            <label className="text-white/60 text-sm font-medium block mb-3">Client full name</label>
            <input type="text" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-green-500/50 transition-colors text-base" placeholder="e.g. Miguel A. Garcia" value={formData.clientName} onChange={(e) => update("clientName", e.target.value)} autoFocus onKeyDown={(e) => e.key === "Enter" && formData.clientName && setStep(1)} />
          </div>
          <button onClick={() => setStep(1)} disabled={!formData.clientName.trim()} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-full transition-all">
            Continue <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <label className="text-white/60 text-sm font-medium block mb-1">Case type</label>
          {CASE_TYPES.map((type) => (
            <button key={type} onClick={() => { update("caseType", type); setStep(2); }} className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all font-medium text-sm ${formData.caseType === type ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-white/[0.03] border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:border-white/20"}`}>
              {type}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="text-white/60 text-sm font-medium block mb-3">Jurisdiction / Circuit</label>
            <input type="text" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-green-500/50 transition-colors text-base" placeholder="e.g. 9th Circuit — N.D. California" value={formData.jurisdiction} onChange={(e) => update("jurisdiction", e.target.value)} autoFocus onKeyDown={(e) => e.key === "Enter" && formData.jurisdiction && setStep(3)} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-5 py-3 rounded-full border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-colors">← Back</button>
            <button onClick={() => setStep(3)} disabled={!formData.jurisdiction.trim()} className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold py-3 rounded-full transition-all text-sm">
              Continue <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="text-white/60 text-sm font-medium block mb-3">Case facts</label>
            <p className="text-white/30 text-xs mb-3">Describe the core facts: dates, key events, prior filings, country conditions, any threats or incidents.</p>
            <textarea className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-green-500/50 transition-colors text-sm leading-relaxed resize-none" placeholder="Client entered the US on March 15, 2022. Filed I-589 in June 2022..." rows={8} value={formData.facts} onChange={(e) => update("facts", e.target.value)} autoFocus />
            <p className="text-white/20 text-xs mt-2 text-right">{formData.facts.length} chars</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-3">
            <p className="text-white/40 text-xs uppercase tracking-widest font-medium">G.R.E.G will generate</p>
            {[
              { icon: <GitBranchIcon className="w-4 h-4" />, label: "Strategy tree with 3 branches", color: "text-blue-400" },
              { icon: <BrainCircuitIcon className="w-4 h-4" />, label: "Cross-examination flows per witness", color: "text-purple-400" },
              { icon: <ShieldAlertIcon className="w-4 h-4" />, label: "Risk flags with required actions", color: "text-red-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className={item.color}>{item.icon}</span>
                <span className="text-white/50 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-5 py-3 rounded-full border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-colors">← Back</button>
            <button onClick={handleSubmit} disabled={!formData.facts.trim() || isPending} className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold py-3 rounded-full transition-all text-sm">
              {isPending ? <><Loader2Icon className="w-4 h-4 animate-spin" /> Submitting...</> : <>Analyze Case <ArrowRightIcon className="w-4 h-4" /></>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
