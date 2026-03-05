import Header from "../components/Header";
import Footer from "../sections/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 container mx-auto px-6 py-12">
        <h1 className="text-4xl font-heading font-bold mb-8">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Get in touch with us for inquiries and collaborations.
        </p>
        {/* Contact content will go here */}
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
