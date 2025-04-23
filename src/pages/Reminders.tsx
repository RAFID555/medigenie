import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReminderCard from "@/components/ReminderCard";
import { Plus, Clock, CheckCircle, Bell, Calendar, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { BellOff, BellRing, Vibrate } from "lucide-react";

const Reminders = () => {
  const { toast } = useToast();
  const [notificationsPermission, setNotificationsPermission] = useState<string | null>(null);
  const [missedDays, setMissedDays] = useState<{[key: string]: number}>({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    medicineName: "",
    dosage: "",
    time: "",
    reminderType: "ring" as "ring" | "silent" | "vibration"
  });

  const activeReminders = [
    {
      id: "1",
      medicineName: "নাপা ৫০০ মিলিগ্রাম",
      dosage: "১টা ট্যাবলেট",
      time: "দুপুর ২:০০",
      running: true,
    },
    {
      id: "2",
      medicineName: "মেট্রিক ৫০০ মিলিগ্রাম",
      dosage: "১টা ট্যাবলেট",
      time: "রাত ১০:৩০",
      upcoming: true,
    },
    {
      id: "3",
      medicineName: "সেক্লো ২০ মিলিগ্রাম",
      dosage: "১টা ট্যাবলেট",
      time: "সকাল ৮:০০",
      upcoming: true,
      remainingDays: 2,
    },
  ];
  
  const completedReminders = [
    {
      id: "4",
      medicineName: "নাপা ৫০০ মিলিগ্রাম",
      dosage: "১টা ট্যাবলেট",
      time: "সকাল ৯:০০",
      completed: true,
    },
    {
      id: "5",
      medicineName: "ক্যালসিয়াম প্লাস ভিটামিন ডি",
      dosage: "১টা ট্যাবলেট",
      time: "দুপুর ১:০০",
      completed: true,
    },
  ];
  
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationsPermission(Notification.permission);
    }

    const simulateReminderNotification = setTimeout(() => {
      if (activeReminders.some(r => r.running)) {
        showMedicineNotification(activeReminders[0]);
        
        setTimeout(() => {
          showFollowUpNotification(activeReminders[0]);
        }, 10000);
      }
    }, 5000);

    const checkMissedMedications = () => {
      if (activeReminders.length > 0) {
        const missedMed = {...missedDays};
        missedMed[activeReminders[2].id] = (missedMed[activeReminders[2].id] || 0) + 1;
        setMissedDays(missedMed);
        
        if (missedMed[activeReminders[2].id] >= 1) {
          notifyEmergencyContact(activeReminders[2]);
        }
      }
    };
    
    const missedCheck = setTimeout(checkMissedMedications, 15000);

    return () => {
      clearTimeout(simulateReminderNotification);
      clearTimeout(missedCheck);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationsPermission(permission);
        
        if (permission === "granted") {
          toast({
            title: "নোটিফিকেশন সক্রিয় করা হয়েছে",
            description: "আপনি এখন ঔষধ খাওয়ার রিমাইন্ডার পাবেন",
          });
        } else {
          toast({
            variant: "destructive",
            title: "নোটিফিকেশন অনুমতি দেওয়া হয়নি",
            description: "আপনি রিমাইন্ডার নোটিফিকেশন পাবেন না",
          });
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setForm({ medicineName: "", dosage: "", time: "", reminderType: "ring" });
    toast({
      title: "নতুন রিমাইন্ডার",
      description: "রিমাইন্ডার সফলভাবে যোগ হয়েছে",
    });
  };

  const showMedicineNotification = (reminder: any) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("ঔষধ খাওয়ার সময় হয়েছে", {
        body: `${reminder.medicineName} - ${reminder.dosage} - ${reminder.time}`,
        icon: "/favicon.ico"
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
    
    sonnerToast("ঔষধ খাওয়ার সময় হয়েছে", {
      description: `${reminder.medicineName} - ${reminder.dosage} - ${reminder.time}`,
      action: {
        label: "সম্পন্ন",
        onClick: () => console.log("Reminder marked as complete")
      },
    });
  };
  
  const showFollowUpNotification = (reminder: any) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("⚠️ আপনি কি ঔষধ খেয়েছেন?", {
        body: `${reminder.medicineName} খাওয়ার সময় ১০ মিনিট অতিক্রান্ত হয়েছে। অনুগ্রহ করে ঔষধ খেয়ে নিন।`,
        icon: "/favicon.ico",
        requireInteraction: true
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
    
    sonnerToast.warning("আপনি কি ঔষধ খেয়েছেন?", {
      description: `${reminder.medicineName} খাওয়ার সময় ১০ মিনিট অতিক্রান্ত হয়েছে।`,
      duration: 10000,
      action: {
        label: "সম্পন্ন করুন",
        onClick: () => console.log("Follow-up reminder marked as complete")
      },
    });
  };
  
  const notifyEmergencyContact = (reminder: any) => {
    sonnerToast.error("একদিন ধরে ঔষধ খাওয়া হয়নি!", {
      description: `${reminder.medicineName} ঔষধটি গতকাল খাওয়া হয়নি। নিকটতম ব্যক্তিকে জানানো হচ্ছে।`,
      duration: 0,
      action: {
        label: "কল করুন",
        onClick: () => window.location.href = "tel:+8801712345678"
      },
    });
  };

  const today = activeReminders.filter(r => r.running).map(r => ({
    ...r, reminderType: r.reminderType || "ring"
  }));
  const upcoming = activeReminders.filter(r => r.upcoming).map(r => ({
    ...r, reminderType: r.reminderType || "ring"
  }));
  const completed = completedReminders.map(r => ({
    ...r, reminderType: r.reminderType || "ring"
  }));

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold bangla">ঔষধের রিমাইন্ডার</h1>
            <p className="text-muted-foreground bangla">আপনার সব ঔষধ খাওয়ার রিমাইন্ডার</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {notificationsPermission !== "granted" && (
              <Button 
                variant="outline" 
                onClick={requestNotificationPermission} 
                className="gap-2 whitespace-nowrap"
              >
                <Bell className="h-4 w-4" />
                <span className="bangla">নোটিফিকেশন সক্রিয় করুন</span>
              </Button>
            )}
            <Button className="gap-2 whitespace-nowrap" onClick={() => setShowForm(true)} type="button">
              <Plus className="h-4 w-4" />
              <span className="bangla">নতুন রিমাইন্ডার</span>
            </Button>
          </div>
        </div>

        {showForm && (
          <form className="mb-8 bg-card p-4 rounded-lg shadow space-y-4" onSubmit={handleAddReminder}>
            <div className="flex flex-col gap-3 md:flex-row md:gap-6">
              <div className="flex-1">
                <label className="bangla block mb-1">ঔষধের নাম</label>
                <input required type="text" name="medicineName" className="input input-bordered w-full px-3 py-2 rounded-md border" value={form.medicineName} onChange={handleFormChange} />
              </div>
              <div className="flex-1">
                <label className="bangla block mb-1">ডোজ</label>
                <input required type="text" name="dosage" className="input input-bordered w-full px-3 py-2 rounded-md border" value={form.dosage} onChange={handleFormChange} />
              </div>
              <div className="flex-1">
                <label className="bangla block mb-1">সময়</label>
                <input required type="text" name="time" className="input input-bordered w-full px-3 py-2 rounded-md border" value={form.time} onChange={handleFormChange} />
              </div>
              <div className="flex-1">
                <label className="bangla block mb-1">নোটিফিকেশন টাইপ</label>
                <select name="reminderType" className="input input-bordered w-full px-3 py-2 rounded-md border" value={form.reminderType} onChange={handleFormChange}>
                  <option value="ring">রিং</option>
                  <option value="silent">নীরব</option>
                  <option value="vibration">ভাইব্রেশন</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="bangla flex-1">সংরক্ষণ করুন</Button>
              <Button type="button" variant="outline" className="bangla flex-1" onClick={() => setShowForm(false)}>বাতিল</Button>
            </div>
          </form>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-4 text-center flex flex-col items-center justify-center aspect-video">
            <Clock className="h-8 w-8 text-muted-foreground mb-2" />
            <h2 className="text-2xl font-bold">{activeReminders.length}</h2>
            <p className="text-muted-foreground bangla">সক্রিয় রিমাইন্ডার</p>
          </Card>
          
          <Card className="p-4 text-center flex flex-col items-center justify-center aspect-video">
            <Bell className="h-8 w-8 text-primary mb-2" />
            <h2 className="text-2xl font-bold">{today.length}</h2>
            <p className="text-muted-foreground bangla">আজকের রিমাইন্ডার</p>
          </Card>
          
          <Card className="p-4 text-center flex flex-col items-center justify-center aspect-video">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <h2 className="text-2xl font-bold">{completedReminders.length}</h2>
            <p className="text-muted-foreground bangla">সম্পন্ন রিমাইন্ডার</p>
          </Card>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="bangla">সক্রিয়</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="bangla">সম্পন্ন</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6 mt-0">
            {today.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-medium bangla">আজকের</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {today.map((reminder) => (
                    <ReminderCard key={reminder.id} {...reminder} />
                  ))}
                </div>
              </div>
            )}
            
            {upcoming.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-medium bangla">আসন্ন</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcoming.map((reminder) => (
                    <ReminderCard key={reminder.id} {...reminder} />
                  ))}
                </div>
              </div>
            )}
            
            {activeReminders.length === 0 && (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground bangla">কোন সক্রিয় রিমাইন্ডার নেই</p>
                <Button className="mt-4 gap-2" onClick={() => setShowForm(true)} type="button">
                  <Plus className="h-4 w-4" />
                  <span className="bangla">নতুন রিমাইন্ডার যোগ করুন</span>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4 mt-0">
            {completed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completed.map((reminder) => (
                  <ReminderCard key={reminder.id} {...reminder} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground bangla">কোন সম্পন্ন রিমাইন্ডার নেই</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reminders;
