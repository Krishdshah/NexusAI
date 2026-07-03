import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Top Navbar */}
      <header className="w-full flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-on-surface">NexusAI</span>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-[10px] font-bold text-on-surface uppercase tracking-widest border-b border-on-surface pb-1">Solution</Link>
            <Link href="#" className="text-[10px] font-bold text-on-surface-variant hover:text-on-surface uppercase tracking-widest transition-colors">Agents</Link>
            <Link href="#" className="text-[10px] font-bold text-on-surface-variant hover:text-on-surface uppercase tracking-widest transition-colors">Enterprise</Link>
            <Link href="#" className="text-[10px] font-bold text-on-surface-variant hover:text-on-surface uppercase tracking-widest transition-colors">Documentation</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors text-sm">search</button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors text-sm">settings_brightness</button>
          <Link href="/dashboard" className="px-6 py-2 bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-all">
            Book a Demo
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-24 mb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant mb-8">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="text-[10px] text-on-surface font-bold uppercase tracking-widest">Now in Enterprise GA</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-on-surface mb-6 tracking-tight max-w-4xl">
          The Intelligence Layer for <br />
          <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Enterprise Discovery.</span>
        </h1>
        
        <p className="text-on-surface-variant text-lg max-w-2xl mb-12">
          NexusAI automates high-precision business verification and supplier discovery with explainable agentic workflows. Engineered for scale, built for precision.
        </p>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="px-8 py-3 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
            Start Execution <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
          <Link href="/dashboard" className="px-8 py-3 bg-surface-container border border-outline-variant hover:border-outline text-on-surface rounded-lg font-bold transition-all">
            View Sandbox
          </Link>
        </div>

        {/* Trusted By */}
        <div className="mt-32 w-full max-w-4xl">
          <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-8">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale">
            <span className="text-xl font-bold tracking-wider">FORGE</span>
            <span className="text-xl font-bold tracking-wider">APEX GLOBAL</span>
            <span className="text-xl font-bold tracking-wider">VELOCITY</span>
            <span className="text-xl font-bold tracking-wider">SYNTHEX</span>
            <span className="text-xl font-bold tracking-wider">QUANTUM</span>
          </div>
        </div>
      </main>

      {/* Bento Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Verification Card */}
          <div className="md:col-span-2 p-8 bg-surface-container rounded-3xl border border-outline-variant flex flex-col md:flex-row gap-8 items-center group hover:border-primary/50 transition-colors">
            <div className="flex-1">
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Autonomous Verification</h3>
              <p className="text-sm text-on-surface-variant">Multi-agent consensus protocols verify business data against 4,000+ global sources in real-time, ensuring 99.9% data integrity.</p>
            </div>
            <div className="flex-1 w-full bg-[#0a0a0c] rounded-xl p-4 border border-outline-variant/50 font-code-sm text-xs text-outline flex flex-col gap-2">
              <div className="bg-surface-container px-3 py-2 rounded">RUNNING AGENT_ALPHA :: ANALYZING REGISTRY</div>
              <div className="bg-surface-container px-3 py-2 rounded">CROSS-REFERENCING ISO_IEC... DONE</div>
              <div className="bg-surface-container px-3 py-2 rounded text-primary border border-primary/20 bg-primary/5">MATCHING SIGNATORIES... [MATCH]</div>
              <div className="px-3 py-1">FINALIZING CONSENSUS REPORT</div>
            </div>
          </div>

          {/* Global Scale Card */}
          <div className="p-8 bg-surface-container rounded-3xl border border-outline-variant group hover:border-secondary/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary mb-6">
              <span className="material-symbols-outlined">language</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-3">Global Scale</h3>
            <p className="text-sm text-on-surface-variant mb-6">Operational across 100+ jurisdictions with localized intelligence modules.</p>
            <div className="w-full h-32 bg-[#0a0a0c] rounded-xl border border-outline-variant/50 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <span className="material-symbols-outlined text-secondary opacity-50 text-6xl">public</span>
            </div>
          </div>

          {/* Explainable AI Card */}
          <div className="p-8 bg-surface-container rounded-3xl border border-outline-variant group hover:border-tertiary/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary mb-6">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-3">Explainable AI</h3>
            <p className="text-sm text-on-surface-variant mb-8">Every decision is backed by a deterministic trace. Trace logic, inspect weights, and verify outputs instantly.</p>
            <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
               <div className="w-[60%] h-full bg-tertiary rounded-full"></div>
            </div>
          </div>

          {/* Execution Inspector Card */}
          <div className="md:col-span-2 p-8 bg-surface-container rounded-3xl border border-outline-variant group hover:border-outline transition-colors">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-on-surface">Execution Inspector</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Live Streaming</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-8">Real-time observability into the agentic decision tree.</p>
            <div className="flex gap-4">
               <div className="flex-1 p-4 rounded-xl border border-outline-variant bg-[#0a0a0c] font-code-sm">
                 <p className="text-[10px] text-outline mb-1 uppercase">Input Node</p>
                 <p className="text-xs text-on-surface">Payload_772F.json</p>
               </div>
               <div className="flex-1 p-4 rounded-xl border border-outline-variant bg-[#0a0a0c] font-code-sm">
                 <p className="text-[10px] text-outline mb-1 uppercase">Reasoning Engine</p>
                 <p className="text-xs text-on-surface">Evaluating Risk Score...</p>
               </div>
               <div className="flex-1 p-4 rounded-xl border border-primary/30 bg-primary/5 font-code-sm">
                 <p className="text-[10px] text-primary mb-1 uppercase">Output Gate</p>
                 <p className="text-xs text-primary font-bold">VERIFIED_SECURE</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-transparent to-surface-container-low py-32 text-center px-4 relative">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.05),transparent_70%)] pointer-events-none"></div>
         <h2 className="text-4xl font-bold text-on-surface mb-6 relative z-10">Ready to automate discovery?</h2>
         <p className="text-on-surface-variant max-w-lg mx-auto mb-10 relative z-10">
           Join the waitlist or schedule a personalized walkthrough of the NexusAI Discovery Intelligence platform.
         </p>
         <div className="flex items-center justify-center gap-4 relative z-10">
          <Link href="/dashboard" className="px-8 py-3 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-bold transition-all shadow-lg shadow-primary/20">
            Book a Demo
          </Link>
          <Link href="/dashboard" className="px-8 py-3 bg-transparent border border-outline-variant hover:bg-surface-variant text-on-surface rounded-lg font-bold transition-all">
            Talk to an Architect
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant bg-[#0a0a0c] pt-16 pb-8 px-8 md:px-16 text-sm">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
               <span className="text-xl font-bold text-on-surface mb-4 block">NexusAI</span>
               <p className="text-on-surface-variant text-xs pr-4">Enterprise Discovery Intelligence. Precision agents for a complex world.</p>
            </div>
            <div>
               <h4 className="font-bold text-[10px] text-on-surface uppercase tracking-widest mb-4">Product</h4>
               <ul className="flex flex-col gap-3 text-xs text-on-surface-variant">
                 <li><Link href="#" className="hover:text-primary transition-colors">Platform Overview</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Agent Marketplace</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Security & Privacy</Link></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-[10px] text-on-surface uppercase tracking-widest mb-4">Company</h4>
               <ul className="flex flex-col gap-3 text-xs text-on-surface-variant">
                 <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Press Kit</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-[10px] text-on-surface uppercase tracking-widest mb-4">Newsletter</h4>
               <p className="text-xs text-on-surface-variant mb-4">The latest in AI-native discovery.</p>
               <div className="flex gap-2">
                 <input type="email" placeholder="Email" className="flex-1 bg-surface-container border border-outline-variant rounded-md px-3 py-2 text-xs focus:outline-none focus:border-primary text-on-surface" />
                 <button className="bg-on-surface text-background px-4 py-2 rounded-md text-xs font-bold hover:bg-on-surface/90 transition-colors">Join</button>
               </div>
            </div>
         </div>
         <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/30 text-[10px] text-outline font-bold uppercase tracking-widest">
            <p>© 2024 NEXUSAI TECHNOLOGIES INC.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <Link href="#" className="hover:text-on-surface transition-colors">Privacy Policy</Link>
               <Link href="#" className="hover:text-on-surface transition-colors">Terms of Service</Link>
               <Link href="#" className="hover:text-on-surface transition-colors">Trust Center</Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
