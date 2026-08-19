import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import TechSpecs from "@/sections/TechSpecs";
import Footer from "@/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <TechSpecs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
