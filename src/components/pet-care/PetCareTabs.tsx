
import { useState, useCallback, memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Syringe, Pill } from "lucide-react";
import PetCheckups from "./PetCheckups";
import PetVaccinations from "./PetVaccinations";
import PetMedications from "./PetMedications";
import usePetCareStorage from "@/hooks/usePetCareStorage";

const PetCareTabs = memo(() => {
  const [activeTab, setActiveTab] = useState("checkups");
  const {
    checkups,
    setCheckups,
    vaccinations,
    setVaccinations,
    medications,
    setMedications
  } = usePetCareStorage();

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <div>
      <div className="mb-6 bg-gradient-to-r from-primary/10 to-card/50 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold bangla">পেট কেয়ার</h1>
        <p className="text-muted-foreground bangla">
          আপনার প্রিয় পোষা প্রাণীর যত্ন নিন
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 mb-5 bg-background shadow-md">
          <TabsTrigger value="checkups" className="flex items-center gap-2 py-3">
            <Calendar className="h-4 w-4" />
            <span className="bangla">চেকআপ</span>
          </TabsTrigger>
          <TabsTrigger value="vaccinations" className="flex items-center gap-2 py-3">
            <Syringe className="h-4 w-4" />
            <span className="bangla">টিকা</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2 py-3">
            <Pill className="h-4 w-4" />
            <span className="bangla">ওষুধ</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="transition-all duration-300">
          <TabsContent value="checkups" className="space-y-4 animate-fade-in">
            <PetCheckups checkups={checkups} setCheckups={setCheckups} />
          </TabsContent>
          <TabsContent value="vaccinations" className="space-y-4 animate-fade-in">
            <PetVaccinations vaccinations={vaccinations} setVaccinations={setVaccinations} />
          </TabsContent>
          <TabsContent value="medications" className="space-y-4 animate-fade-in">
            <PetMedications medications={medications} setMedications={setMedications} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
});

PetCareTabs.displayName = "PetCareTabs";
export default PetCareTabs;
