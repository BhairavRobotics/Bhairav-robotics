import Header from "../components/Header";
import Footer from "../sections/Footer";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 container mx-auto px-6 py-12">
        <h1 className="text-4xl font-heading font-bold mb-8">Careers</h1>
        <p className="text-lg text-muted-foreground">
          Join our team and help shape the future of robotics.
        </p>
        {/* Careers content will go here */}
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
