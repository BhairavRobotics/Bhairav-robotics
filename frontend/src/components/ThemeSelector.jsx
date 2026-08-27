import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// THEME VISIBILITY SWITCH
// Set SHOW_THEME_SELECTOR to true to show the floating theme
// selector button again (bottom-right corner of every page).
// While false, DEFAULT_THEME is applied to the whole site and
// any previously saved visitor preference is ignored.
// ─────────────────────────────────────────────────────────────
const SHOW_THEME_SELECTOR = false;

// Site-wide theme used while the selector is hidden,
// and the fallback when a visitor has no saved preference.
const DEFAULT_THEME = "light";

export const themes = [
  {
    id: "dark",
    name: "Current Dark",
    description: "Original dark stealth theme with amber accents",
    bgClass: "bg-[#0e1217]",
    cardClass: "bg-[#181d24]",
    accentClass: "bg-[#f97316]",
    textClass: "text-[#edf2f7]",
    type: "dark"
  },
  {
    id: "light",
    name: "Light",
    description: "Crisp white background with high-contrast slate typography",
    bgClass: "bg-[#f8fafc]",
    cardClass: "bg-[#ffffff]",
    accentClass: "bg-[#ea580c]",
    textClass: "text-[#0f172a]",
    type: "light"
  },
  {
    id: "modern-light",
    name: "Modern Light",
    description: "Clean aerospace titanium base with tech cyan accents",
    bgClass: "bg-[#edf1f7]",
    cardClass: "bg-[#ffffff]",
    accentClass: "bg-[#0284c7]",
    textClass: "text-[#111827]",
    type: "light"
  },
  {
    id: "dark-pro",
    name: "Dark Professional",
    description: "Balanced charcoal dark with superior legibility & high contrast",
    bgClass: "bg-[#1d222a]",
    cardClass: "bg-[#262c37]",
    accentClass: "bg-[#ff8000]",
    textClass: "text-[#f1f5f9]",
    type: "dark"
  }
];

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (!SHOW_THEME_SELECTOR) return DEFAULT_THEME;
    return localStorage.getItem("br_theme") || DEFAULT_THEME;
  });
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("br_theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
  };

  const activeThemeObj = themes.find((t) => t.id === currentTheme) || themes[0];

  // Hidden mode: still apply the theme above, but render no UI.
  if (!SHOW_THEME_SELECTOR) return null;

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 z-40 font-heading sm:bottom-6 sm:right-6">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="touch-target flex max-w-[calc(100vw-2rem)] items-center gap-2.5 rounded-full border border-border/80 bg-card/95 px-3 py-2.5 text-foreground shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-primary/60 sm:px-4 group"
        aria-label="Toggle theme selector"
      >
        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-primary/15 text-primary group-hover:rotate-45 transition-transform duration-300">
          <Palette size={14} />
        </div>
        <span className="max-w-[9rem] truncate text-xs font-semibold uppercase tracking-wider pr-1 sm:max-w-none">
          {activeThemeObj.name}
        </span>
        <div className="flex items-center gap-1 border-l border-border/60 pl-2">
          <span className="w-2.5 h-2.5 rounded-full border border-border" style={{ backgroundColor: activeThemeObj.type === "dark" ? "#1e293b" : "#f8fafc" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeThemeObj.id === "modern-light" ? "#0284c7" : "#ea580c" }} />
        </div>
      </motion.button>

      {/* Theme Selection Modal / Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute bottom-14 right-0 w-[calc(100vw-2rem)] max-w-[350px] overflow-hidden rounded-xl border border-border bg-card/98 p-4 text-foreground shadow-2xl backdrop-blur-xl sm:p-5"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
              <div>
                <h4 className="font-bold text-sm tracking-wider uppercase text-foreground flex items-center gap-2">
                  <Palette size={16} className="text-primary" />
                  Website Color Theme
                </h4>
                <p className="text-[11px] text-muted-foreground font-body">
                  Select a theme to preview the look & feel
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/40 transition-colors"
                aria-label="Close theme selector"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid gap-2.5">
              {themes.map((theme) => {
                const isSelected = theme.id === currentTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-primary/10 border-primary shadow-sm"
                        : "bg-muted/30 border-border/40 hover:bg-muted/60 hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Theme Color Preview Swatch */}
                      <div className="w-9 h-9 rounded-md border border-border/80 p-1 flex flex-col justify-between shrink-0 shadow-inner" style={{
                        backgroundColor: theme.id === "dark" ? "#0e1217" : theme.id === "light" ? "#f8fafc" : theme.id === "modern-light" ? "#edf1f7" : "#1d222a"
                      }}>
                        <div className="flex justify-between items-center">
                          <span className="w-2 h-2 rounded-full" style={{
                            backgroundColor: theme.id === "modern-light" ? "#0284c7" : "#ea580c"
                          }} />
                          <span className="w-3 h-1 rounded" style={{
                            backgroundColor: theme.type === "dark" ? "#4a5568" : "#cbd5e1"
                          }} />
                        </div>
                        <div className="h-2 rounded" style={{
                          backgroundColor: theme.id === "dark" ? "#181d24" : theme.id === "light" ? "#ffffff" : theme.id === "modern-light" ? "#ffffff" : "#262c37"
                        }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs tracking-wider uppercase text-foreground truncate">
                            {theme.name}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] bg-primary text-primary-foreground font-semibold px-1.5 py-0.2 rounded uppercase">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground font-body leading-tight mt-0.5 line-clamp-2">
                          {theme.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-0.5 shrink-0">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-border" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 text-center">
              <p className="text-[10px] text-muted-foreground font-body">
                Theme is remembered across pages and reloads.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
