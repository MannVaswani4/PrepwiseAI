"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic2, Brain, BarChart3, ChevronRight, Play, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 -z-10 mesh-gradient opacity-60" />
        
        <div className="container px-6 mx-auto relative z-10 text-center">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 max-w-5xl mx-auto"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4" /> 
              <span>AI-Powered Interview Coach v2.0 is live</span>
            </motion.div>

            <motion.h1 variants={item} className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[0.95]">
              Master the art of the <br />
              <span className="text-gradient">Interview.</span>
            </motion.h1>

            <motion.p variants={item} className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
              Simulate high-pressure interviews with our adaptive AI. Get real-time physiological feedback, semantic analysis, and qualitative coaching.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/register">
                <Button size="lg" variant="premium" className="px-12 h-16 rounded-2xl text-lg group">
                  Elevate Your Career <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button variant="outline" size="lg" className="px-12 h-16 rounded-2xl text-lg border-2">
                Watch Demo <Play className="ml-2 w-5 h-5 fill-current" />
              </Button>
            </motion.div>

            {/* Visual Asset Container */}
            <motion.div 
              variants={item}
              className="pt-24 relative max-w-6xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass rounded-[2rem] p-4 overflow-hidden border-white/40">
                  <img 
                    src="/hero-ai.png" 
                    alt="AI Interview Coach Interface"
                    className="rounded-2xl shadow-inner w-full object-cover animate-float"
                  />
                  
                  {/* Floating Micro-Cards */}
                  <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-10 glass p-5 rounded-2xl hidden md:block max-w-[200px] text-left border-white/60"
                  >
                    <div className="flex items-center gap-2 mb-2 text-green-600 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" /> Real-time Quality
                    </div>
                    <p className="text-xl font-black text-slate-900">92%</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Semantic Accuracy Score</p>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 left-10 glass p-5 rounded-2xl hidden md:block max-w-[200px] text-left border-white/60"
                  >
                    <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" /> Adaptive Mode
                    </div>
                    <p className="text-sm font-bold text-slate-800">Scaling difficulty to Senior Architect level.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="py-24 bg-white">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Users", val: "250k+" },
              { label: "Interviews Conducted", val: "1.2M" },
              { label: "Average Score Lift", val: "+42%" },
              { label: "Placement Rate", val: "89%" },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <p className="text-4xl font-black text-slate-900">{stat.val}</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-50/50">
        <div className="container px-6 mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
              The <span className="text-gradient">Next Generation</span> of Prep.
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              We've combined behavioral science with cutting-edge LLMs to create an experience that feels indistinguishable from a real FAANG interview.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="hover:border-blue-200 group">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Brain className="w-8 h-8 font-bold" />
                </div>
                <CardTitle className="text-2xl">Adaptive Intelligence</CardTitle>
                <CardDescription className="text-base pt-2">
                  Our system monitors your linguistic patterns and adjusts technical difficulty in real-time. Never have a boring or impossible mock session again.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:border-indigo-200 group">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl">Hyper-Detailed Analytics</CardTitle>
                <CardDescription className="text-base pt-2">
                  Get a comprehensive breakdown of your STAR method structure, technical terminology usage, and tonal confidence per answer.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:border-blue-200 group border-blue-100 shadow-blue-500/5">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Mic2 className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl">Real-time STT engine</CardTitle>
                <CardDescription className="text-base pt-2">
                  Powered by Whisper-1 for ultra-low latency transcription. See your feedback the moment you finish speaking, not minutes later.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 mb-20">
        <div className="container px-6 mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 px-6 py-24 text-center shadow-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Ready to secure your <br/><span className="text-blue-400">dream offer?</span></h2>
              <p className="text-slate-400 text-xl font-medium">Join 250,000+ candidates who have leveled up their interview game.</p>
              <div className="pt-4">
                <a href="/register">
                  <Button size="lg" variant="premium" className="h-16 px-16 rounded-2xl font-bold text-lg">
                    Build Your Profile
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t bg-white">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20">
                P
              </div>
              <span className="text-xl font-outfit font-bold tracking-tight text-slate-900">
                PrepWise<span className="text-blue-600">AI</span>
              </span>
            </div>
            <p className="text-slate-500 font-medium">© 2026 PrepWise AI. Built for the future of career coaching.</p>
            <div className="flex gap-8 text-sm font-bold text-slate-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
