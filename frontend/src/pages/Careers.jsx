import { useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

const Careers = () => {
  const { toast } = useToast();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
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

    if (!WEB3FORMS_ACCESS_KEY) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Email service is not configured. Please contact HR at ravi.sarma@bhairavrobotics.in",
      });
      return;
    }

    if (!formData.resume) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload your resume.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("access_key", WEB3FORMS_ACCESS_KEY);
      data.append("subject", `New Career Application — ${formData.fullName}`);
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("type", formData.type === "full-time" ? "Full-Time Role" : "Internship");
      data.append("field", formData.field.charAt(0).toUpperCase() + formData.field.slice(1));
      data.append("file", formData.resume);
      data.append("botcheck", "");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Submission failed");
      }

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
      if (formRef.current) formRef.current.reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Submission failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      <main className="pb-16 pt-24 sm:pb-20 lg:pt-32">
        {/* Hero Section */}
        <section className="responsive-container mb-12 text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-primary font-heading font-semibold mb-3 block">
              Opportunities
            </span>
            <h1 className="safe-break mb-5 font-heading text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="text-gradient">Careers</span>
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              If you have a background in Robotics/Mechatronics/Computer Science/Electronics/Mechanical Engineering and if you are interested to join a very agile startup with a strong sense of adventure and intent to build products for armed forces, we encourage you to send your resume. Please note that all roles involve extensive travel at short notice to remote locations in the country for field tests and trials.
            </p>
          </motion.div>
        </section>

        <section className="responsive-container mb-16 sm:mb-20">
          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="min-w-0 space-y-6 sm:space-y-10"
            >
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <GraduationCap size={24} />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
                    Internships
                  </h2>
                </div>
                <p className="safe-break text-base leading-relaxed text-muted-foreground sm:text-lg">
                  For students in final year of Engineering (Mechatronics/Robotics/Electronics/Computer Science/Mechanical), we offer internships for 6 months. Internships are on site at our office in Kakinada. Students seeking internships will be given tasks to evaluate their skills and aptitude as per requirements before we make an offer.
                </p>
              </div>

              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
                    Full-Time Roles
                  </h2>
                </div>
                <p className="safe-break text-base leading-relaxed text-muted-foreground sm:text-lg">
                  We are looking for passionate engineers across multiple disciplines to help us build the next generation of tactical robotics. Currently, we have open positions for <strong>Robotics Engineers</strong>, <strong>Embedded Systems Developers</strong>, and <strong>Mechanical Design Specialists</strong>. Ideal candidates should have strong problem-solving skills and a desire to work on mission-critical technology.
                </p>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-glow sm:p-8 lg:p-10"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
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
                    <div className="flex min-w-11 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background/50 px-3">
                      <span className="text-sm">🇮🇳</span>
                    </div>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="" 
                      className="min-w-0 flex-1 bg-background/50 border-border/50 focus:border-primary transition-colors" 
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
                    className="grid gap-3 sm:flex sm:gap-6"
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
                    className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3 sm:gap-4"
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
                  <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:items-center min-[390px]:gap-4">
                    <Button type="button" variant="secondary" size="sm" className="touch-target w-full min-[390px]:w-auto" onClick={() => document.getElementById('resume').click()}>
                      Choose File
                    </Button>
                    <span className="safe-break text-sm text-muted-foreground">
                      {formData.resume ? formData.resume.name : "No file chosen"}
                    </span>
                    <Input 
                      id="resume" 
                      ref={fileInputRef}
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
                  className="touch-target w-full bg-primary py-6 font-heading font-bold uppercase tracking-widest text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
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

      <Footer />
    </div>
  );
};

export default Careers;
