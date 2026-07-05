"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Sparkles, Building2, TrendingUp, Users, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleDiscover = () => {
    if (query.trim()) {
      router.push(`/agent?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDiscover();
    }
  };

  const suggestions = [
    "Find Suppliers", "Find Professionals", "Business Opportunities", "Projects", "Procurement"
  ];

  const recentRuns = [
    { title: "Analyze quarterly financial reports", type: "Analysis", time: "2h ago" },
    { title: "Generate visual heat-map of logistics", type: "Mapping", time: "5h ago" },
    { title: "Find compliant suppliers in Europe", type: "Discovery", time: "1d ago" },
  ];

  return (
    <main className="md:ml-[280px] pt-16 min-h-screen relative flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-6 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <Sparkles size={14} className="text-primary" />
          <span className="font-code-sm text-[12px] text-primary uppercase tracking-wider font-semibold">Nexus 3.0 Engine Active</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display-lg font-bold text-white mb-6 tracking-tight leading-tight"
        >
          Enterprise Business <br />
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent text-transparent bg-clip-text">Discovery Agent</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-2xl mb-12 font-medium"
        >
          Understand requirements. Discover opportunities. <br className="hidden md:block" /> Validate recommendations. Execute with confidence.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-3xl relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
            <Search size={24} className="text-muted mr-4" />
            <input 
              className="bg-transparent border-none focus:outline-none w-full text-lg text-white placeholder-muted" 
              placeholder="What would you like to discover today?" 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={handleDiscover}
              className="ml-4 px-6 py-2.5 bg-white text-black hover:bg-white/90 rounded-xl font-semibold text-sm transition-all active:scale-95 flex items-center gap-2 shrink-0"
            >
              Discover <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Demo Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mt-6"
        >
          <button onClick={() => router.push('/client')} className="px-5 py-2.5 rounded-xl border border-primary/50 bg-primary/10 text-sm text-primary hover:bg-primary/20 hover:border-primary font-medium transition-all flex items-center gap-2">
            <Users size={16} /> Client Portal Demo
          </button>
          <button onClick={() => router.push('/business')} className="px-5 py-2.5 rounded-xl border border-accent/50 bg-accent/10 text-sm text-accent hover:bg-accent/20 hover:border-accent font-medium transition-all flex items-center gap-2">
            <Building2 size={16} /> Business Portal Demo
          </button>
        </motion.div>

        {/* Suggestion Chips */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setQuery(s)}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-muted hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors"
            >
              {s}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Bento Grid Features below fold */}
      <section className="w-full max-w-6xl px-6 pb-32 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="col-span-1 md:col-span-2 glass-card p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2"><History size={20} className="text-primary"/> Recent Runs</h3>
            <button className="text-sm text-primary hover:text-white transition-colors">View All</button>
          </div>
          <div className="flex flex-col gap-3">
            {recentRuns.map((run, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div>
                  <h4 className="text-white font-medium group-hover:text-primary transition-colors">{run.title}</h4>
                  <p className="text-xs text-muted mt-1">{run.type}</p>
                </div>
                <span className="text-xs font-code-sm text-muted">{run.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="col-span-1 glass-card p-8 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2"><TrendingUp size={20} className="text-accent"/> AI Insights</h3>
            <p className="text-sm text-muted">Weekly aggregated insights from your operations.</p>
          </div>
          <div className="mt-8">
            <div className="text-4xl font-display-lg font-bold text-white mb-1">99.4%</div>
            <p className="text-sm text-green-400 font-medium">Validation Success Rate</p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
