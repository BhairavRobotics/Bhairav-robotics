import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroPoster from "@/assets/hero-poster.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background with poster fallback */}
      <div className="absolute inset-0">
        <img
          src={heroPoster}
          alt="Defense robotics background"
          className="w-full h-full object-cover"
        />
        {/* Replace the img above with video when you have a video file:
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          className="w-full h-full object-cover"
          preload="metadata"
        >
          <source src="/videos/demo.mp4" type="video/mp4" />
        </video>
        */}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-4">
            Next-Gen Robotics for{" "}
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-heading">
            Scroll
          </span>
          <ChevronDown size={20} className="text-primary animate-scroll-indicator" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
