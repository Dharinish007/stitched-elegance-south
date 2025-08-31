import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Palani",
      rating: 5,
      quote: "The craftsmanship is exceptional! My wedding blouse was perfect in every detail. The embroidery work was so intricate and beautiful. I received so many compliments on my wedding day. Highly recommend their services!",
      service: "Bridal Blouse"
    },
    {
      id: 2,
      name: "Meera Devi",
      location: "Chhatrapati",
      rating: 5,
      quote: "They understand traditional designs so well. Always satisfied with their work. The fitting is always perfect and they take time to understand exactly what I want. Been coming here for 5 years now.",
      service: "Regular Blouses"
    },
    {
      id: 3,
      name: "Lakshmi Raman",
      location: "Dindigul",
      rating: 5,
      quote: "Excellent service and beautiful work! They completed my daughter's lehenga for her engagement in record time without compromising on quality. The gold work was stunning and the fit was perfect.",
      service: "Engagement Lehenga"
    },
    {
      id: 4,
      name: "Kavitha Krishnan",
      location: "Madurai",
      rating: 5,
      quote: "Professional and skilled tailors. The women-only environment makes me feel very comfortable. They listen to all my requirements and deliver exactly what I envision. Quality is outstanding.",
      service: "Traditional Gowns"
    },
    {
      id: 5,
      name: "Divya Natarajan",
      location: "Coimbatore",
      rating: 5,
      quote: "Amazing embroidery work! I brought my mother's old saree blouse for alterations and they transformed it beautifully while preserving the traditional elements. Truly skilled craftspeople.",
      service: "Alterations & Embroidery"
    },
    {
      id: 6,
      name: "Sangeetha Vel",
      location: "Pollachi",
      rating: 5,
      quote: "Best tailoring shop in the area! They handle everything from simple alterations to complex bridal wear with equal dedication. The attention to detail is remarkable. My entire family comes here.",
      service: "Various Services"
    },
    {
      id: 7,
      name: "Radha Murugan",
      location: "Palani",
      rating: 5,
      quote: "Quick turnaround and excellent quality. Even for last-minute requests, they manage to deliver beautiful work. The traditional techniques they use result in garments that last for years.",
      service: "Express Orders"
    },
    {
      id: 8,
      name: "Sujatha Ravi",
      location: "Kodaikanal",
      rating: 4,
      quote: "Very satisfied with their work. The fitting is always perfect and they offer good advice on designs. Pricing is reasonable for the quality of work they provide. Will definitely return.",
      service: "Casual Wear"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="heading-primary mb-4">What Our Customers Say</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from our valued customers who trust us with their traditional clothing needs
            </p>
          </div>

          {/* Featured Testimonial Carousel */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto">
              <Card className="card-featured relative overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center">
                    <Quote className="h-12 w-12 text-accent mx-auto mb-6 opacity-50" />
                    
                    <blockquote className="text-xl md:text-2xl font-display italic mb-8 leading-relaxed">
                      "{testimonials[currentIndex].quote}"
                    </blockquote>
                    
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="heading-tertiary">{testimonials[currentIndex].name}</h3>
                      <p className="text-muted-foreground">{testimonials[currentIndex].location}</p>
                      <p className="text-sm text-accent font-medium">
                        Service: {testimonials[currentIndex].service}
                      </p>
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    onClick={prevTestimonial}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={nextTestimonial}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Pagination Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentIndex ? "bg-accent" : "bg-gray-300"
                    }`}
                    onClick={() => goToTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="mb-16">
            <h2 className="heading-secondary text-center mb-12">All Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="card-elegant hover-lift">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                        {testimonial.service}
                      </span>
                    </div>
                    
                    <blockquote className="text-muted-foreground mb-4 line-clamp-4">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-elegant p-12 rounded-lg">
            <h2 className="heading-secondary mb-4">Experience Our Craftsmanship</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our satisfied customers and experience the finest traditional tailoring services. 
              We're committed to making your clothing dreams come true.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-whatsapp"
                onClick={() => {
                  const message = "Hi! I read your testimonials and I'm interested in your tailoring services. Could you please provide more information?";
                  window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                Get Started with WhatsApp
              </Button>
              <Button variant="outline" onClick={() => window.location.href = 'tel:+919876543210'}>
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Testimonials;