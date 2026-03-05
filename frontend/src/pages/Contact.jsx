import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
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

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="bg-background/50 border-border/50 focus:border-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50 border-border/50 focus:border-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground">Subject</Label>
                  <Input id="subject" placeholder="Inquiry about Shvana" className="bg-background/50 border-border/50 focus:border-primary transition-colors" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">Your Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary transition-colors" />
                </div>

                <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground font-heading font-bold uppercase tracking-widest py-6 shadow-glow hover:opacity-90 transition-opacity">
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Map Section - Simplified as a placeholder matching the style */}
        <section className="container mx-auto px-6 mt-20">
          <div className="w-full h-[400px] bg-muted/30 border border-border/50 rounded-lg overflow-hidden relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin size={48} className="text-primary mx-auto animate-bounce" />
                <p className="font-heading font-bold text-xl text-foreground/60">Kakinada, Andhra Pradesh</p>
                <a 
                  href="https://www.google.com/maps?ll=16.95719,82.235232&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=6917901327255648213" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-primary/50 text-primary hover:bg-primary/10 rounded-md transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
            {/* Overlay to match theme */}
            <div className="absolute inset-0 bg-background/20 pointer-events-none" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
