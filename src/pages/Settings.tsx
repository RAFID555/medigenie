
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Bell,
  Clock,
  Languages,
  Globe,
  Phone,
  MapPin,
  Save,
  User,
  Mail
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    notifications: true,
    reminderSound: true,
    language: "bangla",
    accent: "dhaka",
    name: "আরিফ হোসেন",
    email: "arif@example.com",
    phone: "০১৭১২৩৪৫৬৭৮",
    address: "ধানমন্ডি, ঢাকা"
  });
  
  const handleToggle = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
  };
  
  const handleInputChange = (key: string, value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };
  
  const handleSave = () => {
    toast({
      title: "সেটিংস আপডেট হয়েছে",
      description: "আপনার সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে।"
    });
  };
  
  return (
    <Layout>
      <div className="page-container max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold bangla">সেটিংস</h1>
          <p className="text-muted-foreground bangla">অ্যাপ্লিকেশন পছন্দসমূহ কাস্টমাইজ করুন</p>
        </div>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 bangla">ব্যক্তিগত তথ্য</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium bangla">নাম</label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-8" 
                      value={settings.name} 
                      onChange={(e) => handleInputChange("name", e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium bangla">ইমেইল</label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-8" 
                      value={settings.email} 
                      onChange={(e) => handleInputChange("email", e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium bangla">ফোন নম্বর</label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-8" 
                      value={settings.phone} 
                      onChange={(e) => handleInputChange("phone", e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium bangla">ঠিকানা</label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-8" 
                      value={settings.address} 
                      onChange={(e) => handleInputChange("address", e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 bangla">ভাষা এবং রিজিওনাল</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium bangla">ভাষা</p>
                    <p className="text-sm text-muted-foreground bangla">অ্যাপ্লিকেশনের ভাষা নির্বাচন করুন</p>
                  </div>
                </div>
                <select 
                  className="border rounded-md p-2"
                  value={settings.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                >
                  <option value="bangla">বাংলা</option>
                  <option value="english">English</option>
                </select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium bangla">আঞ্চলিক উচ্চারণ</p>
                    <p className="text-sm text-muted-foreground bangla">আঞ্চলিক উচ্চারণ নির্বাচন করুন</p>
                  </div>
                </div>
                <select 
                  className="border rounded-md p-2"
                  value={settings.accent}
                  onChange={(e) => handleInputChange("accent", e.target.value)}
                >
                  <option value="dhaka">ঢাকা</option>
                  <option value="chittagong">চট্টগ্রাম</option>
                  <option value="sylhet">সিলেট</option>
                  <option value="khulna">খুলনা</option>
                  <option value="rajshahi">রাজশাহী</option>
                </select>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 bangla">নোটিফিকেশন এবং রিমাইন্ডার</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium bangla">নোটিফিকেশন</p>
                    <p className="text-sm text-muted-foreground bangla">
                      ঔষধ খাওয়ার রিমাইন্ডার নোটিফিকেশন
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={settings.notifications}
                  onCheckedChange={() => handleToggle("notifications")}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium bangla">রিমাইন্ডার সাউন্ড</p>
                    <p className="text-sm text-muted-foreground bangla">
                      রিমাইন্ডারের জন্য শব্দ
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={settings.reminderSound}
                  onCheckedChange={() => handleToggle("reminderSound")}
                />
              </div>
            </div>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              className="gap-2 px-6" 
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
              <span className="bangla">সংরক্ষণ করুন</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
