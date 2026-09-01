import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { Send, ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { apiUrl } from "@/lib/api";

const BrochureRequest = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id") || "general";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const product = products.find((p) => p.id === productId);
  const hasBrochure = Boolean(product?.brochure);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasBrochure) {
      toast({
        title: "No Brochure Available",
        description: "No brochure is available for this product.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl("/api/brochure"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, productId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to request brochure");
      }

      setSent(true);
      setName("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "There was an issue sending your brochure. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                <MailCheck size={24} />
              </div>
                <h2 className="safe-break font-heading text-2xl font-bold text-foreground lg:text-3xl">
                Download <span className="text-primary">Brochure</span>
              </h2>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MailCheck size={32} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  Brochure Sent!
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                  The {product?.name || "product"} brochure has been sent to your email address. Please check your inbox to download it.
                </p>
                <Button
                  type="button"
                  onClick={() => setSent(false)}
                  className="touch-target bg-gradient-primary px-6 py-3 font-heading font-bold uppercase tracking-widest text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
                >
                  Request Another
                </Button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-8 font-body text-sm leading-relaxed">
                  Please provide your details and we will send the {product?.name || "product"} brochure to your email address.
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
                    disabled={isSubmitting}
                    className="touch-target w-full bg-gradient-primary py-6 font-heading font-bold uppercase tracking-widest text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
                  >
                    <Send size={18} className="mr-2" />
                    {isSubmitting ? "Sending..." : "Send Me the Brochure"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrochureRequest;
