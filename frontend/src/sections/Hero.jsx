import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import heroPoster from "@/assets/ProductVideos/Vrishabh.mp4";
import { stats } from "@/data/siteData";

const Hero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const demoVideoRef = useRef(null);

  useEffect(() => {
    if (!isDemoOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDemoOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    if (demoVideoRef.current) {
      demoVideoRef.current.currentTime = 0;
      demoVideoRef.current.play().catch(() => {
        // Ignore autoplay policy interruptions.
      });
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDemoOpen]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-fill">
          <source src={heroPoster} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-4">
            Born for the battlefield,{" "}
            <span className="text-gradient">Defense & Industry</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-xl sm:text-2xl md:text-3xl font-light tracking-[0.15em] uppercase text-muted-foreground mb-10"
        >
          Power. Precision. Reliability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/products"
            className="bg-gradient-primary px-8 py-3.5 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-primary-foreground hover:opacity-90 transition-opacity shadow-glow"
          >
            Explore Products
          </Link>
          <button
            type="button"
            onClick={() => setIsDemoOpen(true)}
            className="border border-border px-8 py-3.5 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Watch Demo
          </button>
        </motion.div>
      </div>

      {isDemoOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            ref={demoVideoRef}
            autoPlay
            loop
            playsInline
            controls
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={heroPoster} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
          <button
            type="button"
            onClick={() => setIsDemoOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-sm transition hover:bg-background/35"
            aria-label="Close demo"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Floating stats over hero */}
      <div className="absolute bottom-20 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + i * 0.12 }}
                className="text-center"
              >
                <div className="font-heading font-bold text-3xl md:text-4xl text-foreground drop-shadow-lg">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-base font-medium ml-1 text-foreground/50">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 font-heading font-medium mt-1.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <ChevronDown size={18} className="text-primary animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
