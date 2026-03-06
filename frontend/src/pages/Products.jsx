import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-primary font-heading font-semibold mb-3 block">
              Our Innovations
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Advanced <span className="text-gradient">Robotic Systems</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our range of cutting-edge autonomous platforms and tactical solutions engineered for the modern battlefield and mission-critical operations.
            </p>
          </motion.div>
        </section>

        {/* Product Grid */}
        <section className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-lg overflow-hidden flex flex-col group hover:border-primary/30 transition-all shadow-glow"
              >
                <div className="aspect-video bg-black relative overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <source src={product.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-heading font-semibold mb-2">
                    {product.category}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {product.description}
                  </p>
                  
                  <div className="space-y-3 mb-8 flex-grow">
                    {product.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="text-primary h-4 w-4 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-2 bg-secondary border border-border px-6 py-3 rounded-sm font-heading font-semibold text-xs tracking-wider uppercase text-foreground hover:border-primary hover:text-primary transition-all group/btn">
                    View Details
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
