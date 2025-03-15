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
        title: "দৈনিক পানি লক্ষ্য অর্জিত!",
        description: "আপনি আজকের জন্য পর্যাপ্ত পানি পান করেছেন।"
      });
    }
  };
  const handleProteinAdd = (amount: number) => {
    const newIntake = proteinIntake + amount;
    setProteinIntake(newIntake);
    if (newIntake >= proteinGoal && proteinIntake < proteinGoal) {
      toast({
        title: "দৈনিক প্রোটিন লক্ষ্য অর্জিত!",
        description: "আপনি আজকের জন্য পর্যাপ্ত প্রোটিন গ্রহণ করেছেন।"
      });
    }
  };
  const handleSleepUpdate = (hours: number) => {
    setSleepHours(hours);
    if (hours >= sleepGoal) {
      toast({
        title: "ভালো ঘুমের রিপোর্ট!",
        description: "আপনি পর্যাপ্ত ঘুমিয়েছেন।"
      });
    } else if (hours < 6) {
      toast({
        variant: "destructive",
        title: "অপর্যাপ্ত ঘুম!",
        description: "আপনার আরও ঘুমের প্রয়োজন।"
      });
    }
  };
  return;
};
export default HealthTracker;