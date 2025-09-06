import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import founderPortrait from "@/assets/founder-portrait.webp";
import cofounderPortrait from "@/assets/cofounder-portrait.webp";
import shopInterior from "@/assets/shop-interior.webp";

const About = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="heading-primary mb-6">About Sri Tailor</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Where tradition meets elegance, and every stitch tells a story of craftsmanship passed down through generations.
            </p>
          </div>

          {/* Our Story */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-secondary mb-6">Our Story</h2>
                <div className="space-y-4 text-lg">
                  <p>
                    Established with a passion for creating beautiful women's clothing, Sri Tailor has been serving the community of Chatrappatti and beyond for over 7 years. What started as a dream to bring traditional craftsmanship to modern women has grown into a trusted name in tailoring.
                  </p>
                  <p>
                    Our journey began with a simple belief: every woman deserves clothing that fits perfectly and makes her feel confident. Today, we specialize in blouses, embroidery work, elegant gowns, and traditional suits, all crafted with meticulous attention to detail.
                  </p>
                  <p>
                    At Sri Tailor, we don't just create clothes – we create experiences. Each piece is thoughtfully designed and carefully crafted to celebrate the unique beauty of every woman who walks through our doors.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={shopInterior}
                  alt="Sri Tailor Shop Interior"
                  className="rounded-xl shadow-lg w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </section>

          {/* Meet Our Team */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The creative minds and skilled hands behind Sri Tailor's exceptional craftsmanship
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Founder */}
              <Card className="card-elegant text-center">
                <CardContent className="p-8">
                  <div className="relative inline-block mb-6">
                    <img
                      src={founderPortrait}
                      alt="Revathi - Founder"
                      className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent"></div>
                  </div>
                  <h3 className="heading-tertiary mb-2">Revathi</h3>
                  <p className="text-primary font-medium mb-4">Founder & Master Tailor</p>
                  <p className="text-muted-foreground">
                    With over a decade of experience in women's tailoring, Revathi founded Sri Tailor with a vision to blend traditional techniques with contemporary designs. Her expertise in intricate embroidery work and perfect fitting has made her a trusted name among women in the community.
                  </p>
                </CardContent>
              </Card>

              {/* Co-founder */}
              <Card className="card-elegant text-center">
                <CardContent className="p-8">
                  <div className="relative inline-block mb-6">
                    <img
                      src={cofounderPortrait}
                      alt="Muthu Swamy - Co-founder"
                      className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-transparent"></div>
                  </div>
                  <h3 className="heading-tertiary mb-2">Muthu Swamy</h3>
                  <p className="text-accent font-medium mb-4">Co-founder & Design Specialist</p>
                  <p className="text-muted-foreground">
                    Muthu Swamy brings a unique perspective to traditional tailoring with his eye for modern trends and innovative designs. His expertise in fabric selection and pattern making ensures that every garment not only fits perfectly but also reflects contemporary style.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-4">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-elegant text-center">
                <CardHeader>
                  <CardTitle className="text-primary">Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We never compromise on quality. From selecting the finest fabrics to the final finishing touches, excellence is our standard.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elegant text-center">
                <CardHeader>
                  <CardTitle className="text-primary">Craftsmanship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Traditional techniques combined with modern precision ensure every piece is a work of art that stands the test of time.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elegant text-center">
                <CardHeader>
                  <CardTitle className="text-primary">Customer Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your satisfaction is our priority. We listen, understand, and create clothing that exceeds your expectations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-gradient-elegant rounded-xl p-12">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-4">Why Choose Sri Tailor?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the difference that passion, skill, and dedication make
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">7+</div>
                <h4 className="font-medium mb-2">Years of Experience</h4>
                <p className="text-sm text-muted-foreground">Serving the community with dedication</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <h4 className="font-medium mb-2">Happy Customers</h4>
                <p className="text-sm text-muted-foreground">Women who trust our craftsmanship</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <h4 className="font-medium mb-2">Satisfaction Guaranteed</h4>
                <p className="text-sm text-muted-foreground">Your happiness is our commitment</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <h4 className="font-medium mb-2">WhatsApp Support</h4>
                <p className="text-sm text-muted-foreground">Always here when you need us</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;