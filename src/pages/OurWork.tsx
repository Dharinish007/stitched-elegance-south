import { useState, useEffect } from "react";
import { Heart, Filter, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";

const OurWork = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState<any>(null);

  const filters = ["All", "Blouse", "Bridal", "Lehenga", "Gown", "Embroidery", "Alterations"];

  useEffect(() => {
    fetchWorks();
    if (user) {
      fetchUserFavorites();
    }
  }, [user]);

  const fetchWorks = async () => {
    try {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorks(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load works: ' + error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('work_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data?.map(fav => fav.work_id) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const filteredWorks = selectedFilter === "All" 
    ? works 
    : works.filter(work => work.category.toLowerCase() === selectedFilter.toLowerCase());

  const toggleFavorite = async (workId: string) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to save favorites',
        variant: 'destructive'
      });
      return;
    }

    try {
      const isFavorited = favorites.includes(workId);
      
      if (isFavorited) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('work_id', workId);

        if (error) throw error;
        setFavorites(prev => prev.filter(id => id !== workId));
        
        toast({
          title: 'Removed from favorites',
          description: 'Work removed from your favorites'
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert([{ user_id: user.id, work_id: workId }]);

        if (error) throw error;
        setFavorites(prev => [...prev, workId]);
        
        toast({
          title: 'Added to favorites',
          description: 'Work added to your favorites'
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading works...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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
          {filteredWorks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No works found for the selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorks.map((work) => (
                <div 
                  key={work.id} 
                  className="card-elegant hover-lift overflow-hidden group relative"
                >
                  <div className="relative">
                    <img
                      src={work.image_url}
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
                      <span className="text-sm text-muted-foreground">
                        {work.featured && "⭐ Featured"}
                      </span>
                    </div>
                    <h3 className="font-display font-medium mb-2">{work.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{work.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Work Detail Modal */}
          {selectedWork && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                  <img
                    src={selectedWork.image_url}
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
                      <h4 className="font-medium">Category</h4>
                      <p className="text-sm text-muted-foreground">{selectedWork.category}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Featured</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedWork.featured ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Added</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedWork.created_at).toLocaleDateString()}
                      </p>
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