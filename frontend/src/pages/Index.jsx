import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import ProductShowcase from "@/sections/ProductShowcase";
import TechSpecs from "@/sections/TechSpecs";
import NewsSection from "@/sections/NewsSection";
import Footer from "@/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TechSpecs />
      <ProductShowcase />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
