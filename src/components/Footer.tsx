import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">Elegant Stitches</p>
                  <p className="text-sm opacity-90">Chhatrapati near Palani</p>
                  <p className="text-sm opacity-90">Tamil Nadu, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">+91 98765 43210</p>
                  <p className="text-sm opacity-90">Call or WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Working Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">Monday - Saturday</p>
                  <p className="text-sm opacity-90">9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="ml-8">
                <p className="font-medium">Sunday</p>
                <p className="text-sm opacity-90">10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Social & Services */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com/elegantstitches"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent rounded-full hover:bg-accent/80 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/elegantstitches"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent rounded-full hover:bg-accent/80 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div>
              <h4 className="font-medium mb-2">Our Services</h4>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• Blouse Stitching</li>
                <li>• Bridal Wear</li>
                <li>• Alterations</li>
                <li>• Embroidery Work</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm opacity-90">
            © 2024 Elegant Stitches. All rights reserved. | 
            <span className="ml-1 font-medium">Elegance in Every Stitch</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;