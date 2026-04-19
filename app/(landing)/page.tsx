"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileTextIcon,
  BrainCircuitIcon,
  ShieldAlertIcon,
  GitBranchIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
  ZapIcon,
  ScaleIcon,
  BookOpenIcon,
  UsersIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const coreFeatures = [
  {
    icon: <FileTextIcon className="w-7 h-7" />,
    title: "Case Intake",
    subtitle: "Structured Instantly",
    badge: "INTAKE",
    description: "Drop in a client brief, upload documents, or answer five questions. G.R.E.G converts raw facts into a structured case profile in under 60 seconds.",
    steps: ["Upload docs or complete guided intake form","AI extracts facts, dates, and legal identifiers","Case profile structured and ready for strategy"],
    accent: "#22c55e",
  },
  {
    icon: <GitBranchIcon className="w-7 h-7" />,
    title: "Strategy Tree",
    subtitle: "Generated + Pressure-Tested",
    badge: "STRATEGY",
    description: "G.R.E.G builds a full decision tree: primary argument, two fallback positions, and attack vectors for each. Every branch is stress-tested against known precedents.",
    steps: ["Primary argument path generated from case facts","Fallback positions ranked by success probability","Each branch pressure-tested against precedent"],
    accent: "#3b82f6",
  },
  {
    icon: <BrainCircuitIcon className="w-7 h-7" />,
    title: "Cross-Examination Flows",
    subtitle: "Auto-Built",
    badge: "CROSS-EXAM",
    description: "For every witness or officer interaction, G.R.E.G generates a full questioning sequence ordered by impact with redirect options if the witness pivots.",
    steps: ["Witness profile analyzed for credibility vectors","Questions sequenced for maximum strategic impact","Redirect trees built for hostile or evasive answers"],
    accent: "#a855f7",
  },
  {
    icon: <ShieldAlertIcon className="w-7 h-7" />,
    title: "Risk Flags",
    subtitle: "Surfaced Early",
    badge: "RISK",
    description: "G.R.E.G scans every case for exposure before you walk in. Inconsistent dates, missing docs, adverse circuit precedent, and officer denial patterns — all flagged early.",
    steps: ["Document consistency checked automatically","Circuit-specific adverse precedent surfaced","Officer and judge denial pattern intelligence"],
    accent: "#ef4444",
  },
];

