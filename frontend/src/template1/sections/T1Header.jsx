import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/header/brlogo.png";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-xl"
          : "bg-background/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-b border-border/20 lg:border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="logo-glow-wrapper relative flex items-center justify-center">
              <img
                src={logo}
                alt="Bhairav Robotics logo"
                className="h-10 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105 sm:h-11 lg:h-12"
              />
            </div>
            <div className="mx-1 hidden h-8 border-l border-border/40 sm:block" />
            <h1 className="hidden font-heading text-xl font-bold uppercase tracking-tight text-foreground/90 sm:block lg:text-2xl xl:text-3xl">
              Born for the <span className="text-primary">battlefield</span>
            </h1>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-heading text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isCurrentPath(link.href) ? "text-primary" : "text-foreground/75 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="rounded-sm bg-primary px-6 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-glow transition-all hover:bg-primary/90 active:scale-95"
            >
              Get in Touch
            </Link>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground/80 transition-colors hover:text-primary lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-6 px-8 py-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-2xl font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-6 rounded-sm bg-primary px-8 py-4 text-center font-heading text-base font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-glow"
              >
                Get in Touch
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
