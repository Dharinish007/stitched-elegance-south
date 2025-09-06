import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, MessageCircle, Mail } from "lucide-react";
import Layout from "@/components/Layout";

const Contact = () => {
  const handleWhatsApp = () => {
    const message = "Hi Sri Tailor, I'd like to know about your designs";
    window.open(`https://wa.me/+919750692529?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+919750692529', '_self');
  };

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-primary mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with Sri Tailor for all your women's tailoring needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">📞 97506 92529</p>
                  <p className="text-muted-foreground mb-4">Call us for consultations and appointments</p>
                  <Button onClick={handleCall} className="btn-primary">
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Chat with us directly on WhatsApp for quick responses
                  </p>
                  <Button onClick={handleWhatsApp} className="btn-whatsapp">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Us
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2">Sri Tailor</p>
                  <p className="text-muted-foreground mb-4">
                    Nalvaladi Complex, Main Road<br />
                    Chatrappatti, Dindigul<br />
                    Tamil Nadu, India
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const address = "Nalvaladi Complex, Main Road, Chatrappatti, Dindigul, Tamil Nadu, India";
                      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                      window.open(url, '_blank');
                    }}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    Shop Timings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Saturday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium text-red-500">Closed</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * We recommend calling ahead for fittings and consultations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-6">
              {/* Google Maps Embed */}
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Find Us</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9234567890123!2d77.9876543210987!3d10.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNalvaladi%20Complex%2C%20Chatrappatti%2C%20Dindigul!5e0!3m2!1sen!2sin!4v1234567890123"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Sri Tailor Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Why Choose Sri Tailor?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium">Expert Craftsmanship</h4>
                        <p className="text-sm text-muted-foreground">
                          Years of experience in women's tailoring
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium">Perfect Fitting</h4>
                        <p className="text-sm text-muted-foreground">
                          Custom measurements for the perfect fit
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium">Quality Materials</h4>
                        <p className="text-sm text-muted-foreground">
                          We work with the finest fabrics and threads
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium">Timely Delivery</h4>
                        <p className="text-sm text-muted-foreground">
                          We respect your time and deliver on schedule
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Overview */}
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Our Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <h4 className="font-medium text-primary">Blouses</h4>
                      <p className="text-sm text-muted-foreground">Traditional & Modern</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <h4 className="font-medium text-primary">Embroidery</h4>
                      <p className="text-sm text-muted-foreground">Hand & Machine Work</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <h4 className="font-medium text-primary">Gowns</h4>
                      <p className="text-sm text-muted-foreground">Party & Casual</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/30 rounded-lg">
                      <h4 className="font-medium text-primary">Suits</h4>
                      <p className="text-sm text-muted-foreground">Salwar & Churidar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 p-8 bg-gradient-elegant rounded-xl">
            <h2 className="heading-secondary mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us today to discuss your tailoring needs and schedule a consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleWhatsApp} className="btn-whatsapp">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Now
              </Button>
              <Button onClick={handleCall} className="btn-primary">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;