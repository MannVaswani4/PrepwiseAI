"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FileText, Rocket, ChevronRight, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewInterview() {
  const [role, setRole] = useState("Software Engineer");
  const [resume, setResume] = useState(null);
  const router = useRouter();

  const handleStart = (e) => {
    e.preventDefault();
    router.push("/interview/session-123");
  };

  return (
    <div className="container mx-auto px-4 py-24 flex justify-center">
      <Card className="w-full max-w-2xl shadow-xl border-slate-200">
        <CardHeader className="space-y-2 text-center pb-8 border-b">
          <CardTitle className="text-3xl font-bold tracking-tight">Interview Setup</CardTitle>
          <CardDescription className="text-lg text-slate-500">
            Configure your session and let the AI coach guide you
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 space-y-8">
          <form onSubmit={handleStart} className="space-y-8">
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" /> Target Role
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {["Software Engineer", "AI Engineer", "Product Manager", "Data Scientist"].map((r) => (
                  <div
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group",
                      role === r 
                        ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    <span className={cn(
                      "font-medium",
                      role === r ? "text-blue-700" : "text-slate-600 group-hover:text-slate-900"
                    )}>
                      {r}
                    </span>
                    {role === r && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Experience Context (Optional)
              </Label>
              <div className="relative h-40 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/20 transition-all group flex flex-col items-center justify-center cursor-pointer">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                  onChange={(e) => setResume(e.target.files[0])} 
                />
                <div className="text-center space-y-2 pointer-events-none">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-slate-700">
                      {resume ? resume.name : "Click to upload your resume"}
                    </p>
                    <p className="text-xs text-slate-500">PDF, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                * Our AI analyzes your experience to generate highly personalized follow-up questions.
              </p>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg shadow-blue-600/20">
              Launch Interview Environment <Rocket className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t bg-slate-50/50 py-4 italic text-xs text-slate-400">
          Tip: Ensure your microphone is active for the best experience.
        </CardFooter>
      </Card>
    </div>
  );
}
