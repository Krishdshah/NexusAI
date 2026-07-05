"use client";

import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

export default function Approvals() {
  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-[280px] pt-16 min-h-screen p-8 bg-background flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-12 text-center max-w-md border border-white/5 shadow-2xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/50 text-primary flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckSquare size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Approvals</h2>
          <p className="text-muted text-sm">This module is currently being upgraded to the Nexus-3 Architecture.</p>
        </motion.div>
      </main>
    </>
  );
}
