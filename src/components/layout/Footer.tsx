
import { Link } from "react-router-dom";
import { Book, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-16 pb-8 text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Book className="h-6 w-6 text-primary" />
              <span className="text-xl font-display font-medium">NovelJourney</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Discover a world of books at NovelJourney. We offer a carefully curated collection of 
              fiction, non-fiction, and everything in between.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/shop">Shop</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/faq">FAQs</FooterLink>
            </nav>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Categories</h3>
            <nav className="flex flex-col gap-2">
              <FooterLink to="/category/fiction">Fiction</FooterLink>
              <FooterLink to="/category/non-fiction">Non-Fiction</FooterLink>
              <FooterLink to="/category/mystery">Mystery</FooterLink>
              <FooterLink to="/category/science-fiction">Science Fiction</FooterLink>
              <FooterLink to="/category/fantasy">Fantasy</FooterLink>
              <FooterLink to="/category/biography">Biography</FooterLink>
            </nav>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Newsletter</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter to get updates on new arrivals and special offers.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email address"
                type="email"
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
            <div className="space-y-2 pt-4">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Book Street, Literary Lane, NY 10001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  (123) 456-7890
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  hello@noveljourney.com
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} NovelJourney. All rights reserved.
            </p>
            <div className="flex gap-6">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/shipping">Shipping & Returns</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    {children}
  </Link>
);

export default Footer;
