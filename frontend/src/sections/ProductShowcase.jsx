import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";

const ProductShowcase = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? products.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === products.length - 1 ? 0 : c + 1));

  const product = products[current];

  return (
    <section id="products" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Our <span className="text-gradient">Products</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Engineered for mission-critical operations across defense and industrial domains.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-lg overflow-hidden shadow-card"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square bg-secondary flex items-center justify-center p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-heading font-semibold mb-2">
                    {product.category}
                  </span>
                  <h3 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {product.description}
                  </p>
                  <a
                    href={`#${product.id}`}
                    className="inline-flex items-center gap-2 bg-gradient-primary px-6 py-3 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-primary-foreground hover:opacity-90 transition-opacity self-start shadow-glow"
                  >
                    Learn More
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
