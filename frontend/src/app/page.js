"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 mesh-gradient opacity-60" />
        
        <div className="container px-4 sm:px-6 mx-auto relative z-10 text-center">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 sm:space-y-10 max-w-4xl mx-auto"
          >
            <motion.div variants={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> 
              <span>AI-Powered Interview Coach v2.0</span>
            </motion.div>

            <motion.h1 variants={item} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Master the art of the <br className="hidden sm:block" />
              <span className="text-gradient">Interview.</span>
            </motion.h1>

            <motion.p variants={item} className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium px-2">
              Simulate high-pressure interviews with our adaptive AI. Get real-time physiological feedback, semantic analysis, and qualitative coaching.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href="/register" className="w-full sm:w-auto">
                <Button size="lg" variant="premium" className="px-6 sm:px-8 h-12 rounded-xl text-sm group w-full sm:w-auto">
                  Elevate Your Career <ChevronRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button variant="outline" size="lg" className="px-6 sm:px-8 h-12 rounded-xl text-sm border-2 w-full sm:w-auto">
                Watch Demo <Play className="ml-1.5 w-4 h-4 fill-current" />
              </Button>
            </motion.div>

            {/* Visual Asset Container */}
            <motion.div 
              variants={item}
              className="pt-10 sm:pt-16 relative max-w-5xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl blur opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-200" />
                <div className="relative glass rounded-2xl sm:rounded-3xl p-3 sm:p-4 overflow-hidden border-white/40 glow-border">
                  <div className="scanline" />
                  {/* Fallback placeholder when hero-ai.png is missing */}
                  <div className="relative rounded-xl sm:rounded-2xl shadow-inner w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
                    <img 
                      src="/hero-ai.png" 
                      alt="AI Interview Coach Interface"
                      className="w-full h-full object-cover animate-float"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    {/* Fallback UI when image is missing */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider">AI Interview Coach Interface</p>
                    </div>
                  </div>
                  
                  {/* Floating Micro-Cards */}
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 sm:top-16 right-4 sm:right-8 glass p-3 sm:p-4 rounded-xl hidden md:block max-w-[180px] text-left border-white/60"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5 text-green-600 font-bold text-[10px] uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" /> Real-time Quality
                    </div>
                    <p className="text-lg font-black text-slate-900">92%</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Semantic Accuracy Score</p>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-12 sm:bottom-16 left-4 sm:left-8 glass p-3 sm:p-4 rounded-xl hidden md:block max-w-[180px] text-left border-white/60"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5 text-blue-600 font-bold text-[10px] uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" /> Adaptive Mode
                    </div>
                    <p className="text-xs font-bold text-slate-800">Scaling difficulty to Senior Architect level.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {[
              { label: "Active Users", val: "250k+" },
              { label: "Interviews Conducted", val: "1.2M" },
              { label: "Average Score Lift", val: "+42%" },
              { label: "Placement Rate", val: "89%" },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{stat.val}</p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-slate-50/50">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              The <span className="text-gradient">Next Generation</span> of Prep.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed px-2">
              We&apos;ve combined behavioral science with cutting-edge LLMs to create an experience indistinguishable from a real FAANG interview.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: Brain,
                title: "Adaptive Intelligence",
                desc: "Our system monitors your linguistic patterns and adjusts technical difficulty in real-time. Never have a boring or impossible mock session again.",
                color: "blue"
              },
              {
                icon: BarChart3,
                title: "Hyper-Detailed Analytics",
                desc: "Get a comprehensive breakdown of your STAR method structure, technical terminology usage, and tonal confidence per answer.",
                color: "indigo"
              },
              {
                icon: Mic2,
                title: "Real-time STT Engine",
                desc: "Powered by Whisper-1 for ultra-low latency transcription. See your feedback the moment you finish speaking, not minutes later.",
                color: "blue"
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className={`hover:border-${feature.color}-200 group glow-border cursor-default`}>
                  <CardHeader className="p-5 sm:p-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${feature.color}-50 rounded-xl flex items-center justify-center text-${feature.color}-600 mb-4 group-hover:bg-${feature.color}-600 group-hover:text-white transition-all duration-300 shadow-sm`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm pt-1.5 leading-relaxed">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 mb-10 sm:mb-16">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 px-5 sm:px-8 py-14 sm:py-20 text-center shadow-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-5 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Ready to secure your <br/><span className="text-blue-400">dream offer?</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-medium px-2">
                Join 250,000+ candidates who have leveled up their interview game.
              </p>
              <div className="pt-2">
                <a href="/register">
                  <Button size="lg" variant="premium" className="h-12 sm:h-14 px-8 sm:px-12 rounded-xl font-bold text-sm sm:text-base">
                    Build Your Profile
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 sm:py-16 border-t bg-white">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-600/20">
                P
              </div>
              <span className="text-base font-outfit font-bold tracking-tight text-slate-900">
                PrepWise<span className="text-blue-600">AI</span>
              </span>
            </div>
            <p className="text-slate-500 font-medium text-xs sm:text-sm text-center">© 2026 PrepWise AI. Built for the future of career coaching.</p>
            <div className="flex gap-6 text-xs font-bold text-slate-500">
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
