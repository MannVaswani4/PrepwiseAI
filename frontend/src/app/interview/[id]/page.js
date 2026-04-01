"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mic2, MicOff, Send, MessageSquare, Info, User, Bot, Sparkles, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewRoom() {
  const [status, setStatus] = useState("idle"); // idle, listening, processing, speaking
  const [transcript, setTranscript] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    const startInterview = async () => {
      const res = await fetch("http://localhost:5000/interview/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role: "Software Engineer" }),
      });
      const data = await res.json();
      setSessionId(data.session.id);
      setCurrentQuestion(data.firstQuestion);
      setTranscript([{ id: Date.now(), type: "ai", text: data.firstQuestion.questionText }]);
      if (data.firstQuestion.audioUrl) playAudio(data.firstQuestion.audioUrl);
    };
    startInterview();
  }, []);

  const playAudio = (url) => {
    setStatus("speaking");
    const audio = new Audio(`http://localhost:5000${url}`);
    audio.onended = () => setStatus("idle");
    audio.play();
  };

  const startRecording = async () => {
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
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setStatus("processing");
  };

  const sendAnswer = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob);
    formData.append("sessionId", sessionId);
    formData.append("questionId", currentQuestion.id);

    try {
      const res = await fetch("http://localhost:5000/interview/answer", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      const data = await res.json();
      setTranscript((prev) => [
        ...prev,
        { id: Date.now() + 1, type: "user", text: data.evaluation.transcript },
        { id: Date.now() + 2, type: "ai", text: data.nextQuestion.questionText },
      ]);
      setCurrentQuestion(data.nextQuestion);
      if (data.nextQuestion.audioUrl) playAudio(data.nextQuestion.audioUrl);
    } catch (error) {
      console.error(error);
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

  return (
    <div className="flex h-[calc(100vh-80px)] bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30 -z-10" />
      
      {/* Main Interview Area */}
      <div className="flex-1 flex flex-col p-8 space-y-8">
        <Card className="flex-1 glass border-white/60 overflow-hidden relative flex flex-col items-center justify-center rounded-[3rem]">
          <div className="absolute top-10 left-10 flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-red-100 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live AI Session
             </div>
             <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Software Engineering • Round 1
             </div>
          </div>
          
          <div className="space-y-12 flex flex-col items-center">
            {/* AI Avatar / Waveform */}
            <div className="relative group">
              <div className={cn(
                "w-64 h-64 rounded-full bg-white flex items-center justify-center border-[12px] border-white shadow-2xl transition-all duration-700 relative z-10",
                status === "speaking" && "ring-[24px] ring-blue-100/50 scale-105",
                status === "listening" && "ring-[24px] ring-red-100/50 scale-105"
              )}>
                <AnimatePresence mode="wait">
                  {status === "speaking" ? (
                    <motion.div
                      key="speaking"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <Bot className="w-24 h-24 text-blue-600" />
                    </motion.div>
                  ) : status === "listening" ? (
                    <motion.div
                      key="listening"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <Activity className="w-24 h-24 text-red-500 animate-pulse" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                    >
                      <User className="w-24 h-24 text-slate-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Animated Rings for Speaking */}
              {status === "speaking" && (
                <>
                  <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-blue-400/5 animate-ping [animation-delay:0.5s]" />
                </>
              )}
            </div>
            
            <div className="text-center space-y-3">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight transition-all">
                 {status === "speaking" ? "AI Coach is posing a question..." : 
                  status === "listening" ? "Listening to your response..." : 
                  status === "processing" ? "Synthesizing your semantic score..." : "Ready to begin"}
               </h2>
               <div className="flex items-center justify-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-blue-500" />
                 <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Voice-Interactive Mode Active</p>
               </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-16 flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                size="lg" 
                variant={isRecording ? "destructive" : "premium"} 
                className={cn(
                  "h-24 w-24 rounded-[2rem] shadow-2xl transition-all border-none",
                  isRecording ? "bg-red-500 shadow-red-500/30" : "bg-blue-600 shadow-blue-500/30"
                )}
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic2 className="w-8 h-8" />}
              </Button>
            </motion.div>
            
            {!isRecording && status === "idle" && (
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                Click microphone to speak
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Transcript Sidebar */}
      <aside className="w-[500px] glass-dark flex flex-col shadow-3xl relative">
        <div className="p-10 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-outfit font-black text-xl text-white tracking-tight">Active Analysis</h3>
          </div>
          <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10">
            <Info className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
          <AnimatePresence initial={false}>
            {transcript.map((m) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, x: m.type === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex flex-col gap-3 max-w-[90%]",
                  m.type === "user" ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className="flex items-center gap-2 px-1">
                  {m.type === "ai" && <Sparkles className="w-3 h-3 text-blue-400" />}
                  <span className={cn(
                    "text-[10px] uppercase font-black tracking-widest",
                    m.type === "ai" ? "text-blue-400" : "text-slate-400"
                  )}>
                    {m.type === "ai" ? "AI COACH" : "CANDIDATE"}
                  </span>
                </div>
                <div className={cn(
                  "p-6 rounded-2xl text-sm leading-relaxed font-medium shadow-xl",
                  m.type === "ai" 
                    ? "bg-slate-800 text-slate-200 rounded-tl-none border border-white/5" 
                    : "bg-blue-600 text-white rounded-tr-none shadow-blue-500/10"
                )}>
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={transcriptEndRef} />
        </div>

        {/* Real-time Insights Card */}
        <div className="p-10 border-t border-white/10">
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardContent className="p-6 space-y-5">
               <div className="flex justify-between items-center text-xs font-black text-blue-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>Real-time Insight Score</span>
                  </div>
                  <span className="text-xl">8.2<span className="text-[10px] text-white/30 ml-1">/ 10</span></span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "82%" }}
                   className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                 />
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                 <p className="text-[10px] text-slate-400 leading-relaxed font-semibold uppercase tracking-wider mb-2">
                   Live Critique
                 </p>
                 <p className="text-sm text-slate-300 leading-relaxed font-medium">
                   Current answer shows <span className="text-blue-400">excellent technical clarity</span>. 
                   Try to elaborate more on the "Action" part of your next STAR response.
                 </p>
               </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
