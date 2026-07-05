"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Bot, 
  History, 
  Database, 
  FileCheck, 
  CheckSquare, 
  BarChart2, 
  Settings, 
  LifeBuoy, 
  LogOut 
} from "lucide-react";

export default function SideNavBar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, shortcut: "D" },
    { name: "AI Agent", href: "/agent", icon: Bot, shortcut: "A" },
    { name: "Dataset Explorer", href: "/explorer", icon: Database, shortcut: "E" },
    { name: "Execution History", href: "/history", icon: History, shortcut: "H" },
    { name: "Validation Reports", href: "/reports", icon: FileCheck },
    { name: "Approvals", href: "/approvals", icon: CheckSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] z-40 flex-col pt-6 pb-8 px-4 bg-[#09090b]/80 backdrop-blur-xl border-r border-white/5 hidden md:flex">
      <div className="flex-1 flex flex-col gap-2">
        <div className="px-3 mb-2">
          <p className="font-label-caps text-[11px] text-muted uppercase tracking-widest font-semibold">Workspace</p>
        </div>
        <nav className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? "text-white font-medium"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <div className="relative flex items-center gap-3 z-10">
                  <Icon size={18} className={`${isActive ? "text-primary" : "group-hover:text-white transition-colors"}`} />
                  <span className="text-[13px]">{link.name}</span>
                </div>
                {link.shortcut && (
                  <span className="relative z-10 px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    ⌘{link.shortcut}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto pt-4 flex flex-col gap-1">
        <Link href="/support" className="flex items-center gap-3 px-3 py-2.5 text-muted hover:bg-white/5 hover:text-white rounded-xl transition-all group">
          <LifeBuoy size={18} className="group-hover:text-white transition-colors" />
          <span className="text-[13px]">Support</span>
        </Link>
        <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 text-muted hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all group">
          <LogOut size={18} className="group-hover:text-red-400 transition-colors" />
          <span className="text-[13px]">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
