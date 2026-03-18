import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, CheckCircle2 } from "lucide-react";
import { products, categories } from "@/data/products";
import { Link } from "react-router-dom";

const ProductShowcase = () => {
  const [current, setCurrent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const prev = () => {
    setCurrent((c) => (c === 0 ? products.length - 1 : c - 1));
    setIsExpanded(false);
  };
  const next = () => {
    setCurrent((c) => (c === products.length - 1 ? 0 : c + 1));
    setIsExpanded(false);
  };

  const product = products[current];

  return (
    <section id="products" className="pt-4 pb-12 lg:pt-6 lg:pb-16 bg-background">
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

        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors"
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
              <div className="grid md:grid-cols-[1.2fr_1fr] gap-0">
                <div className="aspect-video md:aspect-auto bg-black flex items-center justify-center overflow-hidden relative group">
                  <video
                    key={product.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  >
                    <source src={product.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent pointer-events-none" />
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center bg-card">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-heading font-semibold mb-2">
                    {categories.find(c => c.id === product.category)?.name || product.category}
                  </span>
                  <h3 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                    {product.name}
                  </h3>
                  
                  <div className="relative mb-6">
                    <p className={`text-muted-foreground leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                      {product.description}
                    </p>
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-primary text-xs font-bold uppercase tracking-wider mt-2 hover:underline focus:outline-none"
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 mb-8">
                    {product.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/download-brochure?id=${product.id}`}
                    className="inline-flex items-center gap-2 bg-gradient-primary px-6 py-3 rounded-sm font-heading font-semibold text-sm tracking-wider uppercase text-primary-foreground hover:opacity-90 transition-opacity self-start shadow-glow"
                  >
                    Download Brochure
                    <Download size={16} />
                  </Link>
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
