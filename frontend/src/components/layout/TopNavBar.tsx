import Link from "next/link";

export default function TopNavBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-container-low shadow-sm">
      <div className="flex items-center gap-gutter">
        <Link href="/" className="text-headline-md font-headline-md font-bold text-on-surface">NexusAI</Link>
        <div className="hidden md:flex gap-6 items-center ml-12">
          <Link className="font-label-caps text-[12px] text-primary border-b-2 border-primary py-1" href="/dashboard">Dashboard</Link>
          <Link className="font-label-caps text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="/explorer">Explorer</Link>
          <Link className="font-label-caps text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="/reports">Reports</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        </button>
        <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant">settings_brightness</span>
        </button>
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 bg-surface-variant rounded-full border border-outline-variant">
          <span className="font-label-caps text-[12px] px-2">Account</span>
          <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>account_circle</span>
        </button>
      </div>
    </header>
  );
}
