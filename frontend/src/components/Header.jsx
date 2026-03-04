import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import logo from "../assets/header/brlogo.png";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "About Us", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const themes = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "sunset", label: "Sunset" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeThemeIndex = useMemo(
    () => themes.findIndex((item) => item.value === theme),
    [theme],
  );

  const currentTheme = themes[activeThemeIndex >= 0 ? activeThemeIndex : 0];

  const cycleTheme = () => {
    const nextIndex = (activeThemeIndex >= 0 ? activeThemeIndex : 0) + 1;
    setTheme(themes[nextIndex % themes.length].value);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 lg:h-22">
          <a href="#" className="flex items-center">
            <div className="h-30 w-40 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Bhairav Robotics logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-heading font-semibold text-[15px] tracking-[0.12em] uppercase text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={cycleTheme}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-xs font-heading font-semibold uppercase tracking-wider text-secondary-foreground transition-colors hover:bg-muted"
              aria-label={`Switch theme. Current theme is ${currentTheme.label}`}
              title={`Theme: ${currentTheme.label}`}
            >
              <Palette size={16} />
              <span>{currentTheme.label}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-foreground p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading font-semibold text-base tracking-[0.12em] uppercase text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-primary px-5 py-2.5 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-primary-foreground text-center mt-2"
              >
                Get in Touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;