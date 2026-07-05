"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Download, RefreshCw, TrendingUp, Zap, CheckCircle2, Bot, AlertCircle } from "lucide-react";
import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

interface Trace {
  id: string;
  query: string;
  agent: string;
  status: string;
  latency: string;
}

interface Stats {
  total_executions: string;
  avg_latency: string;
  success_rate: string;
}

export default function ExecutionHistory() {
  const [stats, setStats] = useState<Stats>({ total_executions: "0", avg_latency: "0s", success_rate: "0%" });
  const [traces, setTraces] = useState<Trace[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchHistory = () => {
    setIsRefreshing(true);
    fetch("http://localhost:8000/api/history")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setTraces(data.traces);
        setLoading(false);
        setTimeout(() => setIsRefreshing(false), 500); // Visual feedback
      })
      .catch((err) => {
        console.error("Failed to fetch history", err);
        setLoading(false);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-[280px] pt-16 min-h-screen p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="font-display-lg text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <History className="text-primary" size={28}/> Execution History
              </h1>
              <p className="text-muted text-sm">Review high-precision AI agent execution traces, latency metrics, and reasoning logs.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl font-bold flex items-center gap-2 text-sm text-white transition-colors">
                <Download size={16} /> Export CSV
              </button>
              <button 
                onClick={fetchHistory}
                className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 rounded-xl font-bold flex items-center gap-2 text-sm transition-colors"
              >
                <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} /> Live Refresh
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 glass-panel border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={48} />
              </div>
              <p className="text-[11px] text-muted uppercase tracking-widest font-semibold mb-2">Total Executions</p>
              <p className="text-4xl font-display-lg font-bold text-white mb-3">{stats.total_executions}</p>
              <p className="text-xs text-primary flex items-center gap-1 font-medium"><TrendingUp size={12} /> Real-time data</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 glass-panel border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-accent">
                <Zap size={48} />
              </div>
              <p className="text-[11px] text-muted uppercase tracking-widest font-semibold mb-2">Avg. Latency</p>
              <p className="text-4xl font-display-lg font-bold text-white mb-3">{stats.avg_latency}</p>
              <p className="text-xs text-accent flex items-center gap-1 font-medium"><Zap size={12} /> Optimized via Nexus-3</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 glass-panel border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-green-500">
                <CheckCircle2 size={48} />
              </div>
              <p className="text-[11px] text-muted uppercase tracking-widest font-semibold mb-2">Success Rate</p>
              <p className="text-4xl font-display-lg font-bold text-white mb-3">{stats.success_rate}</p>
              <p className="text-xs text-green-400 flex items-center gap-1 font-medium"><CheckCircle2 size={12} /> Live Tracker</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 glass-panel border border-white/5 relative overflow-hidden flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Nexus Engine</h3>
                  <p className="text-xs text-green-400">All systems operational</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel border border-white/5 overflow-hidden"
          >
            <table className="w-full text-left text-sm text-white border-collapse">
              <thead className="bg-white/5 text-muted text-xs uppercase font-label-caps border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-semibold w-24">Trace ID</th>
                  <th className="px-6 py-4 font-semibold">Execution Query</th>
                  <th className="px-6 py-4 font-semibold">Agent Type</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && !isRefreshing ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading execution traces...</span>
                      </div>
                    </td>
                  </tr>
                ) : traces.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted">No execution history found.</td>
                  </tr>
                ) : (
                  traces.map((trace, idx) => (
                    <motion.tr 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 font-code-sm text-muted text-xs">{trace.id.substring(0, 8)}...</td>
                      <td className="px-6 py-4 text-white font-medium group-hover:text-primary transition-colors">{trace.query}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-muted">
                          <Bot size={14} /> <span className="text-xs">{trace.agent}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold tracking-wider flex w-fit items-center gap-1 ${
                          trace.status === 'SUCCESS' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          trace.status === 'FAILURE' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          'bg-white/10 text-muted border-white/20'
                        }`}>
                          {trace.status === 'SUCCESS' && <CheckCircle2 size={10} />}
                          {trace.status === 'FAILURE' && <AlertCircle size={10} />}
                          {trace.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-code-sm text-muted">{trace.latency}</td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </motion.div>
        </div>
      </main>
    </>
  );
}
