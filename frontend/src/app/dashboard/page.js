"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, Star, ChevronRight, LayoutDashboard, TrendingUp, Award, Clock, AlertCircle, Loader2, Inbox } from "lucide-react";
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

/* Skeleton placeholder for stat cards */
function StatCardSkeleton() {
  return (
    <Card className="border-none shadow-sm bg-white/60 animate-pulse">
      <CardHeader className="pb-1 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="w-9 h-9 bg-slate-200 rounded-lg" />
          <div className="w-16 h-3 bg-slate-200 rounded" />
        </div>
        <div className="w-24 h-3 bg-slate-200 rounded" />
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="w-14 h-8 bg-slate-200 rounded" />
      </CardContent>
    </Card>
  );
}

/* Skeleton placeholder for session rows */
function SessionSkeleton() {
  return (
    <Card className="border-none shadow-sm bg-white/60 animate-pulse overflow-hidden">
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-slate-200 rounded-xl shrink-0" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-slate-200 rounded" />
            <div className="w-20 h-3 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-12 h-6 bg-slate-200 rounded" />
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </Card>
  );
}

/* Empty state for no sessions */
function EmptyState() {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
        <Inbox className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-700">No sessions yet</h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto">
          Start your first AI interview simulation to see your performance data here.
        </p>
      </div>
      <a href="/interview/new">
        <Button variant="premium" className="h-10 px-6 rounded-xl text-sm mt-2">
          <Plus className="mr-1.5 w-4 h-4" /> Start First Session
        </Button>
      </a>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetch with fallback
    const loadData = async () => {
      try {
        // Try fetching from API
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        const res = await fetch("http://localhost:5001/dashboard/stats", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("API unavailable");
        const data = await res.json();
        setStats(data);
      } catch {
        // Fallback to mock data
        setStats(MOCK_STATS);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const safeStats = stats || MOCK_STATS;
  const sessions = safeStats.recentSessions || [];
  const totalSessions = safeStats.totalSessions || 0;
  const avgScore = safeStats.avgScore || 0;
  const completedSessions = safeStats.completedSessions || 0;
  const successRate = totalSessions > 0 ? ((completedSessions / totalSessions) * 100).toFixed(0) : 0;

  return (
    <div className="min-h-screen pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 max-w-6xl">
        {/* Dashboard Header */}
        <motion.header 
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 glass p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-white/60 shadow-blue-500/5"
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-0.5">
              <LayoutDashboard className="w-3 h-3" /> 
              <span>Command Center</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Welcome back, <span className="text-gradient">Professional.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium italic hidden sm:block">&quot;The best way to predict the future is to create it.&quot;</p>
          </div>
          <a href="/interview/new" className="w-full sm:w-auto">
            <Button size="lg" variant="premium" className="h-11 sm:h-12 px-5 sm:px-6 rounded-xl shadow-xl shadow-blue-600/10 group text-xs sm:text-sm w-full sm:w-auto">
              <Plus className="mr-1.5 w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" /> 
              New Simulation
            </Button>
          </a>
        </motion.header>

        {/* Quick Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
          >
            <motion.div variants={item}>
              <Card className="border-none shadow-sm bg-white/60 hover:bg-white transition-colors duration-500">
                <CardHeader className="pb-1 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">+2 this week</span>
                  </div>
                  <CardTitle className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Sessions</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalSessions}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-none shadow-lg shadow-blue-500/5 bg-white/80 glow-border">
                <CardHeader className="pb-1 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Top 5%</span>
                  </div>
                  <CardTitle className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average Quality</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-3">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">{avgScore} <span className="text-sm text-slate-300">/ 10</span></div>
                  <Progress value={avgScore * 10} className="h-1.5 bg-blue-50" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-none shadow-sm bg-white/60">
                <CardHeader className="pb-1 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mastery</span>
                  </div>
                  <CardTitle className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="text-2xl sm:text-3xl font-black text-green-600">{successRate}%</div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase mt-2 tracking-widest">Consistent Performance</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Recent Activity List */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Session History</h2>
            <Button variant="ghost" className="font-bold text-blue-600 hover:bg-blue-50 text-xs sm:text-sm">View All</Button>
          </div>
          
          {loading ? (
            <div className="grid gap-4">
              <SessionSkeleton />
              <SessionSkeleton />
              <SessionSkeleton />
            </div>
          ) : sessions.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4"
            >
              {sessions.map((session) => (
                <motion.div key={session.id} variants={item}>
                  <Card className="border-none shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all group overflow-hidden bg-white/70 backdrop-blur-sm border-white/40">
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-4 sm:gap-5">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-500 shadow-sm shrink-0">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-slate-900">{session.role || "Untitled Session"}</h3>
                            <span className="px-1.5 py-0.5 bg-slate-100 text-[8px] font-black uppercase tracking-wider text-slate-500 rounded-full">
                              {session.status || "Pending"}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
                            {session.date 
                              ? new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : "Date not available"
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
                        <div className="text-right space-y-0.5">
                          <div className="flex items-center gap-1.5 text-blue-600 font-black text-xl sm:text-2xl">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                            {session.score ?? "N/A"}
                          </div>
                          <p className="text-[8px] sm:text-[9px] uppercase font-black text-slate-400 tracking-widest">Score</p>
                        </div>
                        <a href={`/interview/${session.id}`}>
                          <Button variant="outline" className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-2 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 p-0 flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Button>
                        </a>
                      </div>
                    </div>
                    {/* Progress accent */}
                    <div className="h-0.5 w-full bg-slate-50">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(session.score || 0) * 10}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
