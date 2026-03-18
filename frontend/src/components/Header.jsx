import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/header/brlogo.png";
import { products, categories } from "@/data/products";

const navLinks = [
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductClick = (productId) => {
    setIsProductsOpen(false);
    setIsOpen(false);
    navigate(`/products?id=${productId}`);
  };

  const isCurrentPath = (path) => {
    if (path.startsWith("/#")) return location.pathname === "/" && location.hash === path.substring(1);
    return location.pathname === path;
  };

  const activeCategoryData = categories.find(c => c.id === activeCategory);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-xl"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <img
              src={logo}
              alt="Bhairav Robotics logo"
              className="h-10 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block border-l border-border/40 h-8 mx-2" />
            <h1 className="hidden sm:block font-heading font-bold text-lg lg:text-xl tracking-tight text-foreground/90 uppercase">
              Born for the <span className="text-primary">battlefield</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative h-full flex items-center"
                    ref={dropdownRef}
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1.5 font-heading font-semibold text-[13px] tracking-[0.15em] uppercase transition-colors duration-300 ${isProductsOpen || isCurrentPath(link.href) ? 'text-primary' : 'text-foreground/70 hover:text-primary'}`}
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[900px] bg-card/98 backdrop-blur-2xl border border-border/50 rounded-lg shadow-2xl overflow-hidden flex"
                        >
                          {/* Categories Sidebar */}
                          <div className="w-1/3 bg-muted/30 border-r border-border/30 p-6 flex flex-col gap-1">
                            {categories.map((category) => (
                              <button
                                key={category.id}
                                onMouseEnter={() => setActiveCategory(category.id)}
                                className={`text-left px-4 py-3 rounded-md transition-all duration-200 flex items-center justify-between group/cat ${activeCategory === category.id ? 'bg-primary/10 text-primary shadow-sm' : 'text-foreground/60 hover:bg-muted/50 hover:text-foreground'}`}
                              >
                                <span className="font-heading font-bold text-[11px] tracking-[0.15em] uppercase">
                                  {category.name}
                                </span>
                                <ArrowRight size={14} className={`transition-transform duration-300 ${activeCategory === category.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                              </button>
                            ))}
                          </div>

                          {/* Products Grid */}
                          <div className="w-2/3 p-8 bg-card">
                            <div className="mb-6">
                              <h3 className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase text-primary mb-1">
                                {activeCategoryData?.name}
                              </h3>
                              <p className="text-muted-foreground text-[11px] tracking-wider uppercase opacity-60">
                                Select a system to view technical details
                              </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              {activeCategoryData?.products.map(prodId => {
                                const product = products.find(p => p.id === prodId);
                                if (!product) return null;
                                return (
                                  <button
                                    key={prodId}
                                    onClick={() => handleProductClick(prodId)}
                                    className="text-left p-4 rounded-lg border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group/item flex flex-col gap-2 shadow-sm hover:shadow-md"
                                  >
                                    <div className="font-heading font-bold text-[13px] tracking-wider uppercase text-foreground group-hover/item:text-primary transition-colors">
                                      {product.name}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground line-clamp-1 uppercase tracking-[0.05em]">
                                      {product.subCategory}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Removed: Explore the complete range section */}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`font-heading font-semibold text-[13px] tracking-[0.15em] uppercase transition-colors duration-300 ${isCurrentPath(link.href) ? 'text-primary' : 'text-foreground/70 hover:text-primary'}`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-sm font-heading font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-primary/90 transition-all shadow-glow active:scale-95"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-16 lg:hidden bg-background/98 backdrop-blur-xl z-40 overflow-y-auto"
          >
            <nav className="container mx-auto px-8 py-10 flex flex-col gap-6">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <Link 
                          to={link.href} 
                          onClick={() => setIsOpen(false)}
                          className="font-heading font-bold text-2xl tracking-[0.1em] uppercase text-foreground"
                        >
                          {link.label}
                        </Link>
                        <button 
                          onClick={() => setIsProductsOpen(!isProductsOpen)}
                          className="p-2 bg-secondary rounded-full"
                        >
                          <ChevronDown size={20} className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {isProductsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-6 pl-4 border-l-2 border-primary/20"
                          >
                            {categories.map((cat) => (
                              <div key={cat.id} className="space-y-3">
                                <h4 className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase text-primary">
                                  {cat.name}
                                </h4>
                                <div className="flex flex-col gap-3">
                                  {cat.products.map(pId => {
                                    const p = products.find(prod => prod.id === pId);
                                    if (!p) return null;
                                    return (
                                      <button
                                        key={pId}
                                        onClick={() => handleProductClick(pId)}
                                        className="text-left font-heading font-medium text-base text-foreground/70 hover:text-primary transition-colors"
                                      >
                                        {p.name}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-heading font-bold text-2xl tracking-[0.1em] uppercase text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-sm font-heading font-bold text-base tracking-[0.2em] uppercase text-center mt-6 shadow-glow"
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