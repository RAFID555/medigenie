
import Layout from "@/components/Layout";
import HealthTracker from "@/components/HealthTracker";
import { useState } from "react";

const HealthTrackerPage = () => {
  const [language, setLanguage] = useState("bangla");
  
  return (
    <Layout>
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {language === "english" ? "Health Tracker" : "স্বাস্থ্য ট্র্যাকার"}
          </h1>
          <p className="text-muted-foreground">
            {language === "english" 
              ? "Monitor your daily health activities" 
              : "আপনার দৈনিক স্বাস্থ্য কার্যক্রম পর্যবেক্ষণ করুন"}
          </p>
        </div>
        
        <HealthTracker language={language} />
      </div>
    </Layout>
  );
};

export default HealthTrackerPage;
