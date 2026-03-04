import { motion } from "framer-motion";
import { partnerLogos } from "@/data/siteData";

const Partners = () => {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-heading mb-10"
        >
          Trusted by Leading Defense & Industrial Organizations
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
          {partnerLogos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group px-4 py-3 rounded-sm"
            >
              <div className="font-heading font-bold text-lg tracking-wider text-muted-foreground/40 group-hover:text-primary transition-colors duration-300 uppercase">
                {name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
