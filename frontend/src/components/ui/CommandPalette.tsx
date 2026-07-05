"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bot, History, Database, LayoutDashboard, FileCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const items = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Agent Workspace", href: "/agent", icon: Bot },
    { name: "Execution History", href: "/history", icon: History },
    { name: "Dataset Explorer", href: "/explorer", icon: Database },
    { name: "Validation Reports", href: "/reports", icon: FileCheck },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-card border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-white/5">
              <Search className="text-muted w-5 h-5" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything (e.g. 'history', 'suppliers')..."
                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 px-4 py-4 placeholder-muted text-lg"
              />
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/5 rounded text-xs font-code-sm text-muted">ESC</kbd>
              </div>
            </div>
            
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-muted">
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted uppercase tracking-wider">Pages</div>
                  {filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center gap-3 px-3 py-3 hover:bg-white/5 rounded-xl transition-colors text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon size={16} className="text-muted group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-white font-medium">{item.name}</span>
                        <span className="ml-auto text-xs text-muted font-code-sm">Jump to</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
