import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroPoster from "@/assets/Vrishabh.mp4";
import { stats } from "@/data/siteData";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-fill"
        >
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
          <a
            href="#products"
            className="bg-gradient-primary px-8 py-3.5 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-primary-foreground hover:opacity-90 transition-opacity shadow-glow"
          >
            Explore Products
          </a>
          <a
            href="#technology"
            className="border border-border px-8 py-3.5 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Watch Demo
          </a>
        </motion.div>
      </div>

      {/* Stats overlay at bottom */}
      <div className="absolute bottom-16 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-sm font-medium ml-1 text-muted-foreground">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 font-heading mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-1"
        >
          <ChevronDown size={18} className="text-primary animate-scroll-indicator" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
