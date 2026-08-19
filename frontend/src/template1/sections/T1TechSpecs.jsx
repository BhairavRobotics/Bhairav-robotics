import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Download, PlayCircle } from "lucide-react";
import { products } from "@/data/products";

const scrollToProduct = (productId) => {
  document.getElementById(`product-${productId}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const ProductSection = ({ product, index }) => {
  const specTabKeys = Object.keys(product.specTabs || {});
  const [activeSpecTab, setActiveSpecTab] = useState(
    product.activeSpecTab || specTabKeys[0] || ""
  );
  const [activeView, setActiveView] = useState(0);

  const currentSpecs = product.specTabs?.[activeSpecTab] || [];
  const views = product.views || [];
  const currentViewImage = views[activeView]?.image || views[0]?.image;
  const isReversed = index % 2 === 1;

  return (
    <motion.section
      id={`product-${product.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-16 border-t border-border/50 pt-10 pb-14 lg:pt-14 lg:pb-20"
    >
      <div
        className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
          isReversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* ── Left: Image / Video + View Selector ── */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border/70 bg-black shadow-2xl">
            {product.video ? (
              <video
                key={product.video}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="h-full w-full object-contain"
                aria-label={`${product.name} product video`}
              >
                <source src={product.video} type="video/mp4" />
              </video>
            ) : (
              <img
                key={currentViewImage}
                src={currentViewImage}
                alt={`${product.name} - ${views[activeView]?.label || "view"}`}
                className="h-full w-full object-contain"
              />
            )}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
            {product.video && (
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                <PlayCircle size={14} className="text-primary" />
                Product Video
              </div>
            )}
          </div>

          {!product.video && views.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {views.map((view, vi) => (
                <button
                  key={view.label}
                  type="button"
                  onClick={() => setActiveView(vi)}
                  className={`rounded-md px-3 py-1.5 font-heading text-[10px] font-bold uppercase tracking-wider transition-all ${
                    activeView === vi
                      ? "border border-primary bg-primary/10 text-primary"
                      : "border border-border/60 bg-background/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="rounded-lg border border-border/60 bg-card/70 p-5 shadow-sm">
              <h4 className="mb-4 border-l-2 border-primary pl-3 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                Key Capabilities
              </h4>
              <div className="grid gap-4">
                {product.features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <span className="text-xs font-heading font-bold text-foreground sm:text-sm">
                        {feature.title}
                      </span>
                      <span className="block text-xs leading-snug text-muted-foreground sm:text-sm">
                        {feature.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Info ── */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <p className="mb-2 text-[11px] font-heading font-bold uppercase tracking-[0.28em] text-primary">
              {product.subCategory}
            </p>
            <h3 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {product.name}
            </h3>
            <p className="mt-3 max-w-3xl font-heading text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {product.tagline}
            </p>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-foreground/82 sm:text-base">
            <p>{product.description}</p>
            {product.applications && <p>{product.applications}</p>}
          </div>

          {/* ── Spec Tabs ── */}
          {specTabKeys.length > 0 && (
            <div>
              {specTabKeys.length > 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {specTabKeys.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveSpecTab(tab)}
                      className={`rounded-full px-4 py-1.5 font-heading text-[11px] font-bold uppercase tracking-wider transition-all ${
                        activeSpecTab === tab
                          ? "border border-primary bg-primary text-primary-foreground shadow-glow"
                          : "border border-border/60 bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}

              <div className="rounded-lg border border-border/60 bg-card/70 p-5 shadow-sm">
                <h4 className="mb-4 border-l-2 border-primary pl-3 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                  {specTabKeys.length > 1 ? activeSpecTab : "Specifications"}
                </h4>
                <div className="overflow-hidden rounded-md border border-border/50 bg-background/50">
                  {currentSpecs.map((spec, specIndex) => (
                    <div
                      key={`${spec.label}-${specIndex}`}
                      className={`flex items-start justify-between gap-4 px-4 py-3 ${
                        specIndex < currentSpecs.length - 1
                          ? "border-b border-border/30"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-heading font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        {spec.label}
                      </span>
                      <span className="max-w-[58%] text-right text-xs font-heading font-bold text-foreground sm:text-sm">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Brochure Buttons */}
          {product.brochure && (
            <div className="flex flex-wrap gap-3">
              <a
                href={product.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-border/80 bg-secondary/30 px-5 py-3 font-heading text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                View Brochure
              </a>
              <a
                href={product.brochure}
                download={product.brochureName}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-primary px-5 py-3 font-heading text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
              >
                <Download size={15} />
                Download Brochure
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

const T1TechSpecs = () => {
  const platformCount = products.length;

  return (
    <section
      id="tech-specs"
      className="py-16 lg:py-24 bg-background"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-10"
        >
          <p className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Product Systems
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Integrated <span className="text-gradient">Product Portfolio</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-muted-foreground md:text-base">
            Select a product to jump directly to its section with video,
            overview, specifications, and brochures.
          </p>
        </motion.div>

        {/* ── Pill Tab Bar ── */}
        <div className="sticky top-16 z-20 mb-6 rounded-lg border border-border/70 bg-background/90 p-2 shadow-lg backdrop-blur-xl lg:top-20">
          <div className="flex gap-2 overflow-x-auto custom-scrollbar">
            {products.map((product, i) => (
              <button
                key={product.id}
                type="button"
                onClick={() => scrollToProduct(product.id)}
                className="group shrink-0 rounded-full border border-border/60 bg-background/50 px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
              >
                <span className="mr-2 text-[10px] text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {product.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Sections ── */}
        {products.map((product, index) => (
          <ProductSection
            key={product.id}
            product={product}
            index={index}
            platformCount={platformCount}
          />
        ))}
      </div>
    </section>
  );
};

export default T1TechSpecs;
