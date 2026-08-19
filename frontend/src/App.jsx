import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { TemplateProvider, useTemplate } from "./contexts/TemplateContext";
import TemplateSelector from "./components/TemplateSelector";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import BrochureRequest from "./pages/BrochureRequest";
import T72Mockup from "../../T72/T72Mockup";
import ThemeSelector from "./components/ThemeSelector";

import T1Index from "./template1/pages/T1Index";
import T1AboutUs from "./template1/pages/T1AboutUs";
import T1Careers from "./template1/pages/T1Careers";
import T1Contact from "./template1/pages/T1Contact";
import T1AdminDashboard from "./template1/pages/T1AdminDashboard";
import T1BrochureRequest from "./template1/pages/T1BrochureRequest";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { activeTemplate } = useTemplate();
  const isT1 = activeTemplate === "t1";

  return (
    <>
      <Routes>
        <Route path="/" element={isT1 ? <T1Index /> : <Index />} />
        <Route path="/about-us" element={isT1 ? <T1AboutUs /> : <AboutUs />} />
        <Route path="/careers" element={isT1 ? <T1Careers /> : <Careers />} />
        <Route path="/contact" element={isT1 ? <T1Contact /> : <Contact />} />
        <Route path="/admin" element={isT1 ? <T1AdminDashboard /> : <AdminDashboard />} />
        <Route path="/download-brochure" element={isT1 ? <T1BrochureRequest /> : <BrochureRequest />} />
        <Route path="/t72-mockup" element={<T72Mockup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ThemeSelector />
      <TemplateSelector />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TemplateProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </TemplateProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
