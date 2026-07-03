export default function SideNavBar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-40 flex-col pt-20 pb-8 px-4 bg-surface-container border-r border-outline-variant hidden md:flex">
      <div className="flex-1 flex flex-col gap-1">
        <div className="px-3 mb-4">
          <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest">Discovery Shell</p>
        </div>
        <nav className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-3 py-2.5 bg-secondary-container text-on-secondary-container rounded-lg font-bold translate-x-1 transition-transform" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-caps text-[12px]">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all" href="#">
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="font-label-caps text-[12px]">AI Agent</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}
