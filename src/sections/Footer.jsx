import { MapPin, Mail, Phone } from "lucide-react";

const quickLinks = [
  { label: "Products", href: "#products" },
  { label: "Technology", href: "#technology" },
  { label: "About Us", href: "#about" },
  { label: "Careers", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-primary rounded-sm flex items-center justify-center">
                <span className="font-heading font-bold text-sm text-primary-foreground">BR</span>
              </div>
              <span className="font-heading font-bold text-lg text-foreground">BHAIRAV ROBOTICS</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pioneering autonomous robotic systems for defense and industrial applications.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a href="mailto:info@bhairavrobotics.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={14} /> info@bhairavrobotics.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} /> +91 123 456 7890
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {["LinkedIn", "Twitter", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <span className="text-xs font-heading font-semibold">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Bhairav Robotics Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
