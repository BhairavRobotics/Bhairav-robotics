import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { news } from "@/data/siteData";

const NewsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            News <span className="text-gradient">Feed</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {news.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video bg-secondary" />
              <div className="p-6">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-heading font-semibold">
                  {item.date}
                </span>
                <h3 className="font-heading font-semibold text-lg text-foreground mt-2 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-primary font-heading font-medium hover:gap-2 transition-all"
                >
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
