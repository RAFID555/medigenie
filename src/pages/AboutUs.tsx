
import Layout from "@/components/Layout";
import AboutCompany from "@/components/AboutCompany";
import { useState } from "react";

const AboutUs = () => {
  const [language, setLanguage] = useState("bangla");
  
  return (
    <Layout>
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {language === "english" ? "About Us" : "আমাদের সম্পর্কে"}
          </h1>
          <p className="text-muted-foreground">
            {language === "english" 
              ? "Learn more about MediGini and our mission" 
              : "মেডিজিনি এবং আমাদের লক্ষ্য সম্পর্কে আরও জানুন"}
          </p>
        </div>
        
        <AboutCompany language={language} />
      </div>
    </Layout>
  );
};

export default AboutUs;
