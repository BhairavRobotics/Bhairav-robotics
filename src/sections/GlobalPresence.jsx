import { motion } from "framer-motion";
import worldMap from "@/assets/world-map.png";

const GlobalPresence = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Global <span className="text-gradient">Presence</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Operational across defense installations and industrial sites worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-12"
        >
          <img
            src={worldMap}
            alt="Global operational map"
            className="w-full rounded-lg border border-border"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-heading font-semibold text-xl text-foreground text-center mb-4">
            Headquarters
          </h3>
          <div className="aspect-video rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15134.548898693076!2d73.8567!3d18.5204!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhairav Robotics Headquarters"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalPresence;
