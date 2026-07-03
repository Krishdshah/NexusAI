import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

export default function ExecutionHistory() {
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
             <button className="px-4 py-2 border border-outline-variant hover:bg-surface-variant rounded-lg font-bold flex items-center gap-2 text-sm text-on-surface">
               <span className="material-symbols-outlined text-sm">download</span> Export CSV
             </button>
             <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 rounded-lg font-bold flex items-center gap-2 text-sm">
               <span className="material-symbols-outlined text-sm">refresh</span> Live Refresh
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant">
            <p className="text-xs text-outline uppercase font-label-caps mb-2">Total Executions</p>
            <p className="text-3xl font-bold text-on-surface mb-2">12,482</p>
            <p className="text-xs text-tertiary flex items-center gap-1"><span className="material-symbols-outlined text-xs">trending_up</span> 12% from last week</p>
          </div>
          <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant">
            <p className="text-xs text-outline uppercase font-label-caps mb-2">Avg. Latency</p>
            <p className="text-3xl font-bold text-on-surface mb-2">1.2s</p>
            <p className="text-xs text-primary flex items-center gap-1"><span className="material-symbols-outlined text-xs">bolt</span> Optimized via Nexus-3</p>
          </div>
          <div className="p-5 bg-surface-container rounded-2xl border border-outline-variant">
            <p className="text-xs text-outline uppercase font-label-caps mb-2">Success Rate</p>
            <p className="text-3xl font-bold text-on-surface mb-2">99.4%</p>
            <p className="text-xs text-green-400 flex items-center gap-1"><span className="material-symbols-outlined text-xs">check_circle</span> Above SLA</p>
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
              <tr className="hover:bg-surface-container-high transition-colors cursor-pointer">
                <td className="px-6 py-4 font-code-sm text-outline">#9A21C</td>
                <td className="px-6 py-4 text-on-surface truncate max-w-[200px]">Analyze quarterly financial reports for...</td>
                <td className="px-6 py-4 text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-sm">query_stats</span> Analyst-V4</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-tertiary/10 text-tertiary border border-tertiary/20 rounded-full text-[10px] font-bold tracking-wider">SUCCESS</span></td>
                <td className="px-6 py-4 text-on-surface-variant font-code-sm">1,402ms</td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors cursor-pointer">
                <td className="px-6 py-4 font-code-sm text-outline">#8B04F</td>
                <td className="px-6 py-4 text-on-surface truncate max-w-[200px]">Generate visual heat-map of global lo...</td>
                <td className="px-6 py-4 text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-sm">map</span> Geo-Router</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-error/10 text-error border border-error/20 rounded-full text-[10px] font-bold tracking-wider">FAILURE</span></td>
                <td className="px-6 py-4 text-on-surface-variant font-code-sm">8,421ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
