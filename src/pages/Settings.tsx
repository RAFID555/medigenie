
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ProfileAvatarUpload from "@/components/ProfileAvatarUpload";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Languages,
  Globe,
  Bell,
  Clock,
  Save,
  Settings as SettingsIcon,
  Edit
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();

  const [profileMode, setProfileMode] = useState<"view" | "edit">("view");
  const [settings, setSettings] = useState({
    notifications: true,
    reminderSound: true,
    language: "bangla",
    accent: "dhaka",
    name: "আরিফ হোসেন",
    email: "arif@example.com",
    phone: "০১৭১২৩৪৫৬৭৮",
    address: "ধানমন্ডি, ঢাকা",
    avatar: ""
  });

  // When avatar changes
  const handleAvatarChange = (base64Image: string) => {
    setSettings({
      ...settings,
      avatar: base64Image
    });
  };

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
      title: settings.language === "english" ? "Settings Updated" : "সেটিংস আপডেট হয়েছে",
      description: settings.language === "english"
        ? "Your settings have been saved successfully."
        : "আপনার সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে।"
    });
    setProfileMode("view");
  };

  const getLabel = (banglaText: string, englishText: string) => {
    return settings.language === "english"
      ? englishText
      : <span className="bangla">{banglaText}</span>;
  };

  return (
    <Layout>
      <div className="page-container max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button
              variant={profileMode === "view" ? "default" : "outline"}
              onClick={() => setProfileMode("view")}
              className="gap-2"
            >
              <User className="h-4 w-4" />
              {getLabel("প্রোফাইল দেখুন", "View Profile")}
            </Button>
            <Button
              variant={profileMode === "edit" ? "default" : "outline"}
              onClick={() => setProfileMode("edit")}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              {getLabel("প্রোফাইল সম্পাদনা", "Edit Profile")}
            </Button>
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex justify-center mb-4">
            <ProfileAvatarUpload
              avatarUrl={settings.avatar}
              onAvatarChange={handleAvatarChange}
              disabled={profileMode !== "edit"}
            />
          </div>
          <h2 className="text-lg font-semibold mb-4">
            {getLabel("ব্যক্তিগত তথ্য", "Personal Information")}
          </h2>

          {profileMode === "view" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium bangla">{getLabel("নাম", "Name")}</label>
                  <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="bangla">{settings.name}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium bangla">{getLabel("ইমেইল", "Email")}</label>
                  <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="bangla">{settings.email}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium bangla">{getLabel("ফোন নম্বর", "Phone Number")}</label>
                  <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="bangla">{settings.phone}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium bangla">{getLabel("ঠিকানা", "Address")}</label>
                  <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="bangla">{settings.address}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium bangla">
                    {getLabel("নাম", "Name")}
                  </label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8 bangla"
                      value={settings.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium bangla">
                    {getLabel("ইমেইল", "Email")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8 bangla"
                      value={settings.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium bangla">
                    {getLabel("ফোন নম্বর", "Phone Number")}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8 bangla"
                      value={settings.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium bangla">
                    {getLabel("ঠিকানা", "Address")}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8 bangla"
                      value={settings.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              {getLabel("ভাষা এবং রিজিওনাল", "Language and Regional")}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium bangla">
                      {getLabel("ভাষা", "Language")}
                    </p>
                    <p className="text-sm text-muted-foreground bangla">
                      {getLabel("অ্যাপ্লিকেশনের ভাষা নির্বাচন করুন", "Select application language")}
                    </p>
                  </div>
                </div>
                <select
                  className="border rounded-md p-2 bangla"
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
                    <p className="font-medium bangla">
                      {getLabel("আঞ্চলিক উচ্চারণ", "Regional Accent")}
                    </p>
                    <p className="text-sm text-muted-foreground bangla">
                      {getLabel("আঞ্চলিক উচ্চারণ নির্বাচন করুন", "Select regional accent")}
                    </p>
                  </div>
                </div>
                <select
                  className="border rounded-md p-2 bangla"
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
            <h2 className="text-lg font-semibold mb-4">
              {getLabel("নোটিফিকেশন এবং রিমাইন্ডার", "Notifications and Reminders")}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium bangla">
                      {getLabel("নোটিফিকেশন", "Notifications")}
                    </p>
                    <p className="text-sm text-muted-foreground bangla">
                      {getLabel("ঔষধ খাওয়ার রিমাইন্ডার নোটিফিকেশন", "Medicine reminder notifications")}
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
                    <p className="font-medium bangla">
                      {getLabel("রিমাইন্ডার সাউন্ড", "Reminder Sound")}
                    </p>
                    <p className="text-sm text-muted-foreground bangla">
                      {getLabel("রিমাইন্ডারের জন্য শব্দ", "Sound for reminders")}
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
            {profileMode === "edit" && (
              <Button
                className="gap-2 px-6"
                onClick={handleSave}
              >
                <Save className="h-4 w-4" />
                <span className="bangla">
                  {getLabel("সংরক্ষণ করুন", "Save")}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
