
import * as React from "react";

type Theme = "dark" | "light" | "system";

function useTheme() {
  const [theme, setTheme] = React.useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      
      // If no stored preference, check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    
    // Default to light theme
    return "light";
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    root.classList.remove("light", "dark");
    
    // Add current theme class
    root.classList.add(theme);
    
    // Store the theme preference
    localStorage.setItem("theme", theme);

    // Force mermaid diagrams to update when theme changes
    const event = new Event('theme-change');
    document.dispatchEvent(event);
  }, [theme]);

  return { theme, setTheme };
}

export { useTheme };
