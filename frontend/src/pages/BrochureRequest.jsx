import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { Download, Send, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import brochurePdf from "@/assets/Vrishabh -Combat ATV_Broucher.pdf";

const BrochureRequest = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id") || "general";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store in DB - using the established backend port
      const response = await fetch("http://localhost:3001/api/brochure-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          email, 
          productId,
          requestedAt: new Date().toISOString() 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to store request");
      }

      toast({
        title: "Request Successful",
        description: "Your request has been stored. The brochure download will start shortly.",
      });

      // Trigger download
      const link = document.createElement("a");
      link.href = brochurePdf;
      link.download = "Bhairav_Robotics_Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clear form
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Submission error:", error);
      
      // Still trigger download as a fallback for the user experience
      const link = document.createElement("a");
      link.href = brochurePdf;
      link.download = "Bhairav_Robotics_Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        variant: "destructive",
        title: "Download Started",
        description: "The brochure is downloading, though there was an issue storing your contact info.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-20">
        <section className="container mx-auto px-6 max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest mb-8 hover:underline">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border p-8 lg:p-10 rounded-lg shadow-glow"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Download size={24} />
              </div>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                Download <span className="text-primary">Brochure</span>
              </h2>
            </div>

            <p className="text-muted-foreground mb-8">
              Please provide your details to receive the product brochure directly in your inbox.
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary text-primary-foreground font-heading font-bold uppercase tracking-widest py-6 shadow-glow hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Submit
                  </>
                )}
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
