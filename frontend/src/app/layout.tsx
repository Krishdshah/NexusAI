import "./globals.css";
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
      <body className="font-body-base text-body-base antialiased bg-[#09090b] selection:bg-primary/30 text-on-surface">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_10%_100%,rgba(73,75,214,0.15),transparent_50%),radial-gradient(circle_at_90%_100%,rgba(76,215,246,0.1),transparent_50%)]"></div>
          <div className="blob-bg opacity-70" style={{top: "-15%", left: "-10%", background: "radial-gradient(circle, rgba(111, 0, 190, 0.15) 0%, rgba(0, 0, 0, 0) 70%)", width: "800px", height: "800px"}}></div>
          <div className="blob-bg opacity-70" style={{bottom: "-20%", right: "-10%", background: "radial-gradient(circle, rgba(76, 215, 246, 0.12) 0%, rgba(0, 0, 0, 0) 70%)", width: "700px", height: "700px", animationDelay: "-5s"}}></div>
          <div className="blob-bg opacity-60" style={{top: "40%", left: "40%", background: "radial-gradient(circle, rgba(73, 75, 214, 0.1) 0%, rgba(0, 0, 0, 0) 70%)", width: "900px", height: "900px", animationDelay: "-10s"}}></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
