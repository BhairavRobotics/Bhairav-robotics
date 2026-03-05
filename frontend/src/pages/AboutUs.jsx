import Header from "../components/Header";
import Footer from "../sections/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 container mx-auto px-6 py-12">
        <h1 className="text-4xl font-heading font-bold mb-8">About Us</h1>
        <p className="text-lg text-muted-foreground">
          Bhairav Robotics is committed to developing cutting-edge autonomous systems.
        </p>
        {/* About Us content will go here */}
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
