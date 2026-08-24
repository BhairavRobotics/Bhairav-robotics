import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../assets/header/brlogo.png";
import { products } from "@/data/products";
import { smoothScrollToId } from "@/lib/utils";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const productLinks = products.map((product) => ({
  label: product.name,
  subtitle: product.subCategory,
  to: { pathname: "/", hash: `#product-${product.id}` },
}));

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [canHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const location = useLocation();
  const productsRef = useRef(null);
  const productsCloseTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setProductsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!productsOpen) return;
    const handlePointerDown = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setProductsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [productsOpen]);

  useEffect(
    () => () => window.clearTimeout(productsCloseTimer.current),
    [],
  );

  const openProductsMenu = () => {
    window.clearTimeout(productsCloseTimer.current);
    setProductsOpen(true);
  };

  const scheduleProductsClose = () => {
    window.clearTimeout(productsCloseTimer.current);
    productsCloseTimer.current = window.setTimeout(
      () => setProductsOpen(false),
      140,
    );
  };

  const isProductHashActive = (hash) =>
    location.pathname === "/" && location.hash === hash;

  const handleProductSelect = (productId) => {
    setProductsOpen(false);
    if (
      location.pathname === "/" &&
      location.hash === `#product-${productId}`
    ) {
      smoothScrollToId(`product-${productId}`);
    }
  };

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-xl"
            : "bg-background/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-b border-border/20 lg:border-transparent"
        }`}
      >
      <div className="responsive-container">
        <div className="flex h-16 items-center justify-between gap-3 lg:h-20">
          <Link to="/" className="flex min-w-0 items-center gap-2 group sm:gap-3">
            <div className="logo-glow-wrapper relative flex items-center justify-center">
              <img
                src={logo}
                alt="Bhairav Robotics logo"
                className="h-9 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105 sm:h-11 lg:h-12"
              />
            </div>
            <div className="mx-1 hidden h-8 border-l border-border/40 sm:block" />
            <h1 className="hidden min-w-0 font-heading text-lg font-bold uppercase tracking-tight text-foreground/90 sm:block md:text-xl lg:text-2xl xl:text-3xl">
              Born for the <span className="text-primary">battlefield</span>
            </h1>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
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

            <div ref={productsRef} className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((open) => !open)}
                onMouseEnter={canHover ? openProductsMenu : undefined}
                onMouseLeave={canHover ? scheduleProductsClose : undefined}
                aria-haspopup="true"
                aria-expanded={productsOpen}
                aria-controls="products-dropdown"
                className={`touch-target inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  productsOpen || productLinks.some((link) => isProductHashActive(link.to.hash))
                    ? "text-primary"
                    : "text-foreground/75 hover:text-primary"
                }`}
              >
                Products
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <div
                    id="products-dropdown"
                    className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    onMouseEnter={canHover ? openProductsMenu : undefined}
                    onMouseLeave={canHover ? scheduleProductsClose : undefined}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      role="menu"
                      aria-label="Products"
                      className="w-64 overflow-hidden rounded-lg border border-border/70 bg-background/95 shadow-xl backdrop-blur-xl sm:w-72"
                    >
                      <div className="border-b border-border/40 px-4 py-2.5">
                        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                          Product Details
                        </p>
                      </div>
                      <div className="max-h-[60vh] overflow-y-auto p-1.5">
                        {productLinks.map((link) => {
                          const isActive = isProductHashActive(link.to.hash);
                          return (
                            <Link
                              key={link.label}
                              to={link.to}
                              role="menuitem"
                              onClick={() =>
                                handleProductSelect(
                                  link.to.hash.replace("#product-", ""),
                                )
                              }
                              className={`block rounded-md px-3 py-2.5 transition-colors duration-200 hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none ${
                                isActive ? "text-primary" : "text-foreground"
                              }`}
                            >
                              <span
                                className={`safe-break block font-heading text-sm font-bold uppercase tracking-[0.1em] ${
                                  isActive ? "text-primary" : ""
                                }`}
                              >
                                {link.label}
                              </span>
                              <span className="safe-break mt-0.5 block text-xs text-muted-foreground">
                                {link.subtitle}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/contact"
              className="touch-target inline-flex items-center rounded-sm bg-primary px-5 py-2 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-glow transition-all hover:bg-primary/90 active:scale-95 xl:px-6"
            >
              Get in Touch
            </Link>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="touch-target inline-flex min-w-11 items-center justify-center rounded-md p-2 text-foreground/80 transition-colors hover:bg-muted/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      </header>

      {/* Rendered OUTSIDE <header> on purpose: backdrop-filter on the header makes it the
          containing block for position:fixed children, collapsing the panel to 0 height. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 top-16 z-[60] overflow-y-auto overscroll-contain border-t border-border bg-background text-foreground shadow-2xl lg:hidden"
            id="mobile-menu"
          >
            <nav className="responsive-container flex flex-col gap-7 py-8">
              <div>
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Quick Links
                </p>
                <div className="grid gap-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`touch-target flex items-center border-b border-border/60 py-3 font-heading text-lg font-bold uppercase tracking-[0.1em] transition-colors hover:text-primary sm:text-xl ${
                        isCurrentPath(link.href) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Product Details
                </p>
                <div className="grid gap-2">
                  <Link
                    to={{ pathname: "/", hash: "#tech-specs" }}
                    onClick={() => setIsOpen(false)}
                    className="touch-target flex items-center border-b border-border/60 py-3 font-heading text-lg font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:text-primary sm:text-xl"
                  >
                    Product Portfolio
                  </Link>
                  {productLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="touch-target flex flex-col justify-center border-b border-border/60 py-3 text-foreground transition-colors hover:text-primary"
                    >
                      <span className="font-heading text-base font-bold uppercase tracking-[0.1em] sm:text-lg">
                        {link.label}
                      </span>
                      <span className="safe-break mt-1 text-sm text-muted-foreground">
                        {link.subtitle}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="touch-target mt-4 rounded-sm bg-primary px-6 py-4 text-center font-heading text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-glow sm:text-base"
              >
                Get in Touch
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
