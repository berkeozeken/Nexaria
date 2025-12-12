"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration mismatch'i engellemek için:
  // Theme netleşene kadar hiç icon basmıyoruz.
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Toggle theme" />
    );
  }

  const isLight = resolvedTheme === "light";

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9"
      aria-label="Toggle theme"
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
}
