import { useState } from "react";
import { motion } from "framer-motion";
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
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Technical <span className="text-gradient">Specifications</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-heading font-medium text-sm tracking-wider px-5 py-2.5 rounded-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto bg-card border border-border rounded-lg overflow-hidden"
        >
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex justify-between items-center px-6 py-4 ${
                i < specs.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-muted-foreground text-sm">{spec.label}</span>
              <span className="font-heading font-semibold text-foreground">{spec.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechSpecs;
