import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import StatsStrip from "@/sections/StatsStrip";
import ProductShowcase from "@/sections/ProductShowcase";
import TechSpecs from "@/sections/TechSpecs";
import Partners from "@/sections/Partners";
import Testimonials from "@/sections/Testimonials";
import NewsSection from "@/sections/NewsSection";
import Footer from "@/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <StatsStrip />
      <TechSpecs />
      <ProductShowcase />
      <Partners />
      <Testimonials />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
