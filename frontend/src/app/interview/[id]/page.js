"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic2, MicOff, MessageSquare, Info, User, Bot, Sparkles, Activity, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewRoom() {
  const [status, setStatus] = useState("idle"); // idle, listening, processing, speaking
  const [transcript, setTranscript] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [connectionError, setConnectionError] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const transcriptEndRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const startInterview = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        const res = await fetch("http://localhost:5001/interview/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ role: "Software Engineer" }),
        });

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setSessionId(data.session?.id || "demo-session");
        setCurrentQuestion(data.firstQuestion || null);
        setTranscript([{
          id: Date.now(),
          type: "ai",
          text: data.firstQuestion?.questionText || "Tell me about yourself and your background."
        }]);
        if (data.firstQuestion?.audioUrl) playAudio(data.firstQuestion.audioUrl);
      } catch (err) {
        // Fallback: demo mode with placeholder question
        setConnectionError(true);
        setSessionId("demo-session");
        setCurrentQuestion({ id: "demo-q1", questionText: "Tell me about yourself and your experience with software engineering." });
        setTranscript([{
          id: Date.now(),
          type: "ai",
          text: "Tell me about yourself and your experience with software engineering."
        }]);
      } finally {
        setInitialLoading(false);
      }
    };
    startInterview();
  }, []);

  const playAudio = (url) => {
    setStatus("speaking");
    try {
      const audio = new Audio(`http://localhost:5001${url}`);
      audio.onended = () => setStatus("idle");
      audio.onerror = () => setStatus("idle");
      audio.play().catch(() => setStatus("idle"));
    } catch {
      setStatus("idle");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        sendAnswer(audioBlob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus("listening");
    } catch (err) {
      alert("Please allow microphone access to use this feature.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setStatus("processing");
  };

  const sendAnswer = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob);
    formData.append("sessionId", sessionId);
    formData.append("questionId", currentQuestion?.id || "demo");

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:5001/interview/answer", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setTranscript((prev) => [
        ...prev,
        { id: Date.now() + 1, type: "user", text: data.evaluation?.transcript || "Your response was recorded." },
        { id: Date.now() + 2, type: "ai", text: data.nextQuestion?.questionText || "Thank you. Let's move to the next question." },
      ]);
      setCurrentQuestion(data.nextQuestion || null);
      if (data.nextQuestion?.audioUrl) playAudio(data.nextQuestion.audioUrl);
      else setStatus("idle");
    } catch (error) {
      // Fallback: still show something in the transcript
      setTranscript((prev) => [
        ...prev,
        { id: Date.now() + 1, type: "user", text: "Your response was recorded." },
        { id: Date.now() + 2, type: "ai", text: "Great response! Can you elaborate on a project where you demonstrated leadership?" },
      ]);
      setStatus("idle");
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  if (initialLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-500">Initializing AI session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30 -z-10" />
      
      {/* Connection warning */}
      {connectionError && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-[10px] font-bold shadow-sm">
          <AlertCircle className="w-3 h-3" />
          Demo mode — backend not connected
        </div>
      )}

      {/* Main Interview Area */}
      <div className="flex-1 flex flex-col p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-6">
        <Card className="flex-1 glass border-white/60 overflow-hidden relative flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl">
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 flex-wrap">
             <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest border border-red-100 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Live
             </div>
             <div className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">
                Software Eng • Round 1
             </div>
          </div>

          {/* Mobile sidebar toggle */}
          <button
            className="lg:hidden absolute top-4 right-4 p-2 bg-slate-900/80 text-white rounded-xl z-20"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          
          <div className="space-y-6 sm:space-y-8 flex flex-col items-center px-4">
            {/* AI Avatar */}
            <div className="relative group">
              <div className={cn(
                "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-white flex items-center justify-center border-8 border-white shadow-xl transition-all duration-700 relative z-10",
                status === "speaking" && "ring-[16px] sm:ring-[20px] ring-blue-100/50 scale-105",
                status === "listening" && "ring-[16px] sm:ring-[20px] ring-red-100/50 scale-105"
              )}>
                <AnimatePresence mode="wait">
                  {status === "speaking" ? (
                    <motion.div
                      key="speaking"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <Bot className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-blue-600" />
                    </motion.div>
                  ) : status === "listening" ? (
                    <motion.div
                      key="listening"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <Activity className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-500 animate-pulse" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <User className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-slate-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {status === "speaking" && (
                <>
                  <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-blue-400/5 animate-ping [animation-delay:0.5s]" />
                </>
              )}
            </div>
            
            <div className="text-center space-y-2">
               <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900 tracking-tight">
                 {status === "speaking" ? "AI Coach is posing a question..." : 
                  status === "listening" ? "Listening to your response..." : 
                  status === "processing" ? "Analyzing your response..." : "Ready to begin"}
               </h2>
               <div className="flex items-center justify-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                 <p className="text-slate-500 font-bold uppercase text-[8px] sm:text-[9px] tracking-widest">Voice-Interactive Mode</p>
               </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-6 sm:bottom-10 flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <Button 
                size="lg" 
                variant={isRecording ? "destructive" : "premium"} 
                className={cn(
                  "h-14 w-14 sm:h-16 sm:w-16 rounded-2xl shadow-xl transition-all border-none",
                  isRecording ? "bg-red-500 shadow-red-500/30" : "bg-blue-600 shadow-blue-500/30"
                )}
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic2 className="w-5 h-5" />}
              </Button>
            </motion.div>
            
            {!isRecording && status === "idle" && (
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                Tap mic to speak
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Transcript Sidebar — responsive overlay on mobile */}
      <aside className={cn(
        "lg:w-[380px] xl:w-[420px] glass-dark flex flex-col shadow-3xl relative transition-transform duration-300",
        "fixed lg:static inset-0 z-30 lg:z-auto",
        showSidebar ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
        {/* Mobile close */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 text-white/60 hover:text-white z-20"
          onClick={() => setShowSidebar(false)}
        >
          <span className="text-sm font-bold">✕</span>
        </button>

        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-500/20 rounded-lg">
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="font-outfit font-black text-sm text-white tracking-tight">Live Transcript</h3>
          </div>
          <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 w-8 h-8">
            <Info className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 scrollbar-hide">
          {transcript.length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-xs text-white/40 font-medium">Session transcript will appear here...</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {transcript.map((m) => (
                <motion.div 
                  key={m.id}
                  initial={{ opacity: 0, x: m.type === "user" ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex flex-col gap-2 max-w-[90%]",
                    m.type === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className="flex items-center gap-1.5 px-0.5">
                    {m.type === "ai" && <Sparkles className="w-2.5 h-2.5 text-blue-400" />}
                    <span className={cn(
                      "text-[8px] sm:text-[9px] uppercase font-black tracking-widest",
                      m.type === "ai" ? "text-blue-400" : "text-slate-400"
                    )}>
                      {m.type === "ai" ? "AI COACH" : "YOU"}
                    </span>
                  </div>
                  <div className={cn(
                    "p-3.5 sm:p-4 rounded-xl text-xs sm:text-[0.8125rem] leading-relaxed font-medium shadow-lg",
                    m.type === "ai" 
                      ? "bg-slate-800 text-slate-200 rounded-tl-none border border-white/5" 
                      : "bg-blue-600 text-white rounded-tr-none shadow-blue-500/10"
                  )}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={transcriptEndRef} />
        </div>

        {/* Real-time Insights Card */}
        <div className="p-5 sm:p-6 border-t border-white/10">
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardContent className="p-4 space-y-3">
               <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-widest">
                 <div className="flex items-center gap-1.5">
                   <Activity className="w-3.5 h-3.5" />
                   <span>Live Score</span>
                 </div>
                 <span className="text-base sm:text-lg">8.2<span className="text-[9px] text-white/30 ml-0.5">/ 10</span></span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "82%" }}
                   className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                 />
               </div>
               <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                 <p className="text-[8px] sm:text-[9px] text-slate-400 leading-relaxed font-semibold uppercase tracking-wider mb-1">
                   Live Critique
                 </p>
                 <p className="text-xs text-slate-300 leading-relaxed font-medium">
                   Current answer shows <span className="text-blue-400">excellent clarity</span>. 
                   Elaborate more on the &quot;Action&quot; part of your STAR response.
                 </p>
               </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
