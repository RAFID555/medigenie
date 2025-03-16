
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import NearestHospital from "@/components/NearestHospital";
import RepresentativeHelp from "@/components/RepresentativeHelp";
import AppointmentPayment from "@/components/AppointmentPayment";
import MedicalFacilityFinder from "@/components/MedicalFacilityFinder";
import { PhoneCall } from "lucide-react";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <Layout>
      {/* Emergency Helpline Banner */}
      <Card className="p-3 bg-red-100 border-red-300 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PhoneCall className="h-5 w-5 text-red-600" />
          <p className="font-medium bangla">জরুরী সাহায্য: ৯৯৯</p>
        </div>
        <a 
          href="tel:999" 
          className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-red-700 transition-colors"
        >
          <PhoneCall className="h-3 w-3" />
          <span className="bangla">কল করুন</span>
        </a>
      </Card>
      
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Replace NearestHospital with MedicalFacilityFinder */}
            <MedicalFacilityFinder />
            <AppointmentPayment />
          </div>
          
          <div className="space-y-6">
            <RepresentativeHelp />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
