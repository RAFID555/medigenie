
import { Button } from "@/components/ui/button";
import { Navigation, Loader2, Ambulance, Heart } from "lucide-react";
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
import { DUMMY_BLOOD_BANKS, type Hospital, type BloodBank } from "../NearestHospital";
import { Phone } from "lucide-react";

interface EmergencyActionsProps {
  nearbyHospitals: Hospital[];
  loading: boolean;
  findNearestHospitals: () => void;
  emergencyDialogOpen: boolean;
  setEmergencyDialogOpen: (open: boolean) => void;
  callEmergencyAmbulance: () => void;
}

const EmergencyActions = ({ 
  nearbyHospitals, 
  loading, 
  findNearestHospitals, 
  emergencyDialogOpen, 
  setEmergencyDialogOpen, 
  callEmergencyAmbulance 
}: EmergencyActionsProps) => {
  return (
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
              <Navigation className="h-4 w-4" />
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
  );
};

export default EmergencyActions;
