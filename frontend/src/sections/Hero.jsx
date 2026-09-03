import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import heroBgVideo from "@/assets/ProductVideos/Vrishabh.mp4";
import demoVideo from "@/assets/Watch_Demo_Video.mp4";
import { stats } from "@/data/siteData";
import { smoothScrollToId } from "@/lib/utils";
import VideoPlayer from "@/components/VideoPlayer";

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
    smoothScrollToId("tech-specs");
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
    <section className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-[55vh] w-full object-cover object-center sm:h-full sm:object-cover"
        >
          <source src={heroBgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Theme-Adaptive Hero Overlay */}
      <div className="absolute inset-0 hero-overlay transition-all duration-500" />

      {/* Main Hero Center Content - Perfectly Centered in Viewport */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto w-full max-w-6xl"
        >
          <h1 className="safe-break mx-auto mb-5 w-full text-center font-heading text-[clamp(2rem,1rem+4.5vw,5.1rem)] font-bold leading-[1.05] tracking-tight text-foreground drop-shadow-lg sm:mb-6">
            Strength Through Technology,{" "}
            <span className="text-gradient">Built for the Frontline</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 max-w-4xl text-center font-heading text-base font-bold uppercase tracking-[0.12em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] sm:mb-10 sm:text-2xl sm:tracking-[0.16em] md:text-3xl lg:text-4xl"
        >
          Power. Precision. Reliability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <button
            type="button"
            onClick={scrollToTechSpecs}
            className="touch-target rounded-sm bg-gradient-primary px-6 py-3.5 text-center font-heading text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow transition-opacity hover:opacity-90 active:scale-95 sm:min-w-[190px] sm:px-8"
          >
            Explore Products
          </button>
          <button
            type="button"
            onClick={() => setIsDemoOpen(true)}
            className="touch-target rounded-sm border border-border/80 bg-background/30 px-6 py-3.5 font-heading text-sm font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary active:scale-95 sm:min-w-[190px] sm:px-8"
          >
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* Demo Video Modal */}
      {isDemoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden border border-border shadow-2xl">
            <VideoPlayer
              src={demoVideo}
              videoRef={demoVideoRef}
              autoPlay
              loop
              playsInline
              ariaLabel="Bhairav Robotics demo video"
              className="w-full h-full object-contain"
            />
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
      <div className="relative z-10 border-t border-border/20 bg-background/30 pb-6 pt-4 backdrop-blur-[4px] sm:pb-8">
        <div className="responsive-container">
          <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-5 lg:gap-x-8">
            {stats.map((stat, i) => {
              const isNumeric = !Number.isNaN(parseInt(stat.value, 10));

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + i * 0.12 }}
                  className="flex min-h-[78px] flex-col items-center justify-start p-1 text-center sm:min-h-[88px] sm:p-2"
                >
                  <div
                    className={`font-heading font-bold text-foreground drop-shadow-md flex min-h-[48px] items-center justify-center text-center leading-tight ${
                      isNumeric
                        ? "text-xl sm:text-3xl lg:text-4xl"
                        : "safe-break max-w-[230px] text-xs sm:text-base lg:text-lg"
                    }`}
                  >
                    <AnimatedStatNumber value={stat.value} />
                    {stat.unit && (
                      <span className="text-sm sm:text-base font-semibold ml-1 text-primary">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <div className="safe-break mt-1 max-w-[200px] font-heading text-[12px] font-semibold uppercase leading-tight tracking-[0.12em] text-foreground/80 sm:text-[14px] sm:tracking-[0.15em]">
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
