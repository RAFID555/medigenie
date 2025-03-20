
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Syringe, Pill } from "lucide-react";
import PetCheckups from "@/components/pet-care/PetCheckups";
import PetVaccinations from "@/components/pet-care/PetVaccinations";
import PetMedications from "@/components/pet-care/PetMedications";
import usePetCareStorage from "@/hooks/usePetCareStorage";

const PetCare = () => {
  const [activeTab, setActiveTab] = useState("checkups");
  const {
    checkups,
    setCheckups,
    vaccinations,
    setVaccinations,
    medications,
    setMedications
  } = usePetCareStorage();

  return (
    <Layout>
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold bangla">পেট কেয়ার</h1>
          <p className="text-muted-foreground bangla">
            আপনার প্রিয় পোষা প্রাণীর যত্ন নিন
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="checkups" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="bangla">চেকআপ</span>
            </TabsTrigger>
            <TabsTrigger value="vaccinations" className="flex items-center gap-2">
              <Syringe className="h-4 w-4" />
              <span className="bangla">টিকা</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              <span className="bangla">ওষুধ</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Checkups Tab */}
          <TabsContent value="checkups" className="space-y-4">
            <PetCheckups checkups={checkups} setCheckups={setCheckups} />
          </TabsContent>
          
          {/* Vaccinations Tab */}
          <TabsContent value="vaccinations" className="space-y-4">
            <PetVaccinations vaccinations={vaccinations} setVaccinations={setVaccinations} />
          </TabsContent>
          
          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-4">
            <PetMedications medications={medications} setMedications={setMedications} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PetCare;
