import { motion } from "framer-motion";
import { stats } from "@/data/siteData";

const StatsStrip = () => {
  return (
    <section className="bg-gradient-primary py-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground">
                {stat.value}
                {stat.unit && <span className="text-sm font-medium ml-1 opacity-80">{stat.unit}</span>}
              </div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-primary-foreground/70 font-heading">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
