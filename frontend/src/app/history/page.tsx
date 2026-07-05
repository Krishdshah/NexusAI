"use client";

import { useState, useEffect } from "react";
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

  const fetchHistory = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/history")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setTraces(data.traces);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch history", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-64 pt-16 min-h-screen p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display-lg text-3xl font-bold text-on-surface mb-2">Execution History</h1>
            <p className="text-on-surface-variant text-sm">Review high-precision AI agent execution traces, latency metrics, and reasoning logs.</p>
          </div>
          <div className="flex gap-4">
             <button className="px-4 py-2 border border-outline-variant hover:bg-surface-variant rounded-lg font-bold flex items-center gap-2 text-sm text-on-surface transition-colors">
               <span className="material-symbols-outlined text-sm">download</span> Export CSV
             </button>
             <button 
               onClick={fetchHistory}
               className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 rounded-lg font-bold flex items-center gap-2 text-sm transition-colors"
             >
               <span className="material-symbols-outlined text-sm">refresh</span> Live Refresh
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant">
            <p className="text-xs text-outline uppercase font-label-caps mb-2">Total Executions</p>
            <p className="text-3xl font-bold text-on-surface mb-2">{stats.total_executions}</p>
            <p className="text-xs text-tertiary flex items-center gap-1"><span className="material-symbols-outlined text-xs">trending_up</span> Real-time data</p>
          </div>
          <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant">
            <p className="text-xs text-outline uppercase font-label-caps mb-2">Avg. Latency</p>
            <p className="text-3xl font-bold text-on-surface mb-2">{stats.avg_latency}</p>
            <p className="text-xs text-primary flex items-center gap-1"><span className="material-symbols-outlined text-xs">bolt</span> Optimized via Nexus-3</p>
          </div>
          <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant">
            <p className="text-xs text-outline uppercase font-label-caps mb-2">Success Rate</p>
            <p className="text-3xl font-bold text-on-surface mb-2">{stats.success_rate}</p>
            <p className="text-xs text-green-400 flex items-center gap-1"><span className="material-symbols-outlined text-xs">check_circle</span> Live Tracker</p>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl border border-outline-variant overflow-hidden">
          <table className="w-full text-left text-sm text-on-surface">
            <thead className="bg-surface-container-low text-outline text-xs uppercase font-label-caps border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Execution Query</th>
                <th className="px-6 py-4 font-semibold">Agent Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">Loading traces...</td>
                </tr>
              ) : traces.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">No execution history found.</td>
                </tr>
              ) : (
                traces.map((trace, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-high transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-code-sm text-outline">{trace.id}</td>
                    <td className="px-6 py-4 text-on-surface truncate max-w-[200px]">{trace.query}</td>
                    <td className="px-6 py-4 text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-sm">query_stats</span> {trace.agent}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 border rounded-full text-[10px] font-bold tracking-wider ${
                        trace.status === 'SUCCESS' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' : 
                        trace.status === 'FAILURE' ? 'bg-error/10 text-error border-error/20' :
                        'bg-surface-variant text-on-surface-variant border-outline-variant'
                      }`}>
                        {trace.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant font-code-sm">{trace.latency}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
