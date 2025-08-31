import { useState } from "react";
import { Heart, Filter, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import bridalLehenga from "@/assets/bridal-lehenga.webp";
import silkBlouse from "@/assets/silk-blouse-1.webp";
import traditionalGown from "@/assets/traditional-gown.webp";
import embroideryDetail from "@/assets/embroidery-detail.webp";
import weddingBlouse from "@/assets/wedding-blouse.webp";
import blouseCollection from "@/assets/blouse-collection.webp";
import handsEmbroidery from "@/assets/hands-embroidery.webp";
import beforeAfterAlteration from "@/assets/before-after-alteration.webp";

const OurWork = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedWork, setSelectedWork] = useState<any>(null);

  const filters = ["All", "Blouse", "Bridal", "Lehenga", "Gown", "Embroidery", "Alterations"];

  const works = [
    {
      id: 1,
      title: "Traditional Bridal Lehenga",
      category: "Bridal",
      image: bridalLehenga,
      description: "Exquisite bridal lehenga with intricate gold zari work and traditional motifs",
      duration: "10-12 days",
      fabric: "Pure Silk",
      technique: "Hand Embroidery"
    },
    {
      id: 2,
      title: "Silk Wedding Blouse",
      category: "Blouse",
      image: weddingBlouse,
      description: "Premium silk blouse with heavy gold embroidery for wedding occasions",
      duration: "7-8 days",
      fabric: "Kanjeevaram Silk",
      technique: "Zari Work"
    },
    {
      id: 3,
      title: "Traditional Gown",
      category: "Gown",
      image: traditionalGown,
      description: "Elegant floor-length gown with traditional South Indian motifs",
      duration: "8-10 days",
      fabric: "Silk Georgette",
      technique: "Thread Work"
    },
    {
      id: 4,
      title: "Embroidery Detail Work",
      category: "Embroidery",
      image: embroideryDetail,
      description: "Close-up showcase of intricate hand embroidery and craftsmanship",
      duration: "5-7 days",
      fabric: "Silk",
      technique: "Hand Embroidery"
    },
    {
      id: 5,
      title: "Premium Silk Blouse",
      category: "Blouse",
      image: silkBlouse,
      description: "Elegant silk blouse with traditional gold thread work",
      duration: "5-6 days",
      fabric: "Pure Silk",
      technique: "Gold Thread"
    },
    {
      id: 6,
      title: "Blouse Collection Display",
      category: "Blouse",
      image: blouseCollection,
      description: "A variety of traditional blouses showcasing different designs and colors",
      duration: "4-6 days each",
      fabric: "Mixed Silk",
      technique: "Various"
    },
    {
      id: 7,
      title: "Embroidery in Progress",
      category: "Embroidery",
      image: handsEmbroidery,
      description: "Skilled hands creating intricate embroidery patterns",
      duration: "Varies",
      fabric: "Silk Base",
      technique: "Hand Work"
    },
    {
      id: 8,
      title: "Before & After Alteration",
      category: "Alterations",
      image: beforeAfterAlteration,
      description: "Professional alteration showcase demonstrating fit improvement",
      duration: "2-3 days",
      fabric: "Customer's",
      technique: "Precision Fitting"
    }
  ];

  const filteredWorks = selectedFilter === "All" 
    ? works 
    : works.filter(work => work.category === selectedFilter);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-primary mb-4">Our Work</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of traditional South Indian tailoring craftsmanship
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter)}
                className="transition-all duration-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                {filter}
              </Button>
            ))}
          </div>

          {/* Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorks.map((work) => (
              <div 
                key={work.id} 
                className="card-elegant hover-lift overflow-hidden group relative"
              >
                <div className="relative">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => setSelectedWork(work)}
                    >
                      <ZoomIn className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(work.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(work.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-gray-600"
                      }`}
                    />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{work.category}</Badge>
                    <span className="text-sm text-muted-foreground">{work.duration}</span>
                  </div>
                  <h3 className="font-display font-medium mb-2">{work.title}</h3>
                  <p className="text-sm text-muted-foreground">{work.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Work Detail Modal */}
          {selectedWork && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/90"
                    onClick={() => setSelectedWork(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{selectedWork.category}</Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleFavorite(selectedWork.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(selectedWork.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </div>
                  <h2 className="heading-tertiary mb-4">{selectedWork.title}</h2>
                  <p className="text-muted-foreground mb-6">{selectedWork.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium">Duration</h4>
                      <p className="text-sm text-muted-foreground">{selectedWork.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Fabric</h4>
                      <p className="text-sm text-muted-foreground">{selectedWork.fabric}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Technique</h4>
                      <p className="text-sm text-muted-foreground">{selectedWork.technique}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Care Instructions</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Dry clean only for best results</li>
                        <li>• Store in a cool, dry place</li>
                        <li>• Handle embroidery with care</li>
                        <li>• Iron on reverse side with low heat</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <Button 
                      className="btn-whatsapp flex-1"
                      onClick={() => {
                        const message = `Hi! I'm interested in getting a ${selectedWork.title} similar to what I saw on your website.`;
                        window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                    >
                      Order Similar
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedWork(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OurWork;