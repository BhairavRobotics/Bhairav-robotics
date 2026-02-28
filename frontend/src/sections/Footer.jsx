import { MapPin, Mail, Phone, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import logo from "../assets/header/brlogo.png";


const quickLinks = [
  { label: "Products", href: "#products" },
  { label: "About Us", href: "#about" },
  { label: "Careers", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/bhairavrobotics/"},
  { name: "LinkedIn", icon: Linkedin, href: "https://www.instagram.com/bhairavrobotics/" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/bhairavrobotics/" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@Bhairavrobotics" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <a href="#" className="flex items-center">
                <div className="h-30 w-40 flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Bhairav Robotics logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </a>
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
                <Mail size={14} /> contact@bhairavrobotics.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} /> +91 8341082589
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>kakinada, Andhra Pradesh, India</span>
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
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon size={18} />
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
