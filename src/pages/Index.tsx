
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PrescriptionScanner from "@/components/PrescriptionScanner";
import ReminderCard from "@/components/ReminderCard";
import { FileText, Bell, ShoppingBag, RefreshCw } from "lucide-react";

const Index = () => {
  // Simulate loading state
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Sample reminders data
  const upcomingReminders = [
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
  ];

  return (
    <Layout>
      <div className="page-container">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground bangla">লোড হচ্ছে...</p>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <div className="relative overflow-hidden glass-card p-6 md:p-8 mb-6">
                <div className="relative z-10">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 bangla">
                    আপনার ঔষধ, সহজ ভাষায়
                  </h1>
                  <p className="text-muted-foreground mb-4 max-w-md bangla">
                    ডাক্তারি প্রেসক্রিপশন সহজে বুঝুন, রিমাইন্ডার সেট করুন, এবং ঔষধ অর্ডার করুন।
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="gap-2">
                      <Link to="/prescriptions">
                        <FileText className="h-4 w-4" />
                        <span className="bangla">প্রেসক্রিপশন স্ক্যান</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="gap-2">
                      <Link to="/reminders">
                        <Bell className="h-4 w-4" />
                        <span className="bangla">আমার রিমাইন্ডার</span>
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <PrescriptionScanner />
              </div>
            </section>
        
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold bangla">আসন্ন রিমাইন্ডার</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/reminders">
                    <span className="bangla">সবগুলো দেখুন</span>
                  </Link>
                </Button>
              </div>
              
              {upcomingReminders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingReminders.map((reminder) => (
                    <ReminderCard key={reminder.id} {...reminder} />
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground bangla">কোন রিমাইন্ডার নেই</p>
                </Card>
              )}
            </section>
        
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold bangla">দ্রুত অ্যাকশন</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
                  <Link to="/prescriptions">
                    <FileText className="h-6 w-6" />
                    <span className="bangla">নতুন প্রেসক্রিপশন স্ক্যান</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
                  <Link to="/reminders">
                    <Bell className="h-6 w-6" />
                    <span className="bangla">নতুন রিমাইন্ডার সেট করুন</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
                  <Link to="/order">
                    <ShoppingBag className="h-6 w-6" />
                    <span className="bangla">ঔষধ অর্ডার করুন</span>
                  </Link>
                </Button>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
