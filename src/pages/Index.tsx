
import { useState } from "react";
import Layout from "@/components/Layout";
import MedicalFacilityFinder from "@/components/MedicalFacilityFinder";
import RepresentativeHelp from "@/components/RepresentativeHelp";
import AppointmentPayment from "@/components/AppointmentPayment";
import HealthTracker from "@/components/HealthTracker";

const Index = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <MedicalFacilityFinder />
            <AppointmentPayment />
          </div>
          
          <div className="space-y-6">
            <RepresentativeHelp />
            <HealthTracker />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
