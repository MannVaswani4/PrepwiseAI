"use client";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30",
        destructive: "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600",
        outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 hover:border-slate-300",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-blue-50 hover:text-blue-600",
        link: "text-blue-600 underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-xl px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props} />
    </motion.div>
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
