
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Hospital = {
  name: string;
  address: string;
  distance: string;
  phone?: string;
};

// Simulated hospital data - in a real app, this would come from a database or API
const DUMMY_HOSPITALS: Hospital[] = [
  {
    name: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    address: "শহীদ সাইফুর রহমান সড়ক, ঢাকা ১০০০",
    distance: "1.2 কিমি",
    phone: "02-55165088"
  },
  {
    name: "স্কয়ার হাসপাতাল",
    address: "১৮/এফ বীর উত্তম কাজী নুরুজ্জামান সড়ক, ঢাকা ১২০৫",
    distance: "2.5 কিমি",
    phone: "02-8144400"
  },
  {
    name: "সিটি হাসপাতাল লিমিটেড",
    address: "১/৮, ব্লক-এ, লালমাটিয়া, ঢাকা ১২০৭",
    distance: "3.7 কিমি",
    phone: "02-9004295"
  }
];

const NearestHospital = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);
  const { toast } = useToast();

  const findNearestHospitals = () => {
    setLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("আপনার ব্রাউজারে লোকেশন সাপোর্ট করে না।");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would send these coordinates to a backend API
        // to find actual nearby hospitals
        console.log("User location:", position.coords.latitude, position.coords.longitude);
        
        // For now, just use our simulated data
        setTimeout(() => {
          setNearbyHospitals(DUMMY_HOSPITALS);
          setLoading(false);
          toast({
            title: "লোকেশন পাওয়া গেছে",
            description: "আপনার নিকটবর্তী হাসপাতালগুলো খুঁজে পাওয়া গেছে।",
          });
        }, 1500); // Simulate API delay
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("আপনার লোকেশন অ্যাক্সেস করতে সমস্যা হয়েছে। দয়া করে অনুমতি দিন।");
        setLoading(false);
        toast({
          variant: "destructive",
          title: "লোকেশন পাওয়া যায়নি",
          description: "দয়া করে আপনার লোকেশন অ্যাক্সেস অনুমতি দিন।",
        });
      }
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="bangla">আপনার নিকটবর্তী হাসপাতাল</CardTitle>
        <CardDescription className="bangla">
          আপনার বর্তমান লোকেশন থেকে নিকটবর্তী হাসপাতালগুলো খুঁজুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        {locationError && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md bangla">
            {locationError}
          </div>
        )}

        {nearbyHospitals.length === 0 ? (
          <Button 
            onClick={findNearestHospitals} 
            className="w-full mb-4 gap-2 bangla"
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
                <span>নিকটবর্তী হাসপাতাল খুঁজুন</span>
              </>
            )}
          </Button>
        ) : (
          <>
            <div className="mb-4">
              <Button 
                onClick={findNearestHospitals} 
                variant="outline" 
                size="sm" 
                className="gap-2 bangla"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                <span>আবার খুঁজুন</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              {nearbyHospitals.map((hospital, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-1 bangla">{hospital.name}</h3>
                  <p className="text-muted-foreground mb-2 bangla">{hospital.address}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded bangla">
                      দূরত্ব: {hospital.distance}
                    </span>
                    {hospital.phone && (
                      <a href={`tel:${hospital.phone}`} className="text-sm text-blue-500 hover:underline">
                        {hospital.phone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NearestHospital;
