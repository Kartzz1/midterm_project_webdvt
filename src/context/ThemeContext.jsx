import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(undefined);
const STORAGE_KEY = "budget-tracker-theme";

/**
 * Provides `theme` ("light" | "dark") and `toggleTheme` to the whole
 * application via Context, so no component needs theme passed down
 * as a prop. Persists the choice to localStorage and applies it as a
 * `data-theme` attribute on <html> so plain CSS can react to it too.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
      // Respect system preference on first visit
      if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch {
      // localStorage might be unavailable (private mode, etc.) — fall back
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore write failures, theme still works for this session
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Memoized so components consuming only `toggleTheme` (via context)
  // don't get a brand-new function/object identity on every render
  // of ThemeProvider unless theme actually changed.
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
