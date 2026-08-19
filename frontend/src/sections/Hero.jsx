import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import heroBgVideo from "@/assets/ProductVideos/Vrishabh.mp4";
import demoVideo from "@/assets/Vrishabh_Website.mp4";
import { stats } from "@/data/siteData";

const AnimatedStatNumber = ({ value, duration = 1.2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const target = parseInt(value, 10);

  useEffect(() => {
    if (isNaN(target)) return;
    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  if (isNaN(target)) return <span>{value}</span>;
  return <span>{displayValue}</span>;
};

const Hero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const demoVideoRef = useRef(null);

  const scrollToTechSpecs = () => {
    document.getElementById("tech-specs")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={heroBgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Theme-Adaptive Hero Overlay */}
      <div className="absolute inset-0 hero-overlay transition-all duration-500" />

      {/* Main Hero Center Content - Perfectly Centered in Viewport */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-none mx-auto"
        >
          <h1 className="font-heading font-bold text-[clamp(1.35rem,2.65vw,3.15rem)] tracking-tight text-foreground mb-6 drop-shadow-lg text-center leading-[1.05] w-full mx-auto whitespace-nowrap">
            Strength Through Technology,{" "}
            <span className="text-gradient">Built for the Frontline</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.16em] uppercase text-foreground mb-10 drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] text-center"
        >
          Power. Precision. Reliability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <button
            type="button"
            onClick={scrollToTechSpecs}
            className="bg-gradient-primary px-8 py-3.5 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-primary-foreground hover:opacity-90 transition-opacity shadow-glow active:scale-95 text-center min-w-[190px]"
          >
            Explore Products
          </button>
          <button
            type="button"
            onClick={() => setIsDemoOpen(true)}
            className="border border-border/80 bg-background/30 backdrop-blur-sm px-8 py-3.5 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-foreground hover:border-primary hover:text-primary transition-colors active:scale-95 min-w-[190px]"
          >
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* Demo Video Modal */}
      {isDemoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden border border-border shadow-2xl">
            <video
              ref={demoVideoRef}
              autoPlay
              loop
              playsInline
              controls
              className="w-full h-full object-contain"
            >
              <source src={demoVideo} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={() => setIsDemoOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition hover:bg-background"
              aria-label="Close demo"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Floating stats strip over bottom of hero */}
      <div className="relative z-10 pb-8 pt-4 bg-background/30 backdrop-blur-[4px] border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 lg:gap-x-8 items-stretch">
            {stats.map((stat, i) => {
              const isNumeric = !Number.isNaN(parseInt(stat.value, 10));

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + i * 0.12 }}
                  className="text-center flex min-h-[88px] flex-col items-center justify-start p-2"
                >
                  <div
                    className={`font-heading font-bold text-foreground drop-shadow-md flex min-h-[48px] items-center justify-center text-center leading-tight ${
                      isNumeric
                        ? "text-2xl sm:text-3xl lg:text-4xl"
                        : "max-w-[230px] text-sm sm:text-base lg:text-lg"
                    }`}
                  >
                    <AnimatedStatNumber value={stat.value} />
                    {stat.unit && (
                      <span className="text-sm sm:text-base font-semibold ml-1 text-primary">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-foreground/80 font-heading font-semibold mt-1 max-w-[200px] leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <button type="button" onClick={scrollToTechSpecs} aria-label="Scroll down to specifications">
            <ChevronDown size={20} className="text-primary animate-bounce opacity-80" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
