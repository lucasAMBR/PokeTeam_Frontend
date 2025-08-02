"use client";

import { useTheme } from "@/context/theme-context";
import { Moon, Sun } from "lucide-react";

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div 
    onClick={toggleTheme} 
    className={`fixed top-0 right-0 flex items-center p-4 m-4 rounded-md cursor-pointer transition-all duration-300 ${theme === "dark" ? "bg-white text-black hover:bg-gray-400" : "bg-black text-white hover:bg-gray-900"}`}
    >
        {theme === "dark" &&
            <Moon className="h-4 w-4" />
        }
        {theme === "light" &&
            <Sun className="h-4 w-4" />
        }
    </div>
  );
}