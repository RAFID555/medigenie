
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LocationFinder from "./hospital/LocationFinder";
import HospitalList from "./hospital/HospitalList";
import EmergencyActions from "./hospital/EmergencyActions";

// Simulated hospital data - in a real app, this would come from a database or API
const DUMMY_HOSPITALS = [
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

export type Hospital = {
  name: string;
  address: string;
  distance: string;
  phone?: string;
};

export type BloodBank = {
  name: string;
  address: string;
  phone: string;
};

// Simulated blood bank data
export const DUMMY_BLOOD_BANKS = [
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

export const EMERGENCY_NUMBERS = {
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

        <LocationFinder 
          loading={loading}
          locationError={locationError}
          findNearestHospitals={findNearestHospitals}
        />
        
        <EmergencyActions 
          nearbyHospitals={nearbyHospitals}
          loading={loading}
          findNearestHospitals={findNearestHospitals}
          emergencyDialogOpen={emergencyDialogOpen}
          setEmergencyDialogOpen={setEmergencyDialogOpen}
          callEmergencyAmbulance={callEmergencyAmbulance}
        />
            
        <HospitalList hospitals={nearbyHospitals} />
      </CardContent>
    </Card>
  );
};

export default NearestHospital;
