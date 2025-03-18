
import { Phone } from "lucide-react";
import { type Hospital } from "../NearestHospital";

interface HospitalListProps {
  hospitals: Hospital[];
}

const HospitalList = ({ hospitals }: HospitalListProps) => {
  if (hospitals.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {hospitals.map((hospital, index) => (
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
  );
};

export default HospitalList;
