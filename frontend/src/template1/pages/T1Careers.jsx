import { useState } from "react";
import T1Header from "@/template1/sections/T1Header";
import T1Footer from "@/template1/sections/T1Footer";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Send, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    type: "full-time",
    field: "robotics",
    resume: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.resume) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please upload your resume.",
        });
        setIsSubmitting(false);
        return;
      }

      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("type", formData.type);
      data.append("field", formData.field);
      data.append("resume", formData.resume);

      const response = await fetch("http://localhost:3001/api/apply", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Application Sent",
          description: "Your application has been successfully submitted.",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          type: "full-time",
          field: "robotics",
          resume: null,
        });
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <T1Header />
      
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

              <div className="bg-card/50 border border-border/50 p-8 rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                    Full-Time Roles
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We are looking for passionate engineers across multiple disciplines to help us build the next generation of tactical robotics. Currently, we have open positions for <strong>Robotics Engineers</strong>, <strong>Embedded Systems Developers</strong>, and <strong>Mechanical Design Specialists</strong>. Ideal candidates should have strong problem-solving skills and a desire to work on mission-critical technology.
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="text-xs uppercase tracking-widest text-muted-foreground">Full Name *</Label>
                  <Input 
                    id="full-name" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="" 
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                    required 
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="" 
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground">Phone *</Label>
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 border border-border/50 rounded-md bg-background/50">
                        <span className="text-sm">🇮🇳</span>
                      </div>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="" 
                        className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground block">Application For: *</Label>
                  <RadioGroup 
                    value={formData.type}
                    onValueChange={(val) => setFormData({...formData, type: val})}
                    className="flex gap-6"
                  >
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
                  <RadioGroup 
                    value={formData.field}
                    onValueChange={(val) => setFormData({...formData, field: val})}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                  >
                    {['Robotics', 'Mechatronics', 'Electronics', 'Software', 'Mechanical', 'Other'].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <RadioGroupItem value={field.toLowerCase()} id={field.toLowerCase()} />
                        <Label htmlFor={field.toLowerCase()} className="text-sm cursor-pointer">{field}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-xs uppercase tracking-widest text-muted-foreground">Upload Resume *</Label>
                  <p className="text-[10px] text-muted-foreground mb-2">(only .pdf file supported)</p>
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="secondary" size="sm" onClick={() => document.getElementById('resume').click()}>
                      Choose File
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {formData.resume ? formData.resume.name : "No file chosen"}
                    </span>
                    <Input 
                      id="resume" 
                      type="file" 
                      accept=".pdf" 
                      onChange={(e) => setFormData({...formData, resume: e.target.files[0]})}
                      className="hidden" 
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-widest py-6 shadow-glow hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <T1Footer />
    </div>
  );
};

export default Careers;
