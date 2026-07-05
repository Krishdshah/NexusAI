"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TopNavBar from "@/components/layout/TopNavBar";
import SideNavBar from "@/components/layout/SideNavBar";

interface Session {
  id: string;
  query: string;
  created_at: string;
  status: string;
}

export default function AIAgentWorkspace() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("query") || "";
  const [sessions, setSessions] = useState<Session[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState(initialQuery || "Logistics Optimization");
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  
  // Dynamic Inspector States
  const [inspectorSteps, setInspectorSteps] = useState<string[]>([]);
  
  const processSteps = [
    "Analyzing query intent...",
    "Retrieving schema contexts...",
    "Synthesizing logical plan...",
    "Engaging LLM generation...",
    "Validating output..."
  ];

  useEffect(() => {
    fetchSessions();
    if (initialQuery) {
      handleRunQuery(initialQuery);
    }
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/agent/sessions");
      const data = await res.json();
      setSessions(data);
    } catch (e) {
      console.error("Failed to fetch sessions", e);
    }
  };

  const handleRunQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setActiveQuery(queryText);
    setChatHistory(prev => [...prev, { role: "user", content: queryText }]);
    setInput("");
    setLoading(true);
    setInspectorSteps([]);

    // Simulate stepping logic
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < processSteps.length) {
        setInspectorSteps(prev => [...prev, processSteps[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    try {
      const res = await fetch(`http://localhost:8000/api/agent/chat?query=${encodeURIComponent(queryText)}`, {
        method: "POST"
      });
      const data = await res.json();
      clearInterval(interval);
      setInspectorSteps(processSteps); // Ensure all steps are shown
      setChatHistory(prev => [...prev, { role: "agent", content: data.response }]);
      fetchSessions();
    } catch (e) {
      console.error(e);
      clearInterval(interval);
      setChatHistory(prev => [...prev, { role: "agent", content: "Error connecting to Agent." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = () => handleRunQuery(input);

  return (
    <>
      <TopNavBar />
      <SideNavBar />
      <main className="md:ml-64 pt-16 min-h-screen flex text-sm">
        {/* Left Panel: Recent Sessions */}
        <div className="w-1/4 border-r border-outline-variant p-4 flex flex-col gap-4 hidden lg:flex">
          <h2 className="font-label-caps text-xs text-outline uppercase">Recent Sessions</h2>
          {sessions.length === 0 ? (
            <p className="text-xs text-outline">No sessions found.</p>
          ) : (
            sessions.map(s => (
              <div key={s.id} className="p-4 bg-surface-container-highest rounded-xl cursor-pointer hover:bg-surface-variant transition-colors">
                <h3 className="text-on-surface font-semibold mb-1 truncate">{s.query}</h3>
                <p className="text-xs text-outline">{new Date(s.created_at).toLocaleString()} • {s.status}</p>
              </div>
            ))
          )}
        </div>

        {/* Center Panel: Chat Interface */}
        <div className="flex-1 flex flex-col border-r border-outline-variant relative">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 ${loading ? 'bg-tertiary animate-pulse' : 'bg-primary'} rounded-full`}></span>
              <span className="text-on-surface font-semibold">Active Session: {activeQuery}</span>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
            {chatHistory.map((msg, idx) => (
              msg.role === "user" ? (
                <div key={idx} className="self-end bg-surface-container-highest p-4 rounded-xl max-w-[80%] border border-outline-variant">
                  <p className="text-on-surface">{msg.content}</p>
                </div>
              ) : (
                <div key={idx} className="self-start flex gap-4 max-w-[80%]">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary mt-1 shrink-0">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                  </div>
                  <div className="bg-surface-container p-4 rounded-xl border border-outline-variant flex-1 whitespace-pre-wrap">
                    <p className="text-on-surface">{msg.content}</p>
                  </div>
                </div>
              )
            ))}
            {loading && (
              <div className="self-start flex gap-4 max-w-[80%]">
                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary mt-1 shrink-0">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div className="bg-surface-container p-4 rounded-xl border border-tertiary/50 flex-1">
                  <div className="flex gap-1 items-center h-full">
                    <span className="w-2 h-2 bg-tertiary rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-tertiary rounded-full animate-bounce" style={{animationDelay: '100ms'}}></span>
                    <span className="w-2 h-2 bg-tertiary rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-surface-container">
            <div className="relative flex items-center bg-[#09090B] border border-outline-variant rounded-xl p-2 pr-4">
              <input 
                className="bg-transparent border-none focus:outline-none w-full text-body-base placeholder-on-surface-variant px-4 py-2" 
                placeholder="Ask NexusAI to analyze, discover, or report..." 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRun()}
                disabled={loading}
              />
              <button className="material-symbols-outlined text-outline hover:text-on-surface mx-2">attach_file</button>
              <button 
                onClick={handleRun}
                disabled={loading}
                className={`px-6 py-2 ${loading ? 'bg-surface-variant text-outline' : 'bg-primary text-on-primary'} rounded-lg font-bold flex items-center gap-2 hover:opacity-90`}
              >
                <span className="material-symbols-outlined text-sm">send</span> {loading ? 'RUNNING' : 'RUN'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Execution Inspector (Dynamic Simulation) */}
        <div className="w-[30%] bg-surface-container p-6 flex flex-col gap-6 hidden xl:flex">
          <h2 className="font-headline-md text-lg text-on-surface font-semibold">Execution Inspector</h2>
          <p className="text-xs text-outline uppercase tracking-wider mb-2">Real-Time Logic Visualization</p>
          
          <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant before:to-transparent">
            {inspectorSteps.length > 0 ? (
              inspectorSteps.map((step, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${loading && idx === inspectorSteps.length - 1 ? 'border-tertiary bg-background text-tertiary shadow' : 'border-primary bg-primary text-on-primary'} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                    {loading && idx === inspectorSteps.length - 1 ? (
                      <div className="w-2 h-2 bg-tertiary rounded-full animate-ping"></div>
                    ) : (
                      <span className="material-symbols-outlined text-[12px]">check</span>
                    )}
                  </div>
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-surface-container-highest border ${loading && idx === inspectorSteps.length - 1 ? 'border-tertiary/50 shadow' : 'border-outline-variant'} transition-colors duration-300`}>
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className={`font-bold ${loading && idx === inspectorSteps.length - 1 ? 'text-tertiary' : 'text-on-surface'}`}>Step {idx + 1}</div>
                    </div>
                    <div className="text-xs text-on-surface-variant mb-2">{step}</div>
                    {loading && idx === inspectorSteps.length - 1 && (
                      <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                        <div className="bg-tertiary h-1.5 rounded-full w-[45%] animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-outline text-center mt-10">
                Submit a query to inspect execution steps.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
