import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techSpecs } from "@/data/siteData";

const tabs = [
  { key: "mobility", label: "Mobility" },
  { key: "power", label: "Battery & Power" },
  { key: "control", label: "Control Systems" },
  { key: "dimensions", label: "Dimensions & Payload" },
];

const TechSpecs = () => {
  const [activeTab, setActiveTab] = useState("mobility");
  const specs = techSpecs[activeTab];

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-heading mb-3">
            Engineering Excellence
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
            Technical <span className="text-gradient">Specifications</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-12 border-b border-border/50 pb-px max-w-2xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative font-heading font-medium text-sm tracking-wider px-6 py-3 transition-colors duration-200 ${
                activeTab === tab.key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Specs table */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-card"
            >
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex justify-between items-center px-6 py-4.5 transition-colors duration-150 hover:bg-muted/30 ${
                    i < specs.length - 1 ? "border-b border-border/30" : ""
                  }`}
                >
                  <span className="text-muted-foreground text-sm font-heading">
                    {spec.label}
                  </span>
                  <span className="font-heading font-bold text-foreground tracking-wide">
                    {spec.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
