import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

export default function Settings() {
  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-64 pt-16 min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">settings</span>
          <h1 className="text-2xl font-bold text-on-surface mb-2">Settings</h1>
          <p className="text-on-surface-variant">This module is currently under development.</p>
        </div>
      </main>
    </>
  );
}
