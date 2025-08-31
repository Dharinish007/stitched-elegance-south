import { Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileContactBar = () => {
  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    const message = "Hi! I'm interested in your tailoring services.";
    const whatsappUrl = `https://wa.me/+919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDirections = () => {
    const query = "Chhatrapati near Palani, Tamil Nadu, India";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
      <div className="grid grid-cols-3 gap-1 p-2">
        <Button
          variant="ghost"
          onClick={handleCall}
          className="flex flex-col items-center gap-1 h-auto py-3"
        >
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-xs">Call</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleWhatsApp}
          className="flex flex-col items-center gap-1 h-auto py-3"
        >
          <MessageCircle className="h-5 w-5 text-green-600" />
          <span className="text-xs">WhatsApp</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleDirections}
          className="flex flex-col items-center gap-1 h-auto py-3"
        >
          <MapPin className="h-5 w-5 text-accent" />
          <span className="text-xs">Directions</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileContactBar;