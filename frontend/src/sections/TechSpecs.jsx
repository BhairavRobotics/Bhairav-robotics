import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techSpecs } from "@/data/siteData";
import vrishabhImg from "@/assets/products/vrishabh.png";

const tabs = [
  { key: "mobility", label: "Mobility" },
  { key: "power", label: "Battery & Power" },
  { key: "control", label: "Control Systems" },
  { key: "dimensions", label: "Dimensions & Payload" },
];

const productViews = [
  { label: "Front View", angle: "rotate-0" },
  { label: "Side View", angle: "-scale-x-100" },
  { label: "Top View", angle: "rotate-12 scale-90" },
  { label: "Action Shot", angle: "-rotate-6 scale-105" },
];

const TechSpecs = () => {
  const [activeTab, setActiveTab] = useState("mobility");
  const [activeView, setActiveView] = useState(0);
  const specs = techSpecs[activeTab];

  return (
    <section className="py-12 lg:py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-card/20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-heading font-semibold mb-3">
            Engineering Excellence
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
            Technical <span className="text-gradient">Specifications</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left: Specs */}
          <div>
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 mb-8 border-b border-border/40 pb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative font-heading font-semibold text-[13px] tracking-wider px-5 py-3.5 transition-colors duration-200 ${
                    activeTab === tab.key
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeSpecTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Spec rows */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-card/40 backdrop-blur-sm border border-border/30 rounded-lg overflow-hidden"
              >
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between items-center px-6 py-4 transition-all duration-200 hover:bg-primary/5 hover:pl-7 group ${
                      i < specs.length - 1 ? "border-b border-border/20" : ""
                    }`}
                  >
                    <span className="text-muted-foreground text-sm font-heading group-hover:text-foreground/80 transition-colors">
                      {spec.label}
                    </span>
                    <span className="font-heading font-bold text-foreground tracking-wide text-base">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Product views */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-lg p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square flex items-center justify-center mb-6"
                >
                  <img
                    src={vrishabhImg}
                    alt={`Vrishabh - ${productViews[activeView].label}`}
                    className={`w-full h-full object-contain transition-transform duration-500 ${productViews[activeView].angle}`}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-4 gap-2">
                {productViews.map((view, i) => (
                  <button
                    key={view.label}
                    onClick={() => setActiveView(i)}
                    className={`py-2 px-1 rounded text-[11px] font-heading font-semibold tracking-wider uppercase transition-all duration-200 ${
                      activeView === i
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-card/50 text-muted-foreground border border-border/30 hover:text-foreground hover:border-border"
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
