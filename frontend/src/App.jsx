import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
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
