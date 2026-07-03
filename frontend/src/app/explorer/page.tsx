import TopNavBar from "@/components/layout/TopNavBar";
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
