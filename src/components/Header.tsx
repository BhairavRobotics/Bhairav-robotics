import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
{ label: "Home", href: "#" },
{ label: "Products", href: "#products" },
{ label: "Technology", href: "#technology" },
{ label: "About Us", href: "#about" },
{ label: "Contact", href: "#contact" }];


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-sm flex items-center justify-center">
              <span className="font-heading font-bold text-lg text-primary-foreground">BR</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-lg tracking-wide text-foreground">
                BHAIRAV ROBOTICS
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground -mt-1">
                Pvt Ltd
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
            <a
              key={link.label}
              href={link.href}
              className="font-heading font-medium text-sm tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-200">

                {link.label}
              </a>
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            





          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu">

            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-background border-b border-border overflow-hidden">

            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) =>
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-heading font-medium text-base tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors py-2">

                  {link.label}
                </a>
            )}
              <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-primary px-5 py-2.5 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-primary-foreground text-center mt-2">

                Get in Touch
              </a>
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

};

export default Header;