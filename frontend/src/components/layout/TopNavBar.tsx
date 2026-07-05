"use client";

import Link from "next/link";
import { Search, Bell, Settings, UserCircle, Command, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function TopNavBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 glass-panel border-b border-white/5">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <span className="font-display-lg text-primary font-bold">N</span>
          </div>
          <span className="text-headline-md font-bold text-white tracking-wide">NexusAI</span>
        </Link>
        <div className="hidden md:flex gap-1 items-center bg-white/5 p-1 rounded-full border border-white/5">
          <button className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium shadow-sm border border-white/10">Personal</button>
          <button className="px-4 py-1.5 rounded-full text-muted hover:text-white text-sm font-medium transition-colors">Acme Corp</button>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-8 hidden lg:block">
        <button className="w-full flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-muted hover:bg-black/60 hover:border-white/20 transition-all group">
          <Search size={16} className="group-hover:text-primary transition-colors" />
          <span className="text-sm font-body-base">Search workspaces, suppliers, or history...</span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-code-sm text-white/70">Ctrl</kbd>
            <kbd className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-code-sm text-white/70">K</kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mr-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium text-green-500">Agent Online</span>
        </div>
        <button className="p-2 text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-background"></span>
        </button>
        <button className="p-2 text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors">
          <Settings size={18} />
        </button>
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors">
          <span className="font-label-caps text-xs px-2 text-white">Krish</span>
          <UserCircle size={24} className="text-muted" />
        </button>
      </div>
    </header>
  );
}
