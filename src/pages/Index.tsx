import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Scissors, Crown, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import Layout from "@/components/Layout";
import heroBanner from "@/assets/hero-banner-1.webp";
import embroideryDetail from "@/assets/embroidery-detail.webp";
import shopInterior from "@/assets/shop-interior.webp";
import bridalLehenga from "@/assets/bridal-lehenga.webp";
import silkBlouse from "@/assets/silk-blouse-1.webp";
import traditionalGown from "@/assets/traditional-gown.webp";

const Index = () => {
  const services = [
    {
      icon: <Scissors className="h-8 w-8 text-accent" />,
      title: "Blouse Stitching",
      description: "Perfect fitting blouses with traditional craftsmanship"
    },
    {
      icon: <Crown className="h-8 w-8 text-accent" />,
      title: "Bridal Wear",
      description: "Exquisite wedding attire for your special day"
    },
    {
      icon: <Heart className="h-8 w-8 text-accent" />,
      title: "Alterations",
      description: "Professional alterations to enhance your fit"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-accent" />,
      title: "Embroidery",
      description: "Intricate handwork and traditional embellishments"
    }
  ];

  const featuredWorks = [
    { image: bridalLehenga, caption: "Bridal Lehenga with Gold Zari" },
    { image: silkBlouse, caption: "Traditional Silk Blouse" },
    { image: traditionalGown, caption: "Elegant Traditional Gown" },
    { image: embroideryDetail, caption: "Intricate Embroidery Work" },
    { image: shopInterior, caption: "Our Traditional Workspace" },
    { image: heroBanner, caption: "Premium Traditional Wear" }
  ];

  const testimonials = [
    {
      quote: "The craftsmanship is exceptional! My wedding blouse was perfect in every detail.",
      name: "Priya Sharma",
      location: "Palani"
    },
    {
      quote: "They understand traditional designs so well. Always satisfied with their work.",
      name: "Meera Devi",
      location: "Chhatrapati"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="heading-primary mb-6 fade-in-up">
            Elegant Stitches
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-display italic fade-in-up">
            Tailoring for women with care
          </p>
          <p className="text-lg mb-8 opacity-90 fade-in-up">
            Handcrafted fits, local service — Chhatrapati near Palani
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
            <NavLink to="/work">
              <Button className="btn-primary">
                View Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </NavLink>
            <Button 
              className="btn-whatsapp"
              onClick={() => {
                const message = "Hi! I saw your website and I'm interested in your tailoring services.";
                window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-elegant">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specializing in traditional South Indian women's attire with modern precision
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="card-elegant hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="heading-tertiary mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Featured Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing our finest traditional craftsmanship
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredWorks.map((work, index) => (
              <div key={index} className="card-featured hover-lift overflow-hidden">
                <img
                  src={work.image}
                  alt={work.caption}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="font-medium text-center">{work.caption}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <NavLink to="/work">
              <Button className="btn-accent">
                View All Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-elegant">
                <CardContent className="p-6">
                  <blockquote className="text-lg mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <NavLink to="/testimonials">
              <Button variant="outline">
                Read More Testimonials
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;