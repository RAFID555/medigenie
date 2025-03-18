import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropletIcon, Utensils, Moon, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HealthTrackerProps {
  language?: string;
}

const HealthTracker = ({ language = "bangla" }: HealthTrackerProps) => {
  const [activeTab, setActiveTab] = useState("water");
  const [waterIntake, setWaterIntake] = useState(0);
  const [proteinIntake, setProteinIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const { toast } = useToast();
  const waterGoal = 8; // 8 glasses per day
  const proteinGoal = 60; // 60g per day
  const sleepGoal = 8; // 8 hours per day
  
  const isEnglish = language === "english";

  const handleWaterAdd = () => {
    const newIntake = waterIntake + 1;
    setWaterIntake(newIntake);
    if (newIntake >= waterGoal) {
      toast({
        title: isEnglish ? "Daily Water Goal Achieved!" : "দৈনিক পানির লক্ষ্য অর্জিত!",
        description: isEnglish ? "You've consumed enough water for today." : "আপনি আজকের জন্য পর্যাপ্ত পানি পান করেছেন।"
      });
    }
  };
  
  const handleProteinAdd = (amount: number) => {
    const newIntake = proteinIntake + amount;
    setProteinIntake(newIntake);
    if (newIntake >= proteinGoal && proteinIntake < proteinGoal) {
      toast({
        title: isEnglish ? "Daily Protein Goal Achieved!" : "দৈনিক প্রোটিন লক্ষ্য অর্জিত!",
        description: isEnglish ? "You've consumed enough protein for today." : "আপনি আজকের জন্য পর্যাপ্ত প্রোটিন গ্রহণ করেছেন।"
      });
    }
  };
  
  const handleSleepUpdate = (hours: number) => {
    setSleepHours(hours);
    if (hours >= sleepGoal) {
      toast({
        title: isEnglish ? "Good Sleep Report!" : "ভালো ঘুমের রিপোর্ট!",
        description: isEnglish ? "You've had enough sleep." : "আপনি পর্যাপ্ত ঘুমিয়েছেন।"
      });
    } else if (hours < 6) {
      toast({
        variant: "destructive",
        title: isEnglish ? "Insufficient Sleep!" : "অপর্যাপ্ত ঘুম!",
        description: isEnglish ? "You need more sleep." : "আপনার আরও ঘুমের প্রয়োজন।"
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {isEnglish ? "Health Tracker" : "স্বাস্থ্য ট্র্যাকার"}
        </CardTitle>
        <CardDescription>
          {isEnglish 
            ? "Track your daily water, protein intake and sleep hours." 
            : "আপনার দৈনিক পানি, প্রোটিন গ্রহণ এবং ঘুমের ঘন্টা ট্র্যাক করুন।"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="water" className="flex items-center gap-1">
                <DropletIcon className="h-4 w-4" />
                {isEnglish ? "Water" : "পানি"}
              </TabsTrigger>
              <TabsTrigger value="protein" className="flex items-center gap-1">
                <Utensils className="h-4 w-4" />
                {isEnglish ? "Protein" : "প্রোটিন"}
              </TabsTrigger>
              <TabsTrigger value="sleep" className="flex items-center gap-1">
                <Moon className="h-4 w-4" />
                {isEnglish ? "Sleep" : "ঘুম"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="water" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{isEnglish ? "Daily Water Intake" : "দৈনিক পানি গ্রহণ"}</Label>
                  <span className="text-sm font-medium">
                    {waterIntake} / {waterGoal} {isEnglish ? "glasses" : "গ্লাস"}
                  </span>
                </div>
                <Progress value={(waterIntake / waterGoal) * 100} className="h-2" />
              </div>
              <Button 
                onClick={handleWaterAdd} 
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600"
                variant="default"
              >
                <DropletIcon className="h-4 w-4 mr-2" />
                {isEnglish ? "Add one glass" : "এক গ্লাস যোগ করুন"}
              </Button>
            </TabsContent>
            
            <TabsContent value="protein" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{isEnglish ? "Daily Protein Intake" : "দৈনিক প্রোটিন গ্রহণ"}</Label>
                  <span className="text-sm font-medium">{proteinIntake} / {proteinGoal}g</span>
                </div>
                <Progress value={(proteinIntake / proteinGoal) * 100} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  onClick={() => handleProteinAdd(10)} 
                  className="w-full mt-2 bg-green-500 hover:bg-green-600"
                  variant="default"
                >
                  +10g
                </Button>
                <Button 
                  onClick={() => handleProteinAdd(20)} 
                  className="w-full mt-2 bg-green-500 hover:bg-green-600"
                  variant="default"
                >
                  +20g
                </Button>
                <Button 
                  onClick={() => handleProteinAdd(30)} 
                  className="w-full mt-2 bg-green-500 hover:bg-green-600"
                  variant="default"
                >
                  +30g
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="sleep" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{isEnglish ? "Last Night's Sleep" : "গত রাতের ঘুম"}</Label>
                  <span className="text-sm font-medium">
                    {sleepHours} / {sleepGoal} {isEnglish ? "hours" : "ঘন্টা"}
                  </span>
                </div>
                <Progress value={(sleepHours / sleepGoal) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleep-hours">{isEnglish ? "Hours slept" : "ঘুমানো ঘন্টা"}</Label>
                <Input 
                  id="sleep-hours" 
                  type="number" 
                  min="0" 
                  max="24" 
                  step="0.5" 
                  value={sleepHours} 
                  onChange={(e) => handleSleepUpdate(parseFloat(e.target.value) || 0)} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HealthTracker;
