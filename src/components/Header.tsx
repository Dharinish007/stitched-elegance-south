import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, MessageCircle, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Our Work", href: "/work" },
    { name: "About Us", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  const handleWhatsApp = () => {
    const message = "Hi! I'm interested in your tailoring services. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/+919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="font-display text-2xl font-bold text-primary">
            Elegant Stitches
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary border-b-2 border-primary" : "text-foreground"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleWhatsApp}
              className="btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <NavLink to="/admin">
              <Button variant="ghost" size="sm">
                <UserCheck className="h-4 w-4" />
              </Button>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium transition-colors ${
                      isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-2 space-y-2">
                <Button
                  onClick={handleWhatsApp}
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
                <NavLink to="/admin" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;