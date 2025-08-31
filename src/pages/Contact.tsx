import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, Instagram, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
    preferredTime: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappMessage = `Hi! I'm ${formData.name} from the website contact form.

Phone: ${formData.phone}
Service Interested: ${formData.service}
Preferred Contact Time: ${formData.preferredTime}

Message: ${formData.message}`;

    // Open WhatsApp
    window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    
    // Show success toast
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon via WhatsApp.",
    });
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      service: "",
      message: "",
      preferredTime: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    "Blouse Stitching",
    "Bridal Wear",
    "Lehenga",
    "Traditional Gowns", 
    "Alterations",
    "Embroidery Work",
    "Other"
  ];

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="heading-primary mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us for all your traditional tailoring needs. We're here to help bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-secondary mb-8">Get In Touch</h2>
                
                {/* Primary Contact Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <Button 
                    className="btn-whatsapp h-auto p-6 flex flex-col items-center gap-3"
                    onClick={() => {
                      const message = "Hi! I'm interested in your tailoring services. Could you please provide more information?";
                      window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <MessageCircle className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">WhatsApp Us</div>
                      <div className="text-sm opacity-90">Quick Response</div>
                    </div>
                  </Button>
                  
                  <Button 
                    className="btn-primary h-auto p-6 flex flex-col items-center gap-3"
                    onClick={() => window.location.href = 'tel:+919876543210'}
                  >
                    <Phone className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">Call Us</div>
                      <div className="text-sm opacity-90">+91 98765 43210</div>
                    </div>
                  </Button>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <Card className="card-elegant">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-accent mt-1" />
                        <div>
                          <h3 className="font-medium mb-2">Visit Our Shop</h3>
                          <p className="text-muted-foreground">
                            Elegant Stitches<br />
                            Chhatrapati near Palani<br />
                            Tamil Nadu, India
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={() => {
                              const query = "Chhatrapati near Palani, Tamil Nadu, India";
                              window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
                            }}
                          >
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elegant">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Clock className="h-6 w-6 text-accent mt-1" />
                        <div>
                          <h3 className="font-medium mb-2">Working Hours</h3>
                          <div className="space-y-1 text-muted-foreground">
                            <p><span className="font-medium">Monday - Saturday:</span> 9:00 AM - 7:00 PM</p>
                            <p><span className="font-medium">Sunday:</span> 10:00 AM - 5:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elegant">
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-4">Follow Us</h3>
                      <div className="flex gap-4">
                        <a
                          href="https://instagram.com/elegantstitches"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                        <a
                          href="https://facebook.com/elegantstitches"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="card-featured">
                <CardContent className="p-8">
                  <h2 className="heading-secondary mb-6">Send Us a Message</h2>
                  <p className="text-muted-foreground mb-8">
                    Fill out this form and we'll get back to you via WhatsApp with all the details you need.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service">Service Interested In</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="preferredTime">Preferred Contact Time</Label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      >
                        <option value="">Select preferred time</option>
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                        <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                        <option value="Anytime">Anytime</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us about your requirements, preferred designs, or any questions you have..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <Button type="submit" className="btn-primary w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message via WhatsApp
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      * This form will open WhatsApp with your message pre-filled
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="heading-secondary text-center mb-8">Find Us</h2>
            <Card className="card-elegant overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="heading-tertiary mb-2">Visit Our Shop</h3>
                  <p className="text-muted-foreground mb-4">
                    Chhatrapati near Palani, Tamil Nadu, India
                  </p>
                  <Button
                    onClick={() => {
                      const query = "Chhatrapati near Palani, Tamil Nadu, India";
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
                    }}
                  >
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;