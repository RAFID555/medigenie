
import { useState, memo, useCallback } from "react";
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

const PrescriptionCard = memo(({
  id,
  title,
  doctor,
  date,
  medicines,
  isSimplified = false
}: PrescriptionCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md", 
      expanded ? "mt-2 mb-4" : "my-2", 
      isSimplified ? "border-l-4 border-l-green-500" : ""
    )}>
      <div className={cn(
        "p-4 rounded-xl",
        isSimplified ? "bg-green-50" : "bg-blue-50"
      )}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-medium text-lg bangla text-slate-950">{title}</h3>
            <p className="text-sm text-muted-foreground bangla">ডাঃ {doctor}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <div className="flex gap-2">
            {isSimplified && (
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 bg-white/80 hover:bg-white" 
                aria-label="Set reminder"
              >
                <Bell className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 bg-white/80 hover:bg-white" 
              onClick={toggleExpanded} 
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 animate-slide-up">
            <div className="space-y-3">
              {medicines.map((medicine, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "p-3 rounded-lg transition-all", 
                    isSimplified ? "bg-green-100/70 hover:bg-green-100" : "bg-white hover:bg-blue-100/30 border"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium bangla">{medicine.name}</h4>
                    {isSimplified && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 gap-1 hover:bg-green-200/50"
                      >
                        <Plus className="h-3 w-3" />
                        <span className="text-xs bangla">অর্ডার</span>
                      </Button>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <p className="bangla">{medicine.dosage}</p>
                    <div className="flex items-center mt-1 gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="bangla">{medicine.timing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {!isSimplified && (
              <div className="mt-4 flex justify-end">
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <FileText className="h-4 w-4" />
                  <span className="bangla">সহজ করুন</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
});

PrescriptionCard.displayName = "PrescriptionCard";

export default PrescriptionCard;
