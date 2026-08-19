import T1Header from "@/template1/sections/T1Header";
import T1Hero from "@/template1/sections/T1Hero";
import T1TechSpecs from "@/template1/sections/T1TechSpecs";
import T1Footer from "@/template1/sections/T1Footer";

const T1Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <T1Header />
      <main>
        <T1Hero />
        <T1TechSpecs />
      </main>
      <T1Footer />
    </div>
  );
};

export default T1Index;
