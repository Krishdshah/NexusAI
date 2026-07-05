"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Building2, Stethoscope, ChevronDown, CheckCircle2, X } from "lucide-react";
import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

interface BusinessRecord {
  id: string;
  name: string;
  industry: string;
  type: string;
  location: string;
  description: string;
  contact: string;
  status: string;
}

export default function ClientDirectory() {
  const [businesses, setBusinesses] = useState<BusinessRecord[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessRecord | null>(null);

  useEffect(() => {
    // Fetch and parse the CSV
    const loadDataset = async () => {
      try {
        const response = await fetch('/dataset/business.csv');
        const csvText = await response.text();
        const rows = csvText.split('\n').filter(row => row.trim() !== '');
        
        // Skip header row
        const data = rows.slice(1).map(row => {
          const cols = row.split(',');
          return {
            id: cols[0],
            name: cols[1],
            industry: cols[2],
            type: cols[3],
            location: cols[4],
            description: cols[5],
            contact: cols[6],
            status: cols[7]
          } as BusinessRecord;
        });
        
        setBusinesses(data);
      } catch (err) {
        console.error("Failed to load business dataset", err);
      }
    };
    loadDataset();
  }, []);

  const types = ["All", ...Array.from(new Set(businesses.map(b => b.type)))];
  const locations = ["All", ...Array.from(new Set(businesses.map(b => b.location)))];

  const filteredData = businesses.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || b.type === filterType;
    const matchesLocation = filterLocation === "All" || b.location === filterLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-[280px] pt-16 min-h-screen p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-display-lg font-bold text-white mb-2">Client Portal: Provider Directory</h1>
            <p className="text-muted">Discover and connect with top-tier healthcare providers based on your exact requirements.</p>
          </div>

          {/* Filters & Search */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search providers by name or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <select 
                  value={filterType}
                  onChange={e => setFilterType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none appearance-none"
                >
                  {types.map(t => <option key={t} value={t} className="bg-[#09090b]">{t}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={16} />
              </div>

              <div className="relative flex-1 md:w-48">
                <select 
                  value={filterLocation}
                  onChange={e => setFilterLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none appearance-none"
                >
                  {locations.map(l => <option key={l} value={l} className="bg-[#09090b]">{l}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredData.map((business, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  key={business.id}
                  className="glass-card p-6 flex flex-col h-full cursor-pointer hover:border-primary/50 group"
                  onClick={() => setSelectedBusiness(business)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {business.type === "Pharmacy" ? <Stethoscope size={24} /> : <Building2 size={24} />}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={12} /> {business.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{business.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted mb-4">
                    <MapPin size={14} /> {business.location} • {business.type}
                  </div>
                  
                  <p className="text-sm text-gray-400 flex-1 line-clamp-2">{business.description}</p>
                  
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                      View Profile
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-20 text-muted">
              No providers found matching your criteria.
            </div>
          )}
        </motion.div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedBusiness && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-muted text-xs font-medium mb-4 inline-block">{selectedBusiness.industry}</span>
                    <h2 className="text-3xl font-display-lg font-bold text-white">{selectedBusiness.name}</h2>
                  </div>
                  <button onClick={() => setSelectedBusiness(null)} className="p-2 text-muted hover:text-white rounded-full hover:bg-white/10 transition-colors">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-muted mb-1 uppercase tracking-wider">Type</p>
                    <p className="text-white font-medium flex items-center gap-2"><Stethoscope size={16} className="text-primary"/> {selectedBusiness.type}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-muted mb-1 uppercase tracking-wider">Location</p>
                    <p className="text-white font-medium flex items-center gap-2"><MapPin size={16} className="text-accent"/> {selectedBusiness.location}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">About Provider</h3>
                  <p className="text-muted leading-relaxed">{selectedBusiness.description}</p>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(79,124,255,0.3)]">
                    Request Connection
                  </button>
                  <button className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 border border-white/10 transition-all">
                    Save to Shortlist
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
