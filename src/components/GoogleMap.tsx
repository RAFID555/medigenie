
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Place {
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
}

interface GoogleMapProps {
  places: Place[];
  userLocation?: GeolocationPosition;
  isLoading: boolean;
}

declare global {
  interface Window {
    google?: any;
    initMap?: () => void;
  }
}

const GoogleMap = ({ places, userLocation, isLoading }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Fetch API key
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('proxy-google-maps', {
          method: 'POST',
          body: { getKey: true }
        });
        
        if (error) throw error;
        if (data?.key) {
          setApiKey(data.key);
          console.log("API key retrieved successfully");
        } else {
          console.error("No API key returned");
        }
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  // Load Google Maps script once we have the API key
  useEffect(() => {
    if (!apiKey || window.google || document.getElementById('google-maps-script')) {
      return;
    }
    
    window.initMap = () => {
      setMapLoaded(true);
    };

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up
      window.initMap = undefined;
    };
  }, [apiKey]);

  // Initialize map when script is loaded and we have user location
  useEffect(() => {
    if (!mapLoaded || !userLocation || !mapRef.current) return;

    const { latitude, longitude } = userLocation.coords;
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 14,
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    // Add marker for user's location
    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: newMap,
      title: "Your Location",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });
  }, [mapLoaded, userLocation]);

  // Add place markers when places change
  useEffect(() => {
    if (!map || !places.length) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: any[] = [];

    // Add markers for each place
    places.forEach((place, index) => {
      const marker = new window.google.maps.Marker({
        position: { 
          lat: place.geometry.location.lat, 
          lng: place.geometry.location.lng 
        },
        map,
        title: place.name,
        label: `${index + 1}`,
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0; font-size: 16px;">${place.name}</h3>
            <p style="margin: 4px 0;">${place.vicinity}</p>
            ${place.rating ? `<p style="margin: 4px 0;">Rating: ${place.rating} (${place.user_ratings_total} reviews)</p>` : ''}
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // Adjust map bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      
      // Add user location to bounds
      if (userLocation) {
        bounds.extend({
          lat: userLocation.coords.latitude,
          lng: userLocation.coords.longitude,
        });
      }
      
      // Add all place markers to bounds
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      
      map.fitBounds(bounds);
    }
  }, [map, places, userLocation]);

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden border">
      {(isLoading || !mapLoaded || !apiKey) && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground bangla">
              {!apiKey ? 'API কী লোড হচ্ছে...' : !mapLoaded ? 'মানচিত্র লোড হচ্ছে...' : 'স্থান খুঁজছে...'}
            </p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full min-h-[300px]" />
    </div>
  );
};

export default GoogleMap;
