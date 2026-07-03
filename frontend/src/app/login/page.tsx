"use client";
import Link from "next/link";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex bg-[#0a0a0c] text-on-surface">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 border-r border-outline-variant/30">
        <div>
          <div className="flex items-center gap-3 mb-32">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <span className="text-xl font-bold">NexusAI</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
            Join the next <br />
            generation of AI-native <br />
            enterprise.
          </h1>
          
          <p className="text-on-surface-variant text-lg max-w-md mb-12">
            Experience precise, authoritative, and visionary discovery workflows. Harness enterprise-grade AI models designed for high-performance technical stakeholders.
          </p>

          <div className="p-6 bg-surface-container rounded-2xl border border-outline-variant max-w-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-surface-container-highest rounded-full overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Chen" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-on-surface">Sarah Chen</p>
                <p className="text-sm text-on-surface-variant">CTO, Vellum Systems</p>
              </div>
            </div>
            <p className="text-on-surface-variant text-sm italic mb-4">
              "NexusAI has fundamentally transformed how our discovery teams validate datasets. The precision and authoritative insights are unmatched in the enterprise space."
            </p>
            <div className="flex gap-1 text-primary">
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
            </div>
          </div>
        </div>

        <div className="flex gap-12 text-xs">
          <div>
            <p className="text-[10px] text-outline font-bold uppercase tracking-widest mb-1">Security</p>
            <p className="font-code-sm text-on-surface-variant">SOC2 Type II</p>
          </div>
          <div>
            <p className="text-[10px] text-outline font-bold uppercase tracking-widest mb-1">Compliance</p>
            <p className="font-code-sm text-on-surface-variant">HIPAA/GDPR</p>
          </div>
          <div>
            <p className="text-[10px] text-outline font-bold uppercase tracking-widest mb-1">Uptime</p>
            <p className="font-code-sm text-on-surface-variant">99.99% SLA</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          
          {/* Toggle */}
          <div className="flex bg-surface-container rounded-xl p-1 w-full max-w-xs mb-16 border border-outline-variant">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${isLogin ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${!isLogin ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="w-full">
            <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
            <p className="text-on-surface-variant text-sm mb-8">
              {isLogin ? 'Enter your credentials to access your dashboard.' : 'Sign up to start automating your workflows.'}
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-outline-variant hover:bg-surface-variant rounded-xl font-bold text-sm transition-colors bg-[#121414]">
                <img src="https://authjs.dev/img/providers/google.svg" className="w-5 h-5" alt="Google" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-outline-variant hover:bg-surface-variant rounded-xl font-bold text-sm transition-colors bg-[#121414]">
                <img src="https://authjs.dev/img/providers/github.svg" className="w-5 h-5 invert" alt="GitHub" />
                Continue with GitHub
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
              <span className="relative bg-[#0a0a0c] px-4 text-[10px] uppercase tracking-widest font-bold text-outline">or email</span>
            </div>

            <form className="flex flex-col gap-5">
              {!isLogin && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Full Name</label>
                  <input type="text" placeholder="Sarah Chen" className="w-full bg-[#121414] border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              )}
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">Work Email</label>
                <input type="email" placeholder="name@company.com" className="w-full bg-[#121414] border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-outline">Password</label>
                  {isLogin && <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Forgot?</Link>}
                </div>
                <input type="password" placeholder="••••••••" className="w-full bg-[#121414] border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors tracking-widest" />
              </div>

              <button type="button" onClick={() => window.location.href = '/dashboard'} className="w-full mt-2 bg-primary hover:bg-primary/90 text-on-primary py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-primary/20">
                {isLogin ? 'Log In to NexusAI' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-on-surface-variant mt-8">
              Trouble logging in? <Link href="#" className="text-primary hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
