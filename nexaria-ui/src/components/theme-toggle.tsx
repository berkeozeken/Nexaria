"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="h-8 w-8"
      aria-label="Toggle theme"
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
}
