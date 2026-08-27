import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { Download, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";

const BrochureRequest = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id") || "general";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const product = products.find((p) => p.id === productId);
  const brochure = product?.brochure;
  const brochureName = product?.brochureName || "Bhairav_Robotics_Brochure.pdf";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brochure) {
      toast({
        title: "No Brochure Available",
        description: "No brochure is available for this product.",
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement("a");
    link.href = brochure;
    link.download = brochureName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Started",
      description: `The ${product?.name || "product"} brochure download has started.`,
    });

    setName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      <main className="pb-16 pt-24 sm:pb-20 lg:pt-32">
        <section className="responsive-container max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest mb-8 hover:underline">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg border border-border bg-card p-5 shadow-glow sm:p-8 lg:p-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Download size={24} />
              </div>
                <h2 className="safe-break font-heading text-2xl font-bold text-foreground lg:text-3xl">
                Download <span className="text-primary">Brochure</span>
              </h2>
            </div>

            <p className="text-muted-foreground mb-8 font-body text-sm leading-relaxed">
              Please provide your details to receive the official technical specifications brochure directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email ID</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <Button 
                type="submit" 
                className="touch-target w-full bg-gradient-primary py-6 font-heading font-bold uppercase tracking-widest text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
              >
                <Send size={18} className="mr-2" />
                Submit & Download
              </Button>
            </form>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrochureRequest;
