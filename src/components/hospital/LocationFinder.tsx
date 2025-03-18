
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LocationFinderProps {
  loading: boolean;
  locationError: string | null;
  findNearestHospitals: () => void;
}

const LocationFinder = ({ 
  loading, 
  locationError, 
  findNearestHospitals 
}: LocationFinderProps) => {
  return (
    <div className="mb-6">
      <Button 
        onClick={findNearestHospitals}
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="bangla">লোকেশন খুঁজছে...</span>
          </>
        ) : (
          <>
            <MapPin className="mr-2 h-4 w-4" />
            <span className="bangla">আমার নিকটবর্তী হাসপাতাল খুঁজুন</span>
          </>
        )}
      </Button>
      
      {locationError && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2 text-sm bangla">
            {locationError}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LocationFinder;
