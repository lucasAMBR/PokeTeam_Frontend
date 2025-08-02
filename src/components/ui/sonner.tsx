"use client"

import { useTheme } from "@/context/theme-context"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={{
        "--normal-bg": theme === "dark" ? "#18181b" : "#ebebebff",
        "--normal-text": theme === "dark" ? "#e7e7e7ff" : "#242424ff",     // text-zinc-100
        "--normal-border": theme === "dark" ? "#18181b" : "#ebebebff",   // border-zinc-700

        "--success-bg": "#166534",      // bg-green-800

        "--error-bg": "#7f1d1d",        // bg-red-900

        "--info-bg": "#1e40af",         // bg-blue-900
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
