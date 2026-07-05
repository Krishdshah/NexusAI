"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Eye, CheckCircle2, FileText, Settings, CreditCard, ChevronRight } from "lucide-react";
import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

export default function BusinessPortal() {
  const kpis = [
    { title: "Profile Views (30d)", value: "1,284", change: "+12.5%", trend: "up", icon: Eye },
    { title: "Connection Requests", value: "34", change: "+5.2%", trend: "up", icon: Users },
    { title: "Search Impressions", value: "8,402", change: "+24.1%", trend: "up", icon: TrendingUp },
  ];

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display-lg font-bold text-white mb-2">Supplier Portal: Overview</h1>
              <p className="text-muted">Manage your business profile and track your enterprise visibility.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Profile Verified
              </span>
              <button className="px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpis.map((kpi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <kpi.icon size={24} />
                  </div>
                  <span className={`text-xs font-bold ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {kpi.change}
                  </span>
                </div>
                <h3 className="text-muted font-medium mb-1">{kpi.title}</h3>
                <p className="text-4xl font-display-lg font-bold text-white">{kpi.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Leads */}
            <div className="lg:col-span-2 glass-panel p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Recent Client Connections</h2>
                <button className="text-sm text-primary hover:text-white transition-colors">View All</button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Global Health Inc.", type: "Enterprise Buyer", status: "Pending", time: "2 hours ago" },
                  { name: "CityMed Clinics", type: "Procurement", status: "Accepted", time: "1 day ago" },
                  { name: "FirstAid Supply Co.", type: "Distributor", status: "Accepted", time: "3 days ago" },
                ].map((lead, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-white font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{lead.name}</h4>
                        <p className="text-xs text-muted">{lead.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${lead.status === 'Accepted' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        {lead.status}
                      </span>
                      <ChevronRight size={16} className="text-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="glass-panel p-6 rounded-3xl flex-1">
                <h2 className="text-lg font-bold text-white mb-6">Manage Business</h2>
                <div className="space-y-3">
                  {[
                    { icon: FileText, label: "Update Certifications" },
                    { icon: Users, label: "Team Access" },
                    { icon: CreditCard, label: "Billing & Plans" },
                    { icon: Settings, label: "Account Settings" },
                  ].map((action, i) => (
                    <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-muted hover:text-white transition-colors text-left group">
                      <action.icon size={18} className="group-hover:text-primary transition-colors" />
                      <span className="font-medium text-sm">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="rounded-3xl p-6 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white font-bold mb-2">Boost Visibility</h3>
                  <p className="text-sm text-white/80 mb-4">Upgrade to Enterprise tier to rank higher in client discovery searches.</p>
                  <button className="w-full py-2 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </main>
    </>
  );
}
