import os

files = {
    "frontend/src/app/agent/page.tsx": """import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

export default function AIAgentWorkspace() {
  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-64 pt-16 min-h-screen flex text-sm">
        {/* Left Panel: Recent Sessions */}
        <div className="w-1/4 border-r border-outline-variant p-4 flex flex-col gap-4 hidden lg:flex">
          <h2 className="font-label-caps text-xs text-outline uppercase">Recent Sessions</h2>
          <div className="p-4 bg-surface-container-highest rounded-xl cursor-pointer">
            <h3 className="text-on-surface font-semibold mb-1">Q3 Logistics Optimization</h3>
            <p className="text-xs text-outline">2 mins ago • 14 Steps</p>
          </div>
          <div className="p-4 hover:bg-surface-variant rounded-xl transition-colors cursor-pointer">
            <h3 className="text-on-surface mb-1">Market Sentiment Analysis</h3>
            <p className="text-xs text-outline">1 hour ago • 5 Steps</p>
          </div>
        </div>

        {/* Center Panel: Chat Interface */}
        <div className="flex-1 flex flex-col border-r border-outline-variant relative">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
              <span className="text-on-surface font-semibold">Active Session: Logistics Optimization</span>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
            {/* User Message */}
            <div className="self-end bg-surface-container-highest p-4 rounded-xl max-w-[80%] border border-outline-variant">
              <p className="text-on-surface">Identify the primary bottlenecks in our Q3 supply chain for the EMEA region...</p>
            </div>
            {/* Agent Message */}
            <div className="self-start flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary mt-1">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
              </div>
              <div className="bg-surface-container p-4 rounded-xl border border-outline-variant flex-1">
                <p className="text-on-surface mb-4">Analysis complete. I've cross-referenced current shipping manifestos with historical lead-time data...</p>
                <div className="flex gap-2">
                  <div className="p-3 bg-surface-container-highest rounded-lg flex-1 border border-outline-variant hover:border-primary cursor-pointer transition-colors">
                    <h4 className="font-semibold text-on-surface text-xs mb-1">Rotterdam Port Lag</h4>
                    <p className="text-xs text-on-surface-variant">Congestion at Berth 4 is causing a 4.2 day delay.</p>
                  </div>
                  <div className="p-3 bg-surface-container-highest rounded-lg flex-1 border border-outline-variant hover:border-tertiary cursor-pointer transition-colors">
                    <h4 className="font-semibold text-tertiary text-xs mb-1">Vendor Delta Risk</h4>
                    <p className="text-xs text-on-surface-variant">Strategic partner in Poland reports component shortage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-surface-container">
            <div className="relative flex items-center bg-[#09090B] border border-outline-variant rounded-xl p-2 pr-4">
              <input className="bg-transparent border-none focus:outline-none w-full text-body-base placeholder-on-surface-variant px-4 py-2" placeholder="Ask NexusAI to analyze, discover, or report..." type="text"/>
              <button className="material-symbols-outlined text-outline hover:text-on-surface mx-2">attach_file</button>
              <button className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold flex items-center gap-2 hover:opacity-90">
                <span className="material-symbols-outlined text-sm">send</span> RUN
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Execution Inspector */}
        <div className="w-[30%] bg-surface-container p-6 flex flex-col gap-6 hidden xl:flex">
          <h2 className="font-headline-md text-lg text-on-surface font-semibold">Execution Inspector</h2>
          <p className="text-xs text-outline uppercase tracking-wider mb-2">Real-Time Logic Visualization</p>
          
          <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant before:to-transparent">
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="material-symbols-outlined text-[12px]">check</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-surface-container-highest border border-primary/30 shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-on-surface">Requirement Parsed</div>
                </div>
                <div className="text-xs text-on-surface-variant">Found: Bottlenecks, EMEA, Supply Chain.</div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="material-symbols-outlined text-[12px]">check</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-surface-container-highest border border-outline-variant shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-on-surface">Planning</div>
                </div>
                <div className="text-xs text-on-surface-variant">Generated 4 parallel sub-tasks.</div>
              </div>
            </div>

            {/* Step 3 (Current) */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-tertiary bg-background text-tertiary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-tertiary rounded-full animate-ping"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-surface-container-highest border border-tertiary/50 shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-tertiary">Search Tool</div>
                </div>
                <div className="text-xs text-on-surface-variant mb-2">Querying internal SAP/Oracle databases...</div>
                <div className="w-full bg-surface-variant rounded-full h-1.5">
                  <div className="bg-tertiary h-1.5 rounded-full w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
""",
    "frontend/src/app/explorer/page.tsx": """import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

export default function DatasetExplorer() {
  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-64 pt-16 min-h-screen p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-display-lg text-3xl font-bold text-on-surface mb-2">Dataset Explorer</h1>
            <p className="text-on-surface-variant text-sm">Query, audit, and analyze the enterprise dataset hierarchy.</p>
          </div>
          <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span> New Dataset
          </button>
        </div>

        <div className="bg-surface-container rounded-2xl border border-outline-variant overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex gap-4 items-center bg-surface-container-low">
            <div className="px-3 py-1.5 border border-outline-variant rounded-lg flex items-center gap-2 text-sm text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-sm">filter_list</span> Status: All
            </div>
            <div className="px-3 py-1.5 border border-outline-variant rounded-lg flex items-center gap-2 text-sm text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-sm">calendar_today</span> Last 30 Days
            </div>
          </div>
          
          <table className="w-full text-left text-sm text-on-surface">
            <thead className="bg-surface-container-low text-outline text-xs uppercase font-label-caps border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-semibold">Entity Name</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Capacity</th>
                <th className="px-6 py-4 font-semibold">Confidence</th>
                <th className="px-6 py-4 font-semibold">Last Modified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-surface-container-high transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/20 text-primary flex justify-center items-center font-bold text-xs">AD</div>
                    <div>
                      <div className="font-semibold text-on-surface">Aether Dynamics</div>
                      <div className="text-xs text-on-surface-variant">Industrial Logistics</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 border border-green-900 rounded text-xs font-bold tracking-wider">VERIFIED</span>
                </td>
                <td className="px-6 py-4">8.42 PB</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-surface-variant rounded-full overflow-hidden"><div className="w-[98%] bg-primary h-full"></div></div>
                    <span className="text-xs">98%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface-variant">2h ago</td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-tertiary/20 text-tertiary flex justify-center items-center font-bold text-xs">CS</div>
                    <div>
                      <div className="font-semibold text-on-surface">Cortex Systems</div>
                      <div className="text-xs text-on-surface-variant">Neural Networks</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 border border-yellow-900 rounded text-xs font-bold tracking-wider">PENDING</span>
                </td>
                <td className="px-6 py-4">4.91 PB</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-surface-variant rounded-full overflow-hidden"><div className="w-[74%] bg-tertiary h-full"></div></div>
                    <span className="text-xs">74%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface-variant">1d ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
""",
    "frontend/src/app/history/page.tsx": """import TopNavBar from "@/components/layout/TopNavBar";
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
"""
}

for path, content in files.items():
    full_path = os.path.join(os.getcwd(), path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Scaffolded sub-pages.")
