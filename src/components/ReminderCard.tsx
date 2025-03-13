
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, ShoppingBag, AlertCircle } from "lucide-react";

interface ReminderCardProps {
  id: string;
  medicineName: string;
  dosage: string;
  time: string;
  completed?: boolean;
  running?: boolean;
  upcoming?: boolean;
  remainingDays?: number;
}

export const ReminderCard = ({
  id,
  medicineName,
  dosage,
  time,
  completed = false,
  running = false,
  upcoming = false,
  remainingDays = 0,
}: ReminderCardProps) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  
  const statusClass = cn({
    "bg-green-100 border-green-300": isCompleted,
    "bg-blue-100 border-blue-300 animate-pulse-slow": running,
    "bg-secondary border-secondary": upcoming,
    "bg-red-50 border-red-200": remainingDays <= 2 && !isCompleted && !running,
  });
  
  const handleComplete = () => {
    setIsCompleted(true);
  };

  return (
    <Card className={cn(
      "border transition-all duration-300", 
      statusClass
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-200">
                <Check className="h-5 w-5 text-green-700" />
              </div>
            ) : running ? (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-200 ring-4 ring-blue-100 animate-pulse">
                <Bell className="h-5 w-5 text-blue-700" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                <Bell className="h-5 w-5 text-gray-500" />
              </div>
            )}
            
            <div>
              <h3 className="font-medium bangla">{medicineName}</h3>
              <p className="text-sm text-muted-foreground bangla">{dosage}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-semibold">{time}</p>
            {remainingDays > 0 && !isCompleted && (
              <p className="text-xs text-muted-foreground bangla">
                {remainingDays} দিন বাকি
              </p>
            )}
          </div>
        </div>
        
        {!isCompleted && (
          <div className="mt-4 flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
            >
              <ShoppingBag className="h-3 w-3" />
              <span className="text-xs bangla">অর্ডার</span>
            </Button>
            
            <Button 
              variant="secondary"
              size="sm"
              className="gap-1"
              onClick={handleComplete}
            >
              <Check className="h-3 w-3" />
              <span className="text-xs bangla">সম্পন্ন</span>
            </Button>
          </div>
        )}
        
        {remainingDays <= 2 && !isCompleted && !running && (
          <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3 w-3" />
            <span className="bangla">ঔষধ শেষ হয়ে যাচ্ছে!</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ReminderCard;
