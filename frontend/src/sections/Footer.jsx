import { MapPin, Mail, Phone, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/header/brlogo.png";

const quickLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/bhairavrobotics/"},
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/bhairavrobotics/" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/bhairavrobotics/" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@Bhairavrobotics" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border pt-16 pb-8 transition-colors duration-300">
      <div className="responsive-container">
        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="flex items-center">
                <div className="logo-glow-wrapper relative flex items-center justify-center">
                  <img
                    src={logo}
                    alt="Bhairav Robotics logo"
                    className="h-10 lg:h-12 object-contain relative z-10"
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-body">
              Pioneering autonomous robotic systems, combat unmanned ground vehicles, and precision defense technologies for mission-critical operations.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">
              Contact Us
            </h4>
            <div className="space-y-3 font-body">
              <a href="mailto:contact@bhairavrobotics.com" className="safe-break flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <Mail size={14} className="text-primary shrink-0" /> contact@bhairavrobotics.com
              </a>
              <a href="tel:+918341082589" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} className="text-primary shrink-0" /> +91 8341082589
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 text-primary shrink-0" />
                <span>Kakinada, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <div className="space-y-2 font-body">
              {quickLinks.map((link) => (
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                )
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
                  className="w-10 h-10 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors bg-secondary/30"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 text-center">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 Bhairav Robotics Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
