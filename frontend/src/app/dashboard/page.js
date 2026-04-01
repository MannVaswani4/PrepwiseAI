"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, Star, ChevronRight, LayoutDashboard, TrendingUp, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_STATS = {
  totalSessions: 12,
  avgScore: 7.4,
  completedSessions: 10,
  recentSessions: [
    { id: "1", role: "Software Engineer", date: "2024-03-31", score: 8.5, status: "Excellent" },
    { id: "2", role: "AI Engineer", date: "2024-03-29", score: 6.8, status: "Improving" },
    { id: "3", role: "Product Manager", date: "2024-03-25", score: 7.2, status: "Good" },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const [stats] = useState(MOCK_STATS);

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-6 py-12 space-y-12 max-w-7xl">
        {/* Dashboard Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass p-10 rounded-[2.5rem] border-white/60 shadow-blue-500/5"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-1">
              <LayoutDashboard className="w-4 h-4" /> 
              <span>Candidate Command Center</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Welcome back, <span className="text-gradient">Professional.</span></h1>
            <p className="text-lg text-slate-500 font-medium italic">"The best way to predict the future is to create it."</p>
          </div>
          <a href="/interview/new">
            <Button size="lg" variant="premium" className="h-16 px-10 rounded-2xl shadow-2xl shadow-blue-600/20 group">
              <Plus className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> 
              Begin New Simulation
            </Button>
          </a>
        </motion.header>

        {/* Quick Stats Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-white/60 hover:bg-white transition-colors duration-500">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-blue-600 transition-all">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">+2 this week</span>
                </div>
                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black text-slate-900">{stats.totalSessions}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-xl shadow-blue-500/5 bg-white/80">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Top 5% Rank</span>
                </div>
                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Average Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-5xl font-black text-blue-600">{stats.avgScore} <span className="text-xl text-slate-300">/ 10</span></div>
                <Progress value={stats.avgScore * 10} className="h-2.5 bg-blue-50" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-sm bg-white/60">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mastery Level</span>
                </div>
                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black text-green-600">
                  {((stats.completedSessions / stats.totalSessions) * 100).toFixed(0)}%
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase mt-4 tracking-widest">Consistent Performance</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Activity List */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Technical Mastery Log</h2>
            <Button variant="ghost" className="font-bold text-blue-600 hover:bg-blue-50">View Analytics Pipeline</Button>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6"
          >
            {stats.recentSessions.map((session) => (
              <motion.div key={session.id} variants={item}>
                <Card className="border-none shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group overflow-hidden bg-white/70 backdrop-blur-sm border-white/40">
                  <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                        <Calendar className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-slate-900">{session.role}</h3>
                          <span className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-full">
                            {session.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">Session recorded on {new Date(session.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-12">
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2 text-blue-600 font-black text-3xl">
                          <Star className="w-6 h-6 fill-current" />
                          {session.score}
                        </div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Semantic Accuracy</p>
                      </div>
                      <a href={`/interview/${session.id}`}>
                        <Button variant="outline" className="h-14 w-14 rounded-2xl border-2 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300">
                          <ChevronRight className="w-6 h-6" />
                        </Button>
                      </a>
                    </div>
                  </div>
                  {/* Decorative Progress Line at bottom */}
                  <div className="h-1 w-full bg-slate-50">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${session.score * 10}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
