import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { products, categories } from "@/data/products";
import { CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get("id") || products[0].id;

  // Find current product
  const productIndex = useMemo(() => products.findIndex(p => p.id === productId), [productId]);
  const product = products[productIndex !== -1 ? productIndex : 0];

  // Find products in same category for navigation
  const categoryProducts = useMemo(() => {
    const cat = categories.find(c => c.products.includes(product.id));
    return cat ? cat.products : [];
  }, [product.id]);

  const currentInCatIndex = categoryProducts.indexOf(product.id);

  const navigateProduct = (direction) => {
    const nextIndex = (currentInCatIndex + direction + categoryProducts.length) % categoryProducts.length;
    const nextProdId = categoryProducts[nextIndex];
    setSearchParams({ id: nextProdId });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-6">
          
          {/* Breadcrumbs & Category Title */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-heading font-semibold mb-2 block">
                {categories.find(c => c.id === product.category)?.name}
              </span>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-gradient">
                {product.name}
              </h1>
            </div>

            {/* Category Navigation Arrows */}
            {categoryProducts.length > 1 && (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigateProduct(-1)}
                  className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all group"
                  title="Previous in category"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <span className="font-heading text-xs tracking-widest text-muted-foreground uppercase">
                  {currentInCatIndex + 1} / {categoryProducts.length}
                </span>
                <button 
                  onClick={() => navigateProduct(1)}
                  className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all group"
                  title="Next in category"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Visuals */}
            <div className="space-y-8">
              {/* Main Visual: Video or Image */}
              <motion.div 
                key={`${product.id}-visual`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video bg-black rounded-lg overflow-hidden border border-border/30 shadow-2xl group"
              >
                {product.video ? (
                  <video
                    key={product.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={product.video} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                    <PlayCircle size={64} className="text-muted-foreground/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </motion.div>
            </div>

            {/* Right Column: Info & Specs */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-[11px] tracking-[0.2em] uppercase text-primary font-heading font-semibold mb-4">
                  Overview
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-light">
                  {product.description}
                </p>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-[11px] tracking-[0.2em] uppercase text-foreground font-heading font-semibold mb-6 border-l-2 border-primary pl-4">
                  Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-card/40 p-4 rounded-sm border border-border/30">
                      <CheckCircle2 className="text-primary h-5 w-5 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link 
                  to={`/download-brochure?id=${product.id}`}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-sm font-heading font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-all shadow-glow text-center"
                >
                  Download Technical Brochure
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
