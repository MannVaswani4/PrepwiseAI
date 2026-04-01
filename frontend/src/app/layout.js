"use client";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { LayoutDashboard, Mic2, BookOpen, ChevronRight, Menu, X } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <title>PrepWise AI | Master Your Interviews</title>
        <meta name="description" content="AI-powered interview preparation ecosystem" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-inter antialiased bg-slate-50 text-slate-900 mesh-gradient">
        <NavBar />
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </body>
    </html>
  );
}

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            P
          </div>
          <span className="text-lg font-outfit font-bold tracking-tight">
            PrepWise<span className="text-blue-600">AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <a href="/dashboard" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors">
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </a>
          <a href="/interview/new" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors">
            <Mic2 className="w-3.5 h-3.5" /> Start Mock
          </a>
          <a href="/resources" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors">
            <BookOpen className="w-3.5 h-3.5" /> Prep Hub
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-3 py-1.5">
            Log In
          </a>
          <a href="/register" className="inline-flex items-center gap-1 text-sm font-bold bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95">
            Get Started <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur-xl px-4 py-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 text-sm font-semibold transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </a>
          <a href="/interview/new" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 text-sm font-semibold transition-colors">
            <Mic2 className="w-4 h-4" /> Start Mock
          </a>
          <a href="/resources" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 text-sm font-semibold transition-colors">
            <BookOpen className="w-4 h-4" /> Prep Hub
          </a>
          <div className="pt-2 border-t flex flex-col gap-2">
            <a href="/login" className="px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors text-center">
              Log In
            </a>
            <a href="/register" className="flex items-center justify-center gap-1 text-sm font-bold bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors">
              Get Started <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
