
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
  const { toast } = useToast();

  const waterGoal = 8; // 8 glasses per day
  const proteinGoal = 60; // 60g per day
  const sleepGoal = 8; // 8 hours per day

  const handleWaterAdd = () => {
    const newIntake = waterIntake + 1;
    setWaterIntake(newIntake);
    if (newIntake >= waterGoal) {
      toast({
        title: "দৈনিক পানি লক্ষ্য অর্জিত!",
        description: "আপনি আজকের জন্য পর্যাপ্ত পানি পান করেছেন।",
      });
    }
  };

  const handleProteinAdd = (amount: number) => {
    const newIntake = proteinIntake + amount;
    setProteinIntake(newIntake);
    if (newIntake >= proteinGoal && proteinIntake < proteinGoal) {
      toast({
        title: "দৈনিক প্রোটিন লক্ষ্য অর্জিত!",
        description: "আপনি আজকের জন্য পর্যাপ্ত প্রোটিন গ্রহণ করেছেন।",
      });
    }
  };

  const handleSleepUpdate = (hours: number) => {
    setSleepHours(hours);
    if (hours >= sleepGoal) {
      toast({
        title: "ভালো ঘুমের রিপোর্ট!",
        description: "আপনি পর্যাপ্ত ঘুমিয়েছেন।",
      });
    } else if (hours < 6) {
      toast({
        variant: "destructive",
        title: "অপর্যাপ্ত ঘুম!",
        description: "আপনার আরও ঘুমের প্রয়োজন।",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="bangla">স্বাস্থ্য ট্র্যাকার</CardTitle>
        <CardDescription className="bangla">
          আপনার দৈনিক পানি, প্রোটিন, এবং ঘুম ট্র্যাক করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="water" className="flex items-center gap-2">
              <DropletIcon className="h-4 w-4 text-blue-500" />
              <span className="bangla">পানি</span>
            </TabsTrigger>
            <TabsTrigger value="protein" className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-green-500" />
              <span className="bangla">প্রোটিন</span>
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-purple-500" />
              <span className="bangla">ঘুম</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="water">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">{waterIntake} <span className="text-sm font-normal">/ {waterGoal}</span></p>
                <p className="text-sm text-muted-foreground bangla">গ্লাস পানি</p>
                <Progress value={waterIntake/waterGoal * 100} className="h-2 mt-2" indicatorClassName="bg-blue-500" />
              </div>
              
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={handleWaterAdd} 
                  className="gap-2"
                  variant="outline"
                >
                  <DropletIcon className="h-4 w-4 text-blue-500" />
                  <span className="bangla">১ গ্লাস যোগ করুন</span>
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground mt-4 border-t pt-4">
                <p className="bangla text-center">প্রতিদিন কমপক্ষে ৮ গ্লাস পানি পান করা উচিত। এতে দেহ হাইড্রেটেড থাকে এবং বিভিন্ন স্বাস্থ্য সমস্যা প্রতিরোধে সাহায্য করে।</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="protein">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">{proteinIntake} <span className="text-sm font-normal">/ {proteinGoal}</span></p>
                <p className="text-sm text-muted-foreground bangla">গ্রাম প্রোটিন</p>
                <Progress value={proteinIntake/proteinGoal * 100} className="h-2 mt-2" indicatorClassName="bg-green-500" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <Button 
                  onClick={() => handleProteinAdd(5)} 
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <span className="bangla">৫ গ্রাম</span>
                </Button>
                <Button 
                  onClick={() => handleProteinAdd(10)} 
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <span className="bangla">১০ গ্রাম</span>
                </Button>
                <Button 
                  onClick={() => handleProteinAdd(20)} 
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <span className="bangla">২০ গ্রাম</span>
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground mt-4 border-t pt-4">
                <p className="bangla text-center">প্রতিদিন প্রায় ০.৮ গ্রাম প্রোটিন প্রতি কিলোগ্রাম শারীরিক ওজনের জন্য গ্রহণ করা প্রয়োজন। প্রোটিন পেশী গঠন ও রক্ষণাবেক্ষণে সাহায্য করে।</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sleep">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-500">{sleepHours} <span className="text-sm font-normal">/ {sleepGoal}</span></p>
                <p className="text-sm text-muted-foreground bangla">ঘন্টা ঘুম</p>
                <Progress value={sleepHours/sleepGoal * 100} className="h-2 mt-2" indicatorClassName="bg-purple-500" />
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="sleepHours" className="bangla">গত রাতের ঘুমের সময়</Label>
                <div className="flex gap-2">
                  <Input 
                    id="sleepHours"
                    type="number"
                    min="0"
                    max="24"
                    value={sleepHours || ""}
                    onChange={(e) => handleSleepUpdate(Number(e.target.value))}
                    placeholder="ঘন্টা"
                  />
                  <Button 
                    onClick={() => handleSleepUpdate(sleepHours)} 
                    variant="secondary"
                  >
                    <span className="bangla">আপডেট</span>
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mt-4 border-t pt-4">
                <p className="bangla text-center">প্রাপ্তবয়স্কদের জন্য প্রতিদিন ৭-৮ ঘন্টা ঘুম প্রয়োজন। ভালো ঘুম স্বাস্থ্যকর জীবনযাপনের একটি গুরুত্বপূর্ণ অংশ।</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthTracker;
