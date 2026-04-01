import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Mic2, BookOpen, ChevronRight } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "PrepWise AI | Master Your Interviews",
  description: "AI-powered interview preparation ecosystem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-slate-50 text-slate-900 mesh-gradient">
        <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl">
          <div className="container flex h-20 items-center justify-between mx-auto px-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-xl shadow-blue-500/20">
                P
              </div>
              <span className="text-2xl font-outfit font-bold tracking-tight">
                PrepWise<span className="text-blue-600">AI</span>
              </span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold">
              <a href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all hover:translate-y-[-1px]">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </a>
              <a href="/interview/new" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all hover:translate-y-[-1px]">
                <Mic2 className="w-4 h-4" /> Start Mock
              </a>
              <a href="/resources" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all hover:translate-y-[-1px]">
                <BookOpen className="w-4 h-4" /> Prep Hub
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <a href="/login">
                <Button variant="ghost" className="font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50">
                  Log In
                </Button>
              </a>
              <a href="/register">
                <Button className="font-bold rounded-full px-8 h-12 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 group">
                  Get Started <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </header>
        <main className="min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </body>
    </html>
  );
}
