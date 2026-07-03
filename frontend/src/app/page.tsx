import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

export default function Dashboard() {
  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-64 pt-16 min-h-screen relative z-10 flex flex-col items-center">
        <section className="w-full max-w-5xl px-margin-mobile md:px-gutter py-12 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="material-symbols-outlined text-[14px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
            <span className="font-code-sm text-[13px] text-primary uppercase tracking-wider">Enterprise Discovery Engine v2.4</span>
          </div>
          <h1 className="font-display-lg text-[32px] md:text-[48px] text-on-surface mb-8 tracking-tight font-bold">
            Enterprise Business <br className="hidden md:block"/> <span className="bg-gradient-to-r from-primary to-tertiary text-transparent bg-clip-text">Discovery Agent</span>
          </h1>
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-[#09090B] border border-outline-variant rounded-2xl px-6 py-4">
              <span className="material-symbols-outlined text-outline mr-4">search</span>
              <input className="bg-transparent border-none focus:outline-none w-full text-body-base placeholder-on-surface-variant" placeholder="What are you looking for today?" type="text"/>
              <button className="ml-4 px-6 py-2 bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container rounded-xl font-label-caps text-[12px] font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 cursor-pointer">
                Discover
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
