"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { User, Mail, Lock, ChevronRight, Sparkles, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. The email may already be in use.");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "Adaptive AI that matches your skill level",
    "Real-time feedback on every answer",
    "Detailed analytics after each session",
  ];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-40 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-white/60 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-3 p-8 pb-5 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 mx-auto">
              <Sparkles className="w-3 h-3" /> Join the Elite
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-slate-900">Create Account</CardTitle>
            <CardDescription className="text-sm text-slate-500 font-medium leading-relaxed">
              Start your journey toward landing your dream offer with adaptive AI coaching.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-6">
            {/* Benefits */}
            <div className="mb-5 space-y-1.5">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10 h-11 bg-white/60 border-slate-200 focus:border-blue-500 rounded-xl text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 h-11 bg-white/60 border-slate-200 focus:border-blue-500 rounded-xl text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password (min. 6 chars)"
                    className="pl-10 h-11 bg-white/60 border-slate-200 focus:border-blue-500 rounded-xl text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Begin Your Journey <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </CardContent>

          <CardFooter className="px-8 pb-8 pt-0">
            <div className="w-full text-center p-4 bg-slate-50/80 rounded-xl border border-dashed border-slate-200">
              <p className="text-sm font-medium text-slate-500">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:text-blue-700 font-bold">
                  Sign In
                </a>
              </p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
