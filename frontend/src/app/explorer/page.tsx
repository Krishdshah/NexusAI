"use client";

import { useState, useEffect } from "react";
import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

interface Dataset {
  id: string;
  name: string;
  industry: string;
  status: string;
  capacity: string;
  confidence: number;
  last_modified: string;
}

export default function DatasetExplorer() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/explorer/datasets")
      .then((res) => res.json())
      .then((data) => {
        setDatasets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch datasets", err);
        setLoading(false);
      });
  }, []);

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
          <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-sm">add</span> New Dataset
          </button>
        </div>

        <div className="bg-surface-container rounded-2xl border border-outline-variant overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex gap-4 items-center bg-surface-container-low">
            <div className="px-3 py-1.5 border border-outline-variant rounded-lg flex items-center gap-2 text-sm text-on-surface hover:bg-surface-variant cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span> Status: All
            </div>
            <div className="px-3 py-1.5 border border-outline-variant rounded-lg flex items-center gap-2 text-sm text-on-surface hover:bg-surface-variant cursor-pointer transition-colors">
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">Loading datasets...</td>
                </tr>
              ) : datasets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">No datasets found.</td>
                </tr>
              ) : (
                datasets.map((dataset) => (
                  <tr key={dataset.id} className="hover:bg-surface-container-high transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex justify-center items-center font-bold text-xs ${dataset.status === 'VERIFIED' ? 'bg-green-900/30 text-green-400' : 'bg-primary/20 text-primary'}`}>
                          {dataset.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-on-surface">{dataset.name}</div>
                          <div className="text-xs text-on-surface-variant">{dataset.industry}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 border rounded text-xs font-bold tracking-wider ${
                        dataset.status === 'VERIFIED' 
                          ? 'bg-green-900/30 text-green-400 border-green-900' 
                          : dataset.status === 'PENDING'
                            ? 'bg-yellow-900/30 text-yellow-400 border-yellow-900'
                            : 'bg-surface-variant text-on-surface-variant border-outline-variant'
                      }`}>
                        {dataset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{dataset.capacity}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-surface-variant rounded-full overflow-hidden">
                          <div className={`h-full ${dataset.confidence > 90 ? 'bg-green-500' : dataset.confidence > 70 ? 'bg-primary' : 'bg-yellow-500'}`} style={{ width: `${dataset.confidence}%` }}></div>
                        </div>
                        <span className="text-xs">{dataset.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{dataset.last_modified}</td>
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
