
import Layout from "@/components/Layout";
import HealthTracker from "@/components/HealthTracker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HealthTrackerPage = () => {
  const [language, setLanguage] = useState("bangla");
  
  return (
    <Layout>
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bangla">
              {language === "english" ? "Health Tracker" : "স্বাস্থ্য ট্র্যাকার"}
            </h1>
            <p className="text-muted-foreground bangla">
              {language === "english" 
                ? "Monitor your daily health activities" 
                : "আপনার দৈনিক স্বাস্থ্য কার্যক্রম পর্যবেক্ষণ করুন"}
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => setLanguage(language === "english" ? "bangla" : "english")}
            className="border-border"
          >
            {language === "english" ? "বাংলা" : "English"}
          </Button>
        </div>
        
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-0">
            <HealthTracker language={language} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HealthTrackerPage;
