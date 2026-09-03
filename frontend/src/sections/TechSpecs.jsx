import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import VideoPlayer from "@/components/VideoPlayer";

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
      className="scroll-mt-24 border-t border-border/50 pb-12 pt-10 sm:pb-14 lg:scroll-mt-32 lg:pb-20 lg:pt-14"
    >
      <div
        className={`grid items-start gap-7 md:gap-8 lg:grid-cols-12 lg:gap-12 ${
          isReversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* ── Left: Image / Video + View Selector ── */}
        <div className="space-y-4 lg:col-span-5">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border/70 bg-black shadow-2xl">
            {product.video ? (
              <VideoPlayer
                src={product.video}
                autoPlay
                loop
                muted
                playsInline
                ariaLabel={`${product.name} product video`}
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                key={currentViewImage}
                src={currentViewImage}
                alt={`${product.name} - ${views[activeView]?.label || "view"}`}
                className="h-full w-full object-contain"
              />
            )}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
          </div>

          {!product.video && views.length > 1 && (
              <div className="flex flex-wrap gap-2">
              {views.map((view, vi) => (
                <button
                  key={view.label}
                  type="button"
                  onClick={() => setActiveView(vi)}
                  className={`touch-target rounded-md px-3 py-1.5 font-heading text-[10px] font-bold uppercase tracking-wider transition-all ${
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
            <div className="rounded-lg border border-border/60 bg-card/70 p-4 shadow-sm sm:p-5">
              <h4 className="mb-4 border-l-2 border-primary pl-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
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
                      <span className="block text-xs font-heading leading-snug text-muted-foreground sm:text-sm">
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
        <div className="space-y-5 lg:col-span-7">
          <div>
            <h3 className="safe-break font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {product.name}
            </h3>
            <p className="mt-3 max-w-3xl font-heading text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {product.tagline}
            </p>
          </div>

          <div className="space-y-3 font-heading text-sm leading-relaxed text-foreground/82 sm:text-base">
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
                      className={`touch-target rounded-full px-4 py-1.5 font-heading text-[11px] font-bold uppercase tracking-wider transition-all ${
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

              <div className="rounded-lg border border-border/60 bg-card/70 p-4 shadow-sm sm:p-5">
                <h4 className="mb-4 border-l-2 border-primary pl-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  Specifications
                </h4>
                <div className="overflow-hidden rounded-md border border-border/50 bg-background/50">
                  {currentSpecs.map((spec, specIndex) => (
                    <div
                      key={`${spec.label}-${specIndex}`}
                      className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 ${
                        specIndex < currentSpecs.length - 1
                          ? "border-b border-border/30"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-heading font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        {spec.label}
                      </span>
                      <span className="safe-break text-left text-xs font-heading font-bold text-foreground sm:max-w-[58%] sm:text-right sm:text-sm">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Brochure Button */}
          {product.brochure && (
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={`/download-brochure?id=${product.id}`}
                className="touch-target inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-primary px-5 py-3 text-center font-heading text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
              >
                <Download size={15} />
                Download Brochure
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

const TechSpecs = () => {
  const platformCount = products.length;

  return (
    <section
      id="tech-specs"
      className="relative bg-background py-14 transition-colors duration-300 sm:py-16 lg:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-background to-card/20 pointer-events-none" />

      <div className="responsive-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-10"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Integrated <span className="text-gradient">Product Portfolio</span>
          </h2>
        </motion.div>

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

export default TechSpecs;
