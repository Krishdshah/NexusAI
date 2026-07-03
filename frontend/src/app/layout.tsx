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
