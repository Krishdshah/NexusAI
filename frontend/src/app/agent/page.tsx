import TopNavBar from "@/components/layout/TopNavBar";
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
