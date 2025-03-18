
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Loader2, 
  Navigation, 
  Phone, 
  Ambulance, 
  Stethoscope, 
  Heart,
  Building,
  Map,
  RefreshCcw,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoogleMap from "./GoogleMap";
import { getNearbyPlaces, getDistanceMatrix, rankFacilities } from "@/utils/mapsUtils";
import { supabase } from "@/integrations/supabase/client";

type Facility = {
  place_id: string;
  name: string;
  vicinity: string;
  distance?: string;
  duration?: string;
  distanceValue?: number;
  durationValue?: number;
  rating?: number;
  user_ratings_total?: number;
  phone?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
};

const MedicalFacilityFinder = () => {
  const [activeTab, setActiveTab] = useState("hospitals");
  const [loading, setLoading] = useState<boolean>(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch API key on component mount
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('proxy-google-maps', {
          method: 'POST',
          body: { getKey: true }
        });
        
        if (error) {
          console.error("Error fetching API key:", error);
          throw error;
        }
        
        if (data?.key) {
          console.log("API key retrieved successfully");
          setApiKey(data.key || null);
        } else {
          console.error("No API key returned");
          toast({
            variant: "destructive",
            title: "API কী পাওয়া যায়নি",
            description: "দয়া করে আবার চেষ্টা করুন।",
          });
        }
      } catch (error) {
        console.error("Error fetching API key:", error);
        toast({
          variant: "destructive",
          title: "API কী লোড করতে সমস্যা হয়েছে",
          description: "দয়া করে আবার চেষ্টা করুন।",
        });
      }
    };

    fetchApiKey();
  }, [toast]);

  const getCurrentLocation = () => {
    setLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("আপনার ব্রাউজারে লোকেশন সাপোর্ট করে না।");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Got user location:", position.coords.latitude, position.coords.longitude);
        setUserLocation(position);
        findNearbyFacilities(position, activeTab as 'hospitals' | 'pharmacies' | 'blood_banks');
      },
      (error) => {
        console.error("Geolocation error:", error);
        
        // More specific error messages based on the error code
        if (error.code === 1) {
          setLocationError("লোকেশন অ্যাক্সেস করতে অনুমতি দেওয়া হয়নি। দয়া করে ব্রাউজার সেটিংস থেকে লোকেশন অনুমতি দিন।");
        } else if (error.code === 2) {
          setLocationError("আপনার বর্তমান অবস্থান নির্ধারণ করা যাচ্ছে না। দয়া করে GPS চালু করুন।");
        } else if (error.code === 3) {
          setLocationError("লোকেশন নির্ধারণ করতে সময় শেষ হয়ে গেছে। দয়া করে আবার চেষ্টা করুন।");
        } else {
          setLocationError("আপনার লোকেশন অ্যাক্সেস করতে সমস্যা হয়েছে। দয়া করে অনুমতি দিন।");
        }
        
        setLoading(false);
        toast({
          variant: "destructive",
          title: "লোকেশন পাওয়া যায়নি",
          description: "দয়া করে আপনার লোকেশন অ্যাক্সেস অনুমতি দিন।",
        });
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const findNearbyFacilities = async (
    position: GeolocationPosition, 
    type: 'hospitals' | 'pharmacies' | 'blood_banks'
  ) => {
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "API কী পাওয়া যায়নি",
        description: "দয়া করে আবার চেষ্টা করুন।",
      });
      setLoading(false);
      return;
    }

    setLoading(true);
    setFacilities([]);

    try {
      console.log(`Finding nearby ${type}...`);
      
      // Map our UI types to Google Places API types
      const placeType = type === 'hospitals' 
        ? 'hospital' 
        : type === 'pharmacies' 
          ? 'pharmacy' 
          : 'blood_bank';
      
      // Get nearby places
      const places = await getNearbyPlaces(position, placeType as any, apiKey);
      console.log(`Found ${places.length} places:`, places);
      
      if (places.length === 0) {
        setLoading(false);
        return;
      }
      
      // Process each place to get distance information
      const facilitiesWithDistance = await Promise.all(
        places.map(async (place: any) => {
          try {
            // Get distance matrix info for each place
            const distanceInfo = await getDistanceMatrix(
              position,
              `${place.geometry.location.lat},${place.geometry.location.lng}`,
              apiKey
            );
            
            return {
              ...place,
              distance: distanceInfo.distance,
              duration: distanceInfo.duration,
              // Extract numeric values for sorting
              distanceValue: distanceInfo.distanceValue,
              durationValue: distanceInfo.durationValue,
            };
          } catch (error) {
            console.error(`Error getting distance for ${place.name}:`, error);
            return place;
          }
        })
      );
      
      // Rank facilities based on rating, distance, etc.
      const rankedFacilities = rankFacilities(facilitiesWithDistance);
      console.log("Ranked facilities:", rankedFacilities);
      
      setFacilities(rankedFacilities);
      
      // Speak top result if voice is enabled
      if (isVoiceEnabled && rankedFacilities.length > 0) {
        const topFacility = rankedFacilities[0];
        const message = `নিকটতম ${type === 'hospitals' ? 'হাসপাতাল' : type === 'pharmacies' ? 'ফার্মেসি' : 'ব্লাড ব্যাংক'} হলো ${topFacility.name}, দূরত্ব ${topFacility.distance}, সময় লাগবে ${topFacility.duration}`;
        
        // Use the Web Speech API
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = 'bn-BD'; // Bengali language
        window.speechSynthesis.speak(speech);
      }
      
      toast({
        title: "লোকেশন পাওয়া গেছে",
        description: `আপনার নিকটবর্তী ${type === 'hospitals' ? 'হাসপাতালগুলো' : type === 'pharmacies' ? 'ফার্মেসিগুলো' : 'ব্লাড ব্যাংকগুলো'} খুঁজে পাওয়া গেছে।`,
      });
    } catch (error) {
      console.error("Error finding nearby facilities:", error);
      toast({
        variant: "destructive",
        title: "তথ্য লোড করতে সমস্যা হয়েছে",
        description: "দয়া করে আবার চেষ্টা করুন।",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (userLocation) {
      findNearbyFacilities(
        userLocation, 
        value as 'hospitals' | 'pharmacies' | 'blood_banks'
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="bangla flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          আপনার নিকটবর্তী সেবা
        </CardTitle>
        <CardDescription className="bangla">
          আপনার বর্তমান লোকেশন থেকে নিকটবর্তী হাসপাতাল, ফার্মেসি ও ব্লাড ব্যাংক খুঁজুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        {locationError && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md bangla">
            {locationError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button 
            onClick={getCurrentLocation} 
            className="w-full gap-2 bangla"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>খুঁজছে...</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                <span>আমার কাছাকাছি খুঁজুন</span>
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`gap-2 ${isVoiceEnabled ? 'bg-green-50' : ''}`}
          >
            {isVoiceEnabled ? (
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            ) : null}
            <span className="bangla">ভয়েস গাইড {isVoiceEnabled ? 'চালু' : 'বন্ধ'}</span>
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="hospitals" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="bangla">হাসপাতাল</span>
            </TabsTrigger>
            <TabsTrigger value="pharmacies" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              <span className="bangla">ফার্মেসি</span>
            </TabsTrigger>
            <TabsTrigger value="blood_banks" className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="bangla">ব্লাড ব্যাংক</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 order-2 md:order-1">
              {facilities.length > 0 ? (
                facilities.map((facility, index) => (
                  <div key={facility.place_id} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-1 bangla">{facility.name}</h3>
                        <p className="text-muted-foreground mb-2 bangla">{facility.vicinity}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          {facility.distance && (
                            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded bangla flex items-center">
                              <Navigation className="h-3 w-3 mr-1" />
                              {facility.distance}
                            </span>
                          )}
                          {facility.duration && (
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded bangla">
                              {facility.duration}
                            </span>
                          )}
                          {facility.rating && (
                            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center">
                              ★ {facility.rating} ({facility.user_ratings_total})
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${facility.geometry.location.lat},${facility.geometry.location.lng}&travelmode=driving`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1 text-sm"
                          >
                            <Map className="h-4 w-4" />
                            <span className="bangla">দিকনির্দেশনা</span>
                          </a>
                          
                          {facility.phone && (
                            <a 
                              href={`tel:${facility.phone}`} 
                              className="flex items-center gap-1 text-primary hover:underline text-sm"
                            >
                              <Phone className="h-4 w-4" />
                              <span>{facility.phone}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : !loading && userLocation ? (
                <div className="text-center py-8 border rounded-lg">
                  <Search className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 bangla">কোন স্থান পাওয়া যায়নি</p>
                  <p className="text-sm text-muted-foreground mt-1 bangla">দয়া করে আবার চেষ্টা করুন</p>
                </div>
              ) : null}
            </div>
            
            <div className="h-[400px] md:h-full order-1 md:order-2">
              <GoogleMap 
                places={facilities} 
                userLocation={userLocation || undefined} 
                isLoading={loading} 
              />
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicalFacilityFinder;