const existingFeatures = [
  { icon: <BookOpenIcon className="w-5 h-5" />, name: "Case Law Research", desc: "AI-powered search across comprehensive immigration case law database with precedent tracking." },
  { icon: <ScaleIcon className="w-5 h-5" />, name: "Legal Analysis", desc: "Detailed case analysis with citation generation and argument strength scoring." },
  { icon: <UsersIcon className="w-5 h-5" />, name: "Client Management", desc: "Track cases, documents, and deadlines in one secure platform." },
  { icon: <ShieldCheckIcon className="w-5 h-5" />, name: "Compliance Tools", desc: "Real-time monitoring of immigration law changes and compliance requirements." },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
            <span className="text-black font-black text-xs tracking-tighter">G</span>
          </div>
          <span className="text-white font-bold tracking-widest text-sm">G.R.E.G</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Pricing", "About"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-white/60 hover:text-white text-sm font-medium transition-colors tracking-wide">{item}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Log in</a>
          <a href="/signup" className="bg-green-500 hover:bg-green-400 text-black text-sm font-bold px-5 py-2 rounded-full transition-colors">Get Started</a>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {["Features", "How It Works", "Pricing", "About"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-white/70 hover:text-white text-sm font-medium py-1" onClick={() => setOpen(false)}>{item}</a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <a href="/login" className="text-white/70 text-sm py-1">Log in</a>
            <a href="/signup" className="bg-green-500 text-black text-sm font-bold px-5 py-2 rounded-full text-center">Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(34,197,94,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-green-500/30 rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-semibold tracking-widest uppercase">AI Co-Pilot for Immigration Attorneys</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
          <span className="block">Grounded Reasoning.</span>
          <span className="block text-green-400">Empowered Guidance.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
          G.R.E.G structures your cases, builds your strategy, generates your cross-examination flows, and surfaces risk before it surfaces in court. Your AI teammate. Built to win.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/signup" className="group flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3.5 rounded-full text-base transition-all duration-200 hover:scale-105">
            Start Free Trial
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#how-it-works" className="flex items-center gap-2 text-white/60 hover:text-white text-base font-medium transition-colors">
            See how it works <ChevronDownIcon className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[{value:"30+",label:"Beta Attorneys"},{value:"< 60s",label:"Case Intake"},{value:"2x",label:"Research Speed"}].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-green-400">{s.value}</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden", active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(600px circle at 50% 0%, ${feature.accent}0a, transparent 70%)` }} />
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${feature.accent}20`, color: feature.accent }}>{feature.icon}</div>
        <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full border" style={{ color: feature.accent, borderColor: `${feature.accent}40`, background: `${feature.accent}10` }}>{feature.badge}</span>
      </div>
      <h3 className="text-xl font-black text-white mb-1">{feature.title}</h3>
      <p className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: feature.accent }}>{feature.subtitle}</p>
      <p className="text-white/50 text-sm leading-relaxed mb-6">{feature.description}</p>
      <ul className="space-y-3">
        {feature.steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: feature.accent }} />
            <span className="text-white/60 text-sm">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoreFeaturesSection() {
  return (
    <section id="features" className="bg-black py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <ZapIcon className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs font-semibold tracking-widest uppercase">Core Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Four systems. One edge.</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">G.R.E.G automates the four most critical parts of building a winning immigration case.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreFeatures.map((feature, i) => (<FeatureCard key={feature.title} feature={feature} index={i} />))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Submit Your Case", desc: "Upload documents, input client facts, or use our guided intake form. PDFs, Word docs, and plain text.", accent: "#22c55e" },
    { number: "02", title: "G.R.E.G Analyzes", desc: "AI independently builds a legal analysis — then cross-checks it against your inputs. Dual-layer accuracy by design.", accent: "#3b82f6" },
    { number: "03", title: "Review Your Strategy", desc: "See your strategy tree, cross-exam flows, and risk flags in a clean dashboard. Edit, expand, or export to PDF.", accent: "#a855f7" },
    { number: "04", title: "Walk In Ready", desc: "Briefed. Prepared. Every angle covered. You do the advocacy. G.R.E.G handled the prep.", accent: "#f59e0b" },
  ];
  return (
    <section id="how-it-works" className="bg-[#060606] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">From intake to ready.</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Four steps. Under five minutes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center mb-6 bg-black z-10" style={{ borderColor: step.accent }}>
                <span className="text-2xl font-black" style={{ color: step.accent }}>{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformFeaturesSection() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-green-400 text-xs font-semibold tracking-widest uppercase">Full Platform</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight mb-6 leading-tight">Everything an immigration<br />attorney needs. One place.</h2>
            <p className="text-white/50 text-base leading-relaxed mb-10">Beyond strategy — G.R.E.G handles research, client management, compliance monitoring, and document drafting.</p>
            <div className="space-y-4">
              {existingFeatures.map((f) => (
                <div key={f.name} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-400">{f.icon}</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{f.name}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-white/30 text-xs ml-3 font-mono">G.R.E.G Dashboard</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-sm font-semibold">Garcia v. USCIS</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Low Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-white/40">Strategy branches</span><span className="text-white/70">3 built</span></div>
                    <div className="flex justify-between text-xs"><span className="text-white/40">Cross-exam questions</span><span className="text-white/70">14 generated</span></div>
                    <div className="flex justify-between text-xs"><span className="text-white/40">Risk flags</span><span className="text-green-400">0 critical</span></div>
                  </div>
                </div>
                <div className="bg-white/[0.04] border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlertIcon className="w-4 h-4 text-red-400" />
                    <span className="text-white text-sm font-semibold">Risk Flag Detected</span>
                  </div>
                  <p className="text-white/50 text-xs">Prior 9th Circuit ruling conflicts with argument B-2. Recommend fallback to position C.</p>
                </div>
                <div className="bg-white/[0.04] border border-blue-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranchIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm font-semibold">Primary Strategy</span>
                  </div>
                  <p className="text-white/50 text-xs">Asylum claim under CAT. 78% approval rate with this judge in last 12 months.</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-green-500 text-black text-xs font-black px-4 py-2 rounded-full shadow-lg shadow-green-500/30">LIVE PREVIEW</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    { name: "Solo", price: "$199", per: "/month", desc: "For solo immigration attorneys building their edge.", features: ["Case intake + structured profiles","Strategy tree generation","Cross-examination flow builder","Risk flag detection","Case law research (unlimited)","Document drafting (motions, briefs, letters)","Up to 25 active cases"], cta: "Start Free Trial", accent: "#22c55e", highlighted: false },
    { name: "Firm", price: "$799", per: "/month", desc: "For small firms that need full team access.", features: ["Everything in Solo","Up to 5 attorneys","Unlimited active cases","Officer + judge intelligence packs","Team collaboration tools","Priority support","API access"], cta: "Start Free Trial", accent: "#3b82f6", highlighted: true },
    { name: "Enterprise", price: "Custom", per: "", desc: "For legal clinics and public defender offices.", features: ["Everything in Firm","Unlimited attorneys","Custom AI model training","White-label options","Dedicated onboarding","SLA support","Advanced analytics"], cta: "Contact Us", accent: "#a855f7", highlighted: false },
  ];
  return (
    <section id="pricing" className="bg-[#060606] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">Simple pricing.</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">No long-term contracts. Cancel anytime. 14-day free trial on all plans.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={cn("relative rounded-2xl p-8 flex flex-col", plan.highlighted ? "bg-white/[0.06] border-2" : "bg-white/[0.02] border border-white/[0.08]")} style={plan.highlighted ? { borderColor: plan.accent } : {}}>
              {plan.highlighted && (<div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 rounded-full" style={{ background: plan.accent, color: "black" }}>MOST POPULAR</div>)}
              <div className="mb-6">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: plan.accent }}>{plan.name}</span>
                <div className="flex items-end gap-1 mt-2 mb-2">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.per && <span className="text-white/40 text-sm mb-1">{plan.per}</span>}
                </div>
                <p className="text-white/50 text-sm">{plan.desc}</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.accent }} />
                    <span className="text-white/60 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/signup" className={cn("text-center py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105", plan.highlighted ? "text-black" : "bg-white/[0.05] text-white hover:bg-white/10 border border-white/10")} style={plan.highlighted ? { background: plan.accent } : {}}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-black py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
          <h2 className="relative text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight">AI + Attorney = <span className="text-green-400">Unbeatable.</span></h2>
        </div>
        <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed mb-12">Join attorneys already using G.R.E.G to walk into every case with better prep, sharper strategy, and zero blind spots.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/signup" className="group flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-10 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105">
            Start Free Trial <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="mailto:info@greglaw.ai" className="text-white/60 hover:text-white text-base font-medium transition-colors">Talk to the team →</a>
        </div>
        <p className="text-white/30 text-sm mt-6">14-day free trial. No credit card required.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-white/[0.08] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
                <span className="text-black font-black text-xs">G</span>
              </div>
              <span className="text-white font-bold tracking-widest text-sm">G.R.E.G</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">Grounded Reasoning. Empowered Guidance.<br />Built for immigration attorneys.</p>
          </div>
          {[{title:"Product",links:["Features","How It Works","Pricing","Changelog"]},{title:"Company",links:["About","Blog","Careers","Contact"]},{title:"Legal",links:["Terms & Conditions","Privacy Policy","Cookie Policy","Security"]}].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (<li key={link}><a href="#" className="text-white/40 hover:text-white text-sm transition-colors">{link}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© 2025 G.R.E.G. All rights reserved. <a href="https://greglaw.ai" className="text-white/50 hover:text-white transition-colors">greglaw.ai</a></p>
          <p className="text-white/20 text-xs">G.R.E.G is an AI research tool. Not a substitute for licensed legal counsel.</p>
        </div>
      </div>
    </footer>
  );
}

export default function EnhancedLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CoreFeaturesSection />
        <HowItWorksSection />
        <PlatformFeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
