import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import founderPortrait from "@/assets/founder-portrait.webp";
import cofounderPortrait from "@/assets/cofounder-portrait.webp";
import shopInterior from "@/assets/shop-interior.webp";
import embroideryDetail from "@/assets/embroidery-detail.webp";

const About = () => {
  const timeline = [
    {
      year: "1998",
      event: "Founded Elegant Stitches with a vision for traditional craftsmanship"
    },
    {
      year: "2005",
      event: "Expanded services to include bridal wear and heavy embroidery"
    },
    {
      year: "2012",
      event: "Became the preferred tailor for local families and wedding preparations"
    },
    {
      year: "2018",
      event: "Introduced modern fitting techniques while preserving traditional methods"
    },
    {
      year: "2024",
      event: "Celebrating 25+ years of serving the community with pride"
    }
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="heading-primary mb-4">About Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A legacy of traditional South Indian tailoring passed down through generations
            </p>
          </div>

          {/* Founders Section */}
          <div className="mb-20">
            <h2 className="heading-secondary text-center mb-12">Meet Our Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Founder */}
              <div className="text-center">
                <div className="relative mb-6">
                  <img
                    src={founderPortrait}
                    alt="Founder of Elegant Stitches"
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-accent shadow-lg"
                  />
                </div>
                <h3 className="heading-tertiary mb-2">Founder</h3>
                <p className="text-muted-foreground">
                  Master tailor with over 25 years of experience in traditional South Indian attire. 
                  Specializes in intricate embroidery and bridal wear.
                </p>
              </div>

              {/* Co-founder */}
              <div className="text-center">
                <div className="relative mb-6">
                  <img
                    src={cofounderPortrait}
                    alt="Co-founder of Elegant Stitches"
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-accent shadow-lg"
                  />
                </div>
                <h3 className="heading-tertiary mb-2">Co-Founder</h3>
                <p className="text-muted-foreground">
                  Expert in fitting and alterations with a keen eye for detail. 
                  Ensures every garment meets the highest standards of quality and comfort.
                </p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-in-up">
                <h2 className="heading-secondary mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Elegant Stitches began as a small tailoring shop in Chhatrapati near Palani with a simple 
                    mission: to preserve and celebrate the rich tradition of South Indian women's clothing. 
                    For over 25 years, we have been dedicated to creating beautiful, perfectly fitted garments 
                    that honor cultural heritage while meeting modern needs.
                  </p>
                  <p>
                    Our women-only environment ensures comfort and privacy for all our customers. We understand 
                    the importance of traditional values and provide a safe, welcoming space where women can 
                    express their style preferences and receive personalized attention.
                  </p>
                  <p>
                    From intricate bridal lehengas to everyday blouses, every piece that leaves our shop 
                    carries the mark of authentic craftsmanship. We take pride in using traditional techniques 
                    passed down through generations, combined with modern precision to ensure the perfect fit.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <img
                  src={shopInterior}
                  alt="Our traditional tailoring workspace"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src={embroideryDetail}
                  alt="Close-up of our embroidery work"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-20">
            <h2 className="heading-secondary text-center mb-12">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-6 items-start fade-in-up">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{item.year}</span>
                      </div>
                    </div>
                    <Card className="flex-1 card-elegant">
                      <CardContent className="p-6">
                        <h3 className="font-display text-lg font-medium mb-2">{item.year}</h3>
                        <p className="text-muted-foreground">{item.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="heading-secondary text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-featured text-center">
                <CardContent className="p-8">
                  <h3 className="heading-tertiary mb-4">Quality Craftsmanship</h3>
                  <p className="text-muted-foreground">
                    Every stitch is placed with precision and care, ensuring durability and beauty 
                    that lasts for years.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-featured text-center">
                <CardContent className="p-8">
                  <h3 className="heading-tertiary mb-4">Cultural Heritage</h3>
                  <p className="text-muted-foreground">
                    We preserve traditional South Indian tailoring techniques while adapting 
                    to contemporary fashion needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-featured text-center">
                <CardContent className="p-8">
                  <h3 className="heading-tertiary mb-4">Personal Touch</h3>
                  <p className="text-muted-foreground">
                    Each garment is tailored to the individual, ensuring a perfect fit and 
                    personal style expression.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Shop Gallery */}
          <div>
            <h2 className="heading-secondary text-center mb-12">Our Workspace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-elegant overflow-hidden hover-lift">
                <img
                  src={shopInterior}
                  alt="Main tailoring workspace"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium">Main Workspace</h4>
                  <p className="text-sm text-muted-foreground">Organized and equipped with modern tools</p>
                </div>
              </div>
              
              <div className="card-elegant overflow-hidden hover-lift">
                <img
                  src={embroideryDetail}
                  alt="Embroidery section"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium">Embroidery Section</h4>
                  <p className="text-sm text-muted-foreground">Dedicated space for intricate handwork</p>
                </div>
              </div>
              
              <div className="card-elegant overflow-hidden hover-lift">
                <img
                  src={founderPortrait}
                  alt="Fitting area"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-medium">Private Fitting Area</h4>
                  <p className="text-sm text-muted-foreground">Comfortable and private space for fittings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;