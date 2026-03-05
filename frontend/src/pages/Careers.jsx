import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Careers = () => {
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
              Opportunities
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient">Careers</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              If you have a background in Robotics/Mechatronics/Computer Science/Electronics/Mechanical Engineering and if you are interested to join a very agile startup with a strong sense of adventure and intent to build products for armed forces, we encourage you to send your resume. Please note that all roles involve extensive travel at short notice to remote locations in the country for field tests and trials.
            </p>
          </motion.div>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-10"
            >
              <div className="bg-card/50 border border-border/50 p-8 rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <GraduationCap size={24} />
                  </div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                    Internships
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  For students in final year of Engineering (Mechatronics/Robotics/Electronics/Computer Science/Mechanical), we offer internships for 6 months. Internships are on site at our office in Kakinada. Students seeking internships will be given tasks to evaluate their skills and aptitude as per requirements before we make an offer.
                </p>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-border p-8 lg:p-10 rounded-lg shadow-glow"
            >
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name *</Label>
                  <Input id="full-name" placeholder="" className="bg-background/50 border-border/50 focus:border-primary transition-colors" required />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email Address *</Label>
                    <Input id="email" type="email" placeholder="" className="bg-background/50 border-border/50 focus:border-primary transition-colors" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground">Phone *</Label>
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 border border-border/50 rounded-md bg-background/50">
                        <span className="text-sm">🇮🇳</span>
                      </div>
                      <Input id="phone" type="tel" placeholder="" className="bg-background/50 border-border/50 focus:border-primary transition-colors" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground block">Application For: *</Label>
                  <RadioGroup defaultValue="full-time" className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full-time" id="full-time" />
                      <Label htmlFor="full-time" className="text-sm cursor-pointer">Full-Time Role</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="internship" id="internship" />
                      <Label htmlFor="internship" className="text-sm cursor-pointer">Internship</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground block">Field: *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['Robotics', 'Mechatronics', 'Electronics', 'Software', 'Mechanical', 'Other'].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <RadioGroupItem value={field.toLowerCase()} id={field.toLowerCase()} name="field" />
                        <Label htmlFor={field.toLowerCase()} className="text-sm cursor-pointer">{field}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-xs uppercase tracking-widest text-muted-foreground">Upload Resume *</Label>
                  <p className="text-[10px] text-muted-foreground mb-2">(only .pdf file supported)</p>
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="secondary" size="sm" onClick={() => document.getElementById('resume').click()}>
                      Choose File
                    </Button>
                    <span className="text-sm text-muted-foreground">No file chosen</span>
                    <Input id="resume" type="file" accept=".pdf" className="hidden" required />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-widest py-6 shadow-glow hover:opacity-90 transition-opacity">
                  Submit
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
