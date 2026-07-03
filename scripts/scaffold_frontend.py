import os

files = {
    "frontend/src/app/globals.css": """@import "tailwindcss";

@theme {
  --color-tertiary-fixed-dim: #4cd7f6;
  --color-surface-container-high: #282a2b;
  --color-on-error-container: #ffdad6;
  --color-on-secondary-fixed: #2c0051;
  --color-secondary-fixed-dim: #ddb7ff;
  --color-on-tertiary-container: #002f38;
  --color-surface-bright: #38393a;
  --color-on-primary: #1000a9;
  --color-on-background: #e2e2e2;
  --color-inverse-primary: #494bd6;
  --color-inverse-on-surface: #2f3131;
  --color-on-primary-fixed: #07006c;
  --color-error-container: #93000a;
  --color-surface: #121414;
  --color-inverse-surface: #e2e2e2;
  --color-secondary-fixed: #f0dbff;
  --color-on-tertiary: #003640;
  --color-tertiary-container: #009eb9;
  --color-primary-fixed: #e1e0ff;
  --color-background: #121414;
  --color-surface-container: #1e2020;
  --color-on-error: #690005;
  --color-surface-container-low: #1a1c1c;
  --color-secondary: #ddb7ff;
  --color-on-primary-container: #0d0096;
  --color-surface-container-lowest: #0c0f0f;
  --color-outline: #908fa0;
  --color-on-primary-fixed-variant: #2f2ebe;
  --color-on-tertiary-fixed: #001f26;
  --color-on-tertiary-fixed-variant: #004e5c;
  --color-surface-dim: #121414;
  --color-tertiary: #4cd7f6;
  --color-primary-container: #8083ff;
  --color-primary: #c0c1ff;
  --color-tertiary-fixed: #acedff;
  --color-surface-container-highest: #333535;
  --color-secondary-container: #6f00be;
  --color-on-surface: #e2e2e2;
  --color-surface-tint: #c0c1ff;
  --color-on-secondary-fixed-variant: #6900b3;
  --color-surface-variant: #333535;
  --color-outline-variant: #464554;
  --color-error: #ffb4ab;
  --color-primary-fixed-dim: #c0c1ff;
  --color-on-secondary: #490080;
  --color-on-secondary-container: #d6a9ff;
  --color-on-surface-variant: #c7c4d7;

  --spacing-margin-mobile: 16px;
  --spacing-unit: 4px;
  --spacing-margin-desktop: 48px;
  --spacing-gutter: 24px;
  --spacing-container-max: 1440px;

  --font-code-sm: "JetBrains Mono";
  --font-body-base: "Inter";
  --font-label-caps: "Inter";
  --font-display-lg: "Geist";
  --font-headline-md: "Geist";
  --font-display-lg-mobile: "Geist";
  --font-body-sm: "Inter";
}

@layer base {
  body {
    background-color: #09090B;
    color: #e2e2e2;
    overflow-x: hidden;
  }
}

@layer components {
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
  .glass-panel {
    background: rgba(24, 24, 27, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid #27272A;
  }
  .glow-border:hover {
    border-color: #494bd6;
    box-shadow: 0 0 20px rgba(73, 75, 214, 0.15);
  }
  .hover-lift {
    transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease;
  }
  .hover-lift:hover {
    transform: translateY(-4px);
  }
  .blob-bg {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(73, 75, 214, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
    filter: blur(80px);
    z-index: -1;
    animation: move 20s infinite alternate;
  }
}

@keyframes move {
  from { transform: translate(-10%, -10%); }
  to { transform: translate(20%, 20%); }
}
""",

    "frontend/src/app/layout.tsx": """import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexusAI | Enterprise Business Discovery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@450&family=Geist:wght@600;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body-base text-body-base antialiased">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="blob-bg" style={{top: "-100px", left: "-100px"}}></div>
          <div className="blob-bg" style={{bottom: "-200px", right: "-100px", background: "radial-gradient(circle, rgba(111, 0, 190, 0.08) 0%, rgba(0, 0, 0, 0) 70%)"}}></div>
        </div>
        {children}
      </body>
    </html>
  );
}
""",
    "frontend/src/components/layout/TopNavBar.tsx": """export default function TopNavBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-container-low shadow-sm">
      <div className="flex items-center gap-gutter">
        <span className="text-headline-md font-headline-md font-bold text-on-surface">NexusAI</span>
        <div className="hidden md:flex gap-6 items-center ml-12">
          <a className="font-label-caps text-[12px] text-primary border-b-2 border-primary py-1" href="#">Dashboard</a>
          <a className="font-label-caps text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">Explorer</a>
          <a className="font-label-caps text-[12px] text-on-surface-variant hover:text-primary transition-colors" href="#">Reports</a>
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
""",
    "frontend/src/components/layout/SideNavBar.tsx": """export default function SideNavBar() {
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
""",
    "frontend/src/app/page.tsx": """import TopNavBar from "@/components/layout/TopNavBar";
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
"""
}

for path, content in files.items():
    full_path = os.path.join(os.getcwd(), path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Scaffolded Frontend files successfully")
