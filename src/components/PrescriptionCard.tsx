import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Bell, Eye, Plus, Clock } from "lucide-react";
interface PrescriptionCardProps {
  id: string;
  title: string;
  doctor: string;
  date: string;
  medicines: Array<{
    name: string;
    dosage: string;
    timing: string;
  }>;
  isSimplified?: boolean;
}
export const PrescriptionCard = ({
  id,
  title,
  doctor,
  date,
  medicines,
  isSimplified = false
}: PrescriptionCardProps) => {
  const [expanded, setExpanded] = useState(false);
  return <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", expanded ? "mt-2 mb-4" : "my-2", isSimplified ? "border-l-4 border-l-green-500" : "")}>
      <div className="p-4 bg-blue-100 rounded-xl">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-medium text-lg bangla text-slate-950">{title}</h3>
            <p className="text-sm text-muted-foreground bangla">ডাঃ {doctor}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <div className="flex gap-2">
            {isSimplified && <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Set reminder">
                <Bell className="h-4 w-4" />
              </Button>}
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setExpanded(!expanded)} aria-label={expanded ? "Collapse" : "Expand"}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {expanded && <div className="mt-4 animate-slide-up">
            <div className="space-y-3">
              {medicines.map((medicine, index) => <div key={index} className={cn("p-3 rounded-lg", isSimplified ? "bg-secondary" : "bg-muted/50 border")}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium bangla">{medicine.name}</h4>
                    {isSimplified && <Button variant="ghost" size="sm" className="h-7 gap-1">
                        <Plus className="h-3 w-3" />
                        <span className="text-xs bangla">অর্ডার</span>
                      </Button>}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <p className="bangla">{medicine.dosage}</p>
                    <div className="flex items-center mt-1 gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="bangla">{medicine.timing}</span>
                    </div>
                  </div>
                </div>)}
            </div>
            
            {!isSimplified && <div className="mt-4 flex justify-end">
                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="bangla">সহজ করুন</span>
                </Button>
              </div>}
          </div>}
      </div>
    </Card>;
};
export default PrescriptionCard;