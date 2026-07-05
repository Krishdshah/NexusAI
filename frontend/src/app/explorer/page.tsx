"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, Plus, MoreHorizontal, FileText, Database, ShieldCheck, Download, ChevronDown } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const filteredData = datasets.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-[280px] pt-16 min-h-screen p-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-start mb-8"
          >
            <div>
              <h1 className="font-display-lg text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Database className="text-primary" size={28}/> Dataset Explorer
              </h1>
              <p className="text-muted text-sm">Query, audit, and analyze the enterprise dataset hierarchy.</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(79,124,255,0.3)] active:scale-95">
              <Plus size={16} /> New Entity
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel border border-white/5 overflow-hidden"
          >
            {/* Toolbar */}
            <div className="p-4 border-b border-white/5 flex gap-4 items-center bg-white/5 flex-wrap">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="text" 
                  placeholder="Search entities..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button className="px-4 py-2 border border-white/10 bg-white/5 rounded-lg flex items-center gap-2 text-sm text-white hover:bg-white/10 transition-colors">
                <Filter size={14} className="text-muted"/> Status: All
              </button>
              <button className="px-4 py-2 border border-white/10 bg-white/5 rounded-lg flex items-center gap-2 text-sm text-white hover:bg-white/10 transition-colors">
                <Calendar size={14} className="text-muted"/> Last 30 Days
              </button>
              <button className="px-4 py-2 border border-white/10 bg-white/5 rounded-lg flex items-center gap-2 text-sm text-white hover:bg-white/10 transition-colors ml-auto">
                <Download size={14} className="text-muted"/> Export
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-white border-collapse">
                <thead className="bg-white/5 text-muted text-xs uppercase font-label-caps border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 font-semibold w-1/4">Entity Name</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Capacity / Scale</th>
                    <th className="px-6 py-4 font-semibold">Match Confidence</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 relative">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading datasets...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted">No entities found matching "{searchQuery}".</td>
                    </tr>
                  ) : (
                    filteredData.map((dataset, idx) => (
                      <AnimatePresence key={dataset.id}>
                        <motion.tr 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`group hover:bg-white/5 transition-colors cursor-pointer ${expandedId === dataset.id ? 'bg-white/5' : ''}`}
                          onClick={() => setExpandedId(expandedId === dataset.id ? null : dataset.id)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl flex justify-center items-center font-bold text-xs shadow-inner ${dataset.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-primary/20 text-primary border border-primary/30'}`}>
                                {dataset.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold text-white flex items-center gap-2">
                                  {dataset.name}
                                  {dataset.status === 'VERIFIED' && <ShieldCheck size={14} className="text-green-500"/>}
                                </div>
                                <div className="text-xs text-muted mt-0.5">{dataset.industry}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 border rounded-md text-[11px] font-bold tracking-wider ${
                              dataset.status === 'VERIFIED' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : dataset.status === 'PENDING'
                                  ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                  : 'bg-white/10 text-muted border-white/20'
                            }`}>
                              {dataset.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-code-sm text-muted">{dataset.capacity}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${dataset.confidence}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className={`h-full ${dataset.confidence > 90 ? 'bg-green-500' : dataset.confidence > 70 ? 'bg-primary' : 'bg-yellow-500'}`} 
                                />
                              </div>
                              <span className={`text-xs font-code-sm ${dataset.confidence > 90 ? 'text-green-400' : 'text-muted'}`}>{dataset.confidence}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-1.5 text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                <FileText size={16} />
                              </button>
                              <button className="p-1.5 text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                        {expandedId === dataset.id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-black/20"
                          >
                            <td colSpan={5} className="px-6 py-4 border-b border-white/5">
                              <div className="grid grid-cols-3 gap-6 p-4 text-sm text-muted">
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Metadata</h4>
                                  <p className="mb-1"><span className="opacity-70">ID:</span> <span className="font-code-sm text-xs">{dataset.id}</span></p>
                                  <p className="mb-1"><span className="opacity-70">Modified:</span> {dataset.last_modified}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Compliance</h4>
                                  <p className="mb-1 flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> GDPR Compliant</p>
                                  <p className="mb-1 flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> ISO 27001</p>
                                </div>
                                <div className="flex items-center justify-end">
                                  <button className="px-4 py-2 border border-primary/50 text-primary hover:bg-primary/10 rounded-lg transition-colors text-xs font-bold">
                                    View Full Report
                                  </button>
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

// Temporary workaround for missing CheckCircle2 import if it wasn't there
import { CheckCircle2 } from "lucide-react";
