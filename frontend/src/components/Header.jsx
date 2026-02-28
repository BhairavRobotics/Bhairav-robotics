import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Palette } from "lucide-react";
import logo from "../assets/header/brlogo.png";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Careers", href: "#careers" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const themes = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "sunset", label: "Sunset" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedThemeIndex = themes.findIndex((theme) => theme.value === savedTheme);
    const initialThemeIndex = savedThemeIndex >= 0 ? savedThemeIndex : 0;

    setThemeIndex(initialThemeIndex);
    document.documentElement.setAttribute("data-theme", themes[initialThemeIndex].value);
  }, []);

  const cycleTheme = () => {
    const nextIndex = (themeIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex].value;

    setThemeIndex(nextIndex);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center">
            <div className="h-30 w-40 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Bhairav Robotics logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-heading font-medium text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={cycleTheme}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-xs font-heading font-semibold uppercase tracking-wider text-secondary-foreground transition-colors hover:bg-muted"
              aria-label={`Switch theme. Current theme is ${themes[themeIndex].label}`}
            >
              <Palette size={16} />
              <span>{themes[themeIndex].label}</span>
            </button>

            <button
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
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading font-medium text-base tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors py-2"
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
