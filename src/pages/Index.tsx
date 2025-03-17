
import { useState } from "react";
import Layout from "@/components/Layout";
import NearestHospital from "@/components/NearestHospital";
import RepresentativeHelp from "@/components/RepresentativeHelp";
import AppointmentPayment from "@/components/AppointmentPayment";
import MedicalFacilityFinder from "@/components/MedicalFacilityFinder";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <Layout>
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
