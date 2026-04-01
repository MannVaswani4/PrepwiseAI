"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FileText, Rocket, ChevronRight, Briefcase, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function NewInterview() {
  const [role, setRole] = useState("Software Engineer");
  const [resume, setResume] = useState(null);
  const router = useRouter();

  const handleStart = (e) => {
    e.preventDefault();
    router.push("/interview/session-123");
  };

  const roles = ["Software Engineer", "AI Engineer", "Product Manager", "Data Scientist"];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-14 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <Card className="shadow-lg border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1.5 text-center pb-5 sm:pb-6 border-b p-5 sm:p-7">
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">Interview Setup</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Configure your session and let the AI coach guide you
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 sm:p-7 space-y-5 sm:space-y-6">
            <form onSubmit={handleStart} className="space-y-5 sm:space-y-6">
              <div className="space-y-2.5">
                <Label className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Target Role
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {roles.map((r) => (
                    <div
                      key={r}
                      onClick={() => setRole(r)}
                      className={cn(
                        "p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group",
                        role === r 
                          ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                          : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        role === r ? "text-blue-700" : "text-slate-600 group-hover:text-slate-900"
                      )}>
                        {r}
                      </span>
                      {role === r && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" /> Resume (Optional)
                </Label>
                <div className="relative h-28 sm:h-32 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/20 transition-all group flex flex-col items-center justify-center cursor-pointer">
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    onChange={(e) => setResume(e.target.files?.[0] || null)} 
                  />
                  <div className="text-center space-y-1.5 pointer-events-none">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {resume ? resume.name : "Click to upload resume"}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500">PDF, DOCX up to 10MB</p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 italic">
                  * Our AI analyzes your experience to generate highly personalized follow-up questions.
                </p>
              </div>

              <Button type="submit" className="w-full h-11 sm:h-12 text-sm font-bold shadow-lg shadow-blue-600/20 rounded-xl">
                Launch Interview <Rocket className="ml-1.5 w-4 h-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t bg-slate-50/50 py-3 italic text-[10px] sm:text-xs text-slate-400 px-5">
            Tip: Ensure your microphone is active for the best experience.
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
