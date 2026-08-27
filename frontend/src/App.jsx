import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import { smoothScrollToId } from "@/lib/utils";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import BrochureRequest from "./pages/BrochureRequest";
import T72Mockup from "../../T72/T72Mockup";
import ThemeSelector from "./components/ThemeSelector";

const queryClient = new QueryClient();

const ScrollManager = () => {
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  // Stop the browser from auto-restoring stale scroll positions on
  // back/forward/reload, which would fight SPA navigation.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Runs before paint so the new page never flashes at the previous
  // page's scroll offset (prevents cut-off content under the header).
  useLayoutEffect(() => {
    const isNewPage = prevPathnameRef.current !== location.pathname;
    prevPathnameRef.current = location.pathname;

    // Reset to top when landing on a different page (with or without a
    // section hash), or normalize position on initial load without a hash.
    // Same-page hash changes are skipped so smooth section scrolling works.
    if (isNewPage || !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace("#", "");
    const timeout = window.setTimeout(() => {
      smoothScrollToId(targetId);
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/download-brochure" element={<BrochureRequest />} />
          <Route path="/t72-mockup" element={<T72Mockup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ThemeSelector />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
