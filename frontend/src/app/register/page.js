"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { User, Mail, Lock, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-40 -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl"
      >
        <Card className="glass border-white/60 shadow-3xl rounded-[3rem] overflow-hidden">
          <CardHeader className="space-y-4 p-12 pb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-2">
              <Sparkles className="w-3 h-3" /> Join the Elite
            </div>
            <CardTitle className="text-4xl font-black tracking-tight text-slate-900">Create Account.</CardTitle>
            <CardDescription className="text-lg text-slate-500 font-medium leading-relaxed">
              Start your journey toward landing your dream offer with adaptive AI coaching.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-12 pb-8">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Professional Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="pl-12 h-14 bg-white/50 border-slate-200 focus:border-blue-600 focus:bg-white transition-all rounded-xl font-medium"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-12 h-14 bg-white/50 border-slate-200 focus:border-blue-600 focus:bg-white transition-all rounded-xl font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Security Key</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Create a strong password"
                    className="pl-12 h-14 bg-white/50 border-slate-200 focus:border-blue-600 focus:bg-white transition-all rounded-xl font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <Button type="submit" variant="premium" className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/20 group">
                Begin Your Journey <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="px-12 pb-12">
            <div className="w-full text-center p-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-sm font-medium text-slate-500">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:text-blue-700 font-black">
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
