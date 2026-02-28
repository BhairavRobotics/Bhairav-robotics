import { motion } from "framer-motion";
import { Eye, Navigation, Shield, Cpu, Zap, Settings } from "lucide-react";
import { technologies } from "@/data/siteData";

const iconMap: Record<string, React.ElementType> = {
  Eye, Navigation, Shield, Cpu, Zap, Settings,
};

const TechnologySection = () => {
  return (
    <section id="technology" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Core <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Proprietary systems engineered for mission-critical reliability.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {technologies.map((tech, i) => {
            const Icon = iconMap[tech.icon];
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-sm flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <Icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {tech.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
