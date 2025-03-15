
import React from "react";
import Layout from "@/components/Layout";
import HealthTrackerComponent from "@/components/HealthTracker";

const HealthTracker = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold bangla mb-6">হেলথ ট্র্যাকার</h1>
        <div className="max-w-3xl mx-auto">
          <HealthTrackerComponent />
        </div>
      </div>
    </Layout>
  );
};

export default HealthTracker;
