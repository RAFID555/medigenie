
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Navigation, Phone, Ambulance, Stethoscope, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

type Hospital = {
  name: string;
  address: string;
  distance: string;
  phone?: string;
};

type BloodBank = {
  name: string;
  address: string;
  phone: string;
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

// Simulated blood bank data
const DUMMY_BLOOD_BANKS: BloodBank[] = [
  {
    name: "বাংলাদেশ রেড ক্রিসেন্ট ব্লাড সেন্টার",
    address: "৭/৫, আউটার সার্কুলার রোড, মোহাম্মদপুর, ঢাকা",
    phone: "02-9116563"
  },
  {
    name: "সংগ্রাম ব্লাড ব্যাংক",
    address: "গ্রীন রোড, ঢাকা",
    phone: "02-8629042"
  },
  {
    name: "কুয়ান্টাম ব্লাড ব্যাংক",
    address: "ধানমন্ডি, ঢাকা",
    phone: "01713-092551"
  }
];

const EMERGENCY_NUMBERS = {
  ambulance: "999",
  police: "999",
  fire: "999"
};

const NearestHospital = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);
  const [emergencyDialogOpen, setEmergencyDialogOpen] = useState<boolean>(false);
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

  const callEmergencyAmbulance = () => {
    window.location.href = `tel:${EMERGENCY_NUMBERS.ambulance}`;
    setEmergencyDialogOpen(false);
    toast({
      title: "অ্যাম্বুলেন্স কল করা হচ্ছে",
      description: "অ্যাম্বুলেন্সের জরুরি নম্বরে কল করা হচ্ছে।",
    });
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

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          {nearbyHospitals.length === 0 ? (
            <Button 
              onClick={findNearestHospitals} 
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
                  <span>নিকটবর্তী হাসপাতাল খুঁজুন</span>
                </>
              )}
            </Button>
          ) : (
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
          )}
          
          {/* Emergency Ambulance Button */}
          <AlertDialog open={emergencyDialogOpen} onOpenChange={setEmergencyDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2 bangla">
                <Ambulance className="h-4 w-4" />
                <span>জরুরী অ্যাম্বুলেন্স</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="bangla">জরুরী অ্যাম্বুলেন্স কল করুন</AlertDialogTitle>
                <AlertDialogDescription className="bangla">
                  আপনি কি নিশ্চিত যে আপনি একটি জরুরী অ্যাম্বুলেন্স পাঠাতে চান?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bangla">বাতিল করুন</AlertDialogCancel>
                <AlertDialogAction onClick={callEmergencyAmbulance} className="bangla">কল করুন</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          {/* Blood Bank Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" className="gap-2 bangla">
                <Heart className="h-4 w-4 text-red-500" />
                <span>ব্লাড ব্যাংক</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="bangla">নিকটবর্তী ব্লাড ব্যাংক</SheetTitle>
                <SheetDescription className="bangla">
                  জরুরী রক্তের প্রয়োজনে নিকটবর্তী ব্লাড ব্যাংকগুলোতে যোগাযোগ করুন
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {DUMMY_BLOOD_BANKS.map((bank, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-1 bangla">{bank.name}</h3>
                    <p className="text-muted-foreground mb-2 bangla">{bank.address}</p>
                    <div className="flex justify-end">
                      <a 
                        href={`tel:${bank.phone}`} 
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{bank.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
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
                  <a 
                    href={`tel:${hospital.phone}`} 
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{hospital.phone}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NearestHospital;
