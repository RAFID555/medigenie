
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropletIcon, Utensils, Moon, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const HealthTracker = () => {
  const [activeTab, setActiveTab] = useState("water");
  const [waterIntake, setWaterIntake] = useState(0);
  const [proteinIntake, setProteinIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const {
    toast
  } = useToast();
  const waterGoal = 8; // 8 glasses per day
  const proteinGoal = 60; // 60g per day
  const sleepGoal = 8; // 8 hours per day

  const handleWaterAdd = () => {
    const newIntake = waterIntake + 1;
    setWaterIntake(newIntake);
    if (newIntake >= waterGoal) {
      toast({
        title: "Daily Water Goal Achieved!",
        description: "You've consumed enough water for today."
      });
    }
  };
  const handleProteinAdd = (amount: number) => {
    const newIntake = proteinIntake + amount;
    setProteinIntake(newIntake);
    if (newIntake >= proteinGoal && proteinIntake < proteinGoal) {
      toast({
        title: "Daily Protein Goal Achieved!",
        description: "You've consumed enough protein for today."
      });
    }
  };
  const handleSleepUpdate = (hours: number) => {
    setSleepHours(hours);
    if (hours >= sleepGoal) {
      toast({
        title: "Good Sleep Report!",
        description: "You've had enough sleep."
      });
    } else if (hours < 6) {
      toast({
        variant: "destructive",
        title: "Insufficient Sleep!",
        description: "You need more sleep."
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Health Tracker
        </CardTitle>
        <CardDescription>Track your daily water, protein intake and sleep hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="water" className="flex items-center gap-1">
              <DropletIcon className="h-4 w-4" />
              Water
            </TabsTrigger>
            <TabsTrigger value="protein" className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              Protein
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-1">
              <Moon className="h-4 w-4" />
              Sleep
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="water" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Daily Water Intake</Label>
                <span className="text-sm font-medium">{waterIntake} / {waterGoal} glasses</span>
              </div>
              <Progress value={(waterIntake / waterGoal) * 100} className="h-2" />
            </div>
            <Button 
              onClick={handleWaterAdd} 
              className="w-full mt-2 bg-blue-500 hover:bg-blue-600"
              variant="default"
            >
              <DropletIcon className="h-4 w-4 mr-2" />
              Add one glass
            </Button>
          </TabsContent>
          
          <TabsContent value="protein" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Daily Protein Intake</Label>
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
                <Label>Last Night's Sleep</Label>
                <span className="text-sm font-medium">{sleepHours} / {sleepGoal} hours</span>
              </div>
              <Progress value={(sleepHours / sleepGoal) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep-hours">Hours slept</Label>
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
      </CardContent>
    </Card>
  );
};

export default HealthTracker;
