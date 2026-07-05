"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Paperclip, Terminal, CheckCircle2, CircleDashed, Clock, ChevronRight } from "lucide-react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const processSteps = [
    "Analyzing query intent & constraints",
    "Retrieving schema contexts from DB",
    "Synthesizing logical validation plan",
    "Engaging Nexus LLM generation",
    "Validating output against safety constraints"
  ];

  useEffect(() => {
    fetchSessions();
    if (initialQuery) {
      handleRunQuery(initialQuery);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, inspectorSteps]);

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
      setInspectorSteps(processSteps);
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
      <main className="md:ml-[280px] pt-16 min-h-screen flex text-sm overflow-hidden bg-background">
        {/* Left Panel: Recent Sessions */}
        <div className="w-[300px] border-r border-white/5 p-6 flex flex-col gap-4 hidden lg:flex bg-[#09090b]/50">
          <h2 className="font-label-caps text-[11px] text-muted uppercase tracking-widest font-semibold mb-2">History</h2>
          {sessions.length === 0 ? (
            <p className="text-xs text-muted">No recent sessions.</p>
          ) : (
            sessions.map(s => (
              <div key={s.id} className="p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 border border-white/5 transition-all">
                <h3 className="text-white font-medium mb-1 truncate text-sm">{s.query}</h3>
                <p className="text-[11px] text-muted flex items-center gap-1">
                  <Clock size={10}/> {new Date(s.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Center Panel: Chat Interface */}
        <div className="flex-1 flex flex-col relative h-[calc(100vh-4rem)]">
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 ${loading ? 'bg-cyan-400 animate-pulse' : 'bg-primary'} rounded-full shadow-[0_0_8px_rgba(79,124,255,0.8)]`}></span>
              <span className="text-white font-medium text-sm">Active Session: {activeQuery}</span>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scroll-smooth">
            <AnimatePresence>
              {chatHistory.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={msg.role === "user" ? "self-end max-w-[80%]" : "self-start flex gap-4 max-w-[85%]"}
                >
                  {msg.role === "agent" && (
                    <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center text-primary mt-1 shrink-0">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`p-5 rounded-2xl border ${msg.role === "user" ? 'bg-white/10 border-white/10 text-white rounded-br-sm' : 'glass-panel text-white rounded-bl-sm'}`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start flex gap-4 max-w-[80%]"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center text-primary mt-1 shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="glass-panel p-5 rounded-2xl rounded-bl-sm flex items-center gap-2">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="p-6 bg-gradient-to-t from-background via-background to-transparent pt-12">
            <div className="relative flex items-center glass-panel rounded-2xl p-2 pr-4 shadow-2xl">
              <input 
                className="bg-transparent border-none focus:outline-none w-full text-white placeholder-muted px-4 py-3" 
                placeholder="Message NexusAI..." 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRun()}
                disabled={loading}
              />
              <button className="p-2 text-muted hover:text-white transition-colors rounded-lg hover:bg-white/10">
                <Paperclip size={18} />
              </button>
              <button 
                onClick={handleRun}
                disabled={loading}
                className={`ml-2 px-4 py-2 ${loading ? 'bg-white/10 text-muted cursor-not-allowed' : 'bg-white text-black hover:bg-white/90'} rounded-xl font-bold flex items-center gap-2 transition-all`}
              >
                <Send size={16} /> {loading ? 'Thinking' : 'Send'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Execution Inspector */}
        <div className="w-[420px] border-l border-white/5 flex flex-col hidden xl:flex bg-[#09090b]/50 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-10">
            <h2 className="font-display-lg text-lg text-white font-bold flex items-center gap-2">
              <Terminal size={18} className="text-primary"/> Execution Inspector
            </h2>
            <p className="text-[11px] text-muted mt-1 uppercase tracking-widest font-semibold">Real-Time Event Logs</p>
          </div>
          
          <div className="p-6">
            <div className="relative border-l-2 border-white/10 ml-3 space-y-8">
              <AnimatePresence>
                {inspectorSteps.length > 0 ? (
                  inspectorSteps.map((step, idx) => {
                    const isLast = idx === inspectorSteps.length - 1;
                    const isActive = loading && isLast;
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative pl-6"
                      >
                        <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center bg-background border-2 ${isActive ? 'border-primary' : 'border-green-500'}`}>
                          {isActive ? (
                            <CircleDashed size={12} className="text-primary animate-spin" />
                          ) : (
                            <CheckCircle2 size={12} className="text-green-500" />
                          )}
                        </div>
                        
                        <div className={`p-4 rounded-xl border ${isActive ? 'bg-primary/5 border-primary/30' : 'bg-white/5 border-white/10'} transition-all`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] font-code-sm font-bold uppercase tracking-widest ${isActive ? 'text-primary' : 'text-green-400'}`}>
                              {isActive ? 'Processing' : 'Completed'}
                            </span>
                            {!isActive && <span className="text-[10px] font-code-sm text-muted">24ms</span>}
                          </div>
                          <p className="text-sm text-white font-medium">{step}</p>
                          {isActive && (
                            <div className="mt-3 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                              <motion.div 
                                className="bg-primary h-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="pl-6 text-sm text-muted">
                    Submit a query to inspect execution runtime.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
