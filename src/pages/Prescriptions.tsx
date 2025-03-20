
import { useState, useCallback, memo } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrescriptionCard from "@/components/PrescriptionCard";
import PrescriptionScanner from "@/components/PrescriptionScanner";
import { Search, FileText, FileCheck } from "lucide-react";

const Prescriptions = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Sample prescription data
  const originalPrescriptions = [{
    id: "1",
    title: "সর্দি-কাশি প্রেসক্রিপশন",
    doctor: "রহমান খালেদ",
    date: "১৮ সেপ্টেম্বর, ২০২৩",
    medicines: [{
      name: "এন্টাসিড প্লাস",
      dosage: "১টা ট্যাবলেট",
      timing: "খাবারের পর, দিনে ৩ বার"
    }, {
      name: "নাপা ৫০০ মিলিগ্রাম",
      dosage: "১টা ট্যাবলেট",
      timing: "প্রয়োজনে, ৬ ঘন্টা অন্তর"
    }]
  }, {
    id: "2",
    title: "জ্বর প্রেসক্রিপশন",
    doctor: "তানিয়া জাহান",
    date: "২২ অক্টোবর, ২০২৩",
    medicines: [{
      name: "নাপা ৫০০ মিলিগ্রাম",
      dosage: "১টা ট্যাবলেট",
      timing: "প্রয়োজনে, ৬ ঘন্টা অন্তর"
    }, {
      name: "সেক্লো ২০ মিলিগ্রাম",
      dosage: "১টা ট্যাবলেট",
      timing: "খাবারের আগে, দিনে ২ বার"
    }]
  }];

  const simplifiedPrescriptions = [{
    id: "3",
    title: "মাথা ব্যথা প্রেসক্রিপশন",
    doctor: "কামরুজ্জামান",
    date: "৫ নভেম্বর, ২০২৩",
    medicines: [{
      name: "মেট্রিক ৫০০ মিলিগ্রাম",
      dosage: "১টা ট্যাবলেট",
      timing: "খাবারের পর, দিনে ৩ বার"
    }, {
      name: "ক্যালসিয়াম প্লাস ভিটামিন ডি",
      dosage: "১টা ট্যাবলেট",
      timing: "সকালে, খাবারের পর"
    }]
  }];

  const filteredOriginalPrescriptions = originalPrescriptions.filter(
    prescription => 
      prescription.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSimplifiedPrescriptions = simplifiedPrescriptions.filter(
    prescription => 
      prescription.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold bangla">আমার প্রেসক্রিপশন</h1>
            <p className="text-muted-foreground bangla">সব ডাক্তারি প্রেসক্রিপশন একসাথে</p>
          </div>
        </div>
        
        <div className="mb-8 transition-all duration-300 hover:shadow-md">
          <PrescriptionScanner />
        </div>
        
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="প্রেসক্রিপশন খুঁজুন..." 
                className="pl-8 w-full bg-background hover:bg-accent/5 focus:bg-background transition-colors"
                value={searchQuery} 
                onChange={handleSearchChange} 
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="gap-2 py-2">
                <FileText className="h-4 w-4" />
                <span className="bangla">সব</span>
              </TabsTrigger>
              <TabsTrigger value="simplified" className="gap-2 py-2">
                <FileCheck className="h-4 w-4" />
                <span className="bangla">সরলীকৃত</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-2 mt-0 animate-fade-in">
              {filteredOriginalPrescriptions.length > 0 ? 
                filteredOriginalPrescriptions.map(prescription => 
                  <PrescriptionCard key={prescription.id} {...prescription} />
                ) : 
                <div className="text-center py-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground bangla">কোন প্রেসক্রিপশন নেই</p>
                </div>
              }
              
              {filteredSimplifiedPrescriptions.length > 0 && 
                filteredSimplifiedPrescriptions.map(prescription => 
                  <PrescriptionCard key={prescription.id} {...prescription} isSimplified />
                )
              }
            </TabsContent>
            
            <TabsContent value="simplified" className="space-y-2 mt-0 animate-fade-in">
              {filteredSimplifiedPrescriptions.length > 0 ? 
                filteredSimplifiedPrescriptions.map(prescription => 
                  <PrescriptionCard key={prescription.id} {...prescription} isSimplified />
                ) : 
                <div className="text-center py-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground bangla">কোন সরলীকৃত প্রেসক্রিপশন নেই</p>
                </div>
              }
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
});

Prescriptions.displayName = "Prescriptions";

export default Prescriptions;
