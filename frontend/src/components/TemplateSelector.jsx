import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Check, X } from "lucide-react";
import { useTemplate, TEMPLATES } from "@/contexts/TemplateContext";

const templateList = Object.values(TEMPLATES);

export default function TemplateSelector() {
  const { activeTemplate, setActiveTemplate } = useTemplate();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = TEMPLATES[activeTemplate];

  return (
    <div ref={panelRef} className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full mb-3 w-72 rounded-xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-md"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="font-heading text-sm font-semibold text-foreground">
                Switch Template
              </span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-1">
              {templateList.map((t) => {
                const isActive = activeTemplate === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTemplate(t.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                        isActive
                          ? "border-primary/30 bg-primary/10"
                          : "border-border bg-muted/50"
                      }`}
                    >
                      <Layout size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm font-medium">
                          {t.name}
                        </span>
                        {isActive && (
                          <Check size={14} className="text-primary" />
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {t.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-full border border-border bg-card/95 px-4 py-2.5 shadow-lg backdrop-blur-md transition-colors hover:bg-card"
      >
        <Layout size={16} className="text-primary" />
        <span className="font-heading text-sm font-medium text-foreground">
          {current?.name ?? "Template"}
        </span>
      </motion.button>
    </div>
  );
}
