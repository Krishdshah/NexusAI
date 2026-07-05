"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavBar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "AI Agent", href: "/agent", icon: "smart_toy" },
    { name: "Execution History", href: "/history", icon: "history" },
    { name: "Dataset Explorer", href: "/explorer", icon: "database" },
    { name: "Validation Reports", href: "/reports", icon: "verified" },
    { name: "Approvals", href: "/approvals", icon: "rule" },
    { name: "Analytics", href: "/analytics", icon: "analytics" },
    { name: "Settings", href: "/settings", icon: "settings" },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-40 flex-col pt-4 pb-8 px-4 bg-surface-container border-r border-outline-variant hidden md:flex">
      <div className="flex-1 flex flex-col gap-1">
        <div className="px-3 mb-4">
          <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest">Discovery Shell</p>
        </div>
        <nav className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden pr-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-secondary-container text-on-secondary-container font-bold translate-x-1"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span className="font-label-caps text-[12px]">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-1">
        <Link href="/support" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-caps text-[12px]">Support</span>
        </Link>
        <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-caps text-[12px]">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
