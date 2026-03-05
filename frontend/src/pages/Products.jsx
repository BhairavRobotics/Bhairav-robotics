import Header from "../components/Header";
import Footer from "../sections/Footer";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 container mx-auto px-6 py-12">
        <h1 className="text-4xl font-heading font-bold mb-8">Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Discover our range of advanced robotic solutions for the modern battlefield.
        </p>
        {/* Product content will go here */}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
