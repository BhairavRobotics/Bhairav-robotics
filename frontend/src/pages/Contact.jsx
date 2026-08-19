import { useState } from "react";
import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Message Sent",
        description: "Your message has been received. We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an issue sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-primary font-heading font-semibold mb-3 block">
              Reach Out
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Contact us for inquiries, customization options, technical support, or any questions you have regarding our solutions.
            </p>
          </motion.div>
        </section>

        <section className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-card border border-border/50 p-8 rounded-lg shadow-glow group hover:border-primary/30 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full text-primary w-fit mb-6 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 text-foreground">Office Address</h3>
                <p className="text-muted-foreground leading-relaxed">
                  D/No 13-1-27, Above Indian Terrain showroom, Main Road, Kakinada 533001, Andhra Pradesh
                </p>
              </div>

              <div className="bg-card border border-border/50 p-8 rounded-lg shadow-glow group hover:border-primary/30 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full text-primary w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 text-foreground">Phone</h3>
                <p className="text-muted-foreground leading-relaxed">
                  +91 8341082589
                </p>
              </div>

              <div className="bg-card border border-border/50 p-8 rounded-lg shadow-glow group hover:border-primary/30 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full text-primary w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 text-foreground">Email</h3>
                <p className="text-muted-foreground leading-relaxed">
                  contact@bhairavrobotics.com
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 bg-card border border-border p-8 lg:p-10 rounded-lg shadow-glow"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <MessageSquare size={24} />
                </div>
                <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                  Send us a <span className="text-primary">Message</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Inquiry about Shvana"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">Your Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary transition-colors" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary text-primary-foreground font-heading font-bold uppercase tracking-widest py-6 shadow-glow hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="mr-2 animate-spin" />
                  ) : (
                    <Send size={18} className="mr-2" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Map Section - Integrated Google Maps */}
        <section className="container mx-auto px-6 mt-20">
          <div className="w-full h-[450px] bg-muted/30 border border-border/50 rounded-lg overflow-hidden relative group shadow-glow">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.123456789!2d82.2352324!3d16.9571896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3829fbe8d3c213%3A0x6001529ac246b7d5!2sBhairav%20Robotics%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2) brightness(0.9)" }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhairav Robotics Location"
              className="grayscale brightness-[0.8] contrast-[1.2] hover:grayscale-0 transition-all duration-700"
            ></iframe>
            {/* Overlay to match theme - only visible on hover or as a subtle tint */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:opacity-0 transition-opacity" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
