
import React from "react";
import Layout from "@/components/Layout";
import AboutCompany from "@/components/AboutCompany";

const AboutUs = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold bangla mb-6">আমাদের সম্পর্কে</h1>
        <div className="max-w-3xl mx-auto">
          <AboutCompany />
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
