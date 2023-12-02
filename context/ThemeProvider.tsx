"use client";

import React, { useState, createContext, useEffect, useContext } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ThemeProvider = createContext<ThemeContextType | undefined>(undefined);
  const [mode, setMode] = useState("");
  useEffect(() => {
    handleThemeChange();
  }, [mode]);
  function handleThemeChange() {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.add("light");
    } else if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  }
  return (
    <div>
      <ThemeProvider.Provider value={{ mode, setMode }}>
        {children}
      </ThemeProvider.Provider>
    </div>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeProvider);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
}
