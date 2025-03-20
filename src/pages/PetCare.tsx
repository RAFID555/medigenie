
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PawPrint, 
  Calendar, 
  Syringe, 
  Pill, 
  Clipboard, 
  Plus,
  X,
  Check
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface PetCheckup {
  id: string;
  petName: string;
  date: string;
  veterinarian: string;
  notes: string;
}

interface PetVaccination {
  id: string;
  petName: string;
  vaccineName: string;
  date: string;
  nextDueDate: string;
  completed: boolean;
}

interface PetMedication {
  id: string;
  petName: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  notes: string;
}

const PetCare = () => {
  const [activeTab, setActiveTab] = useState("checkups");
  const [checkups, setCheckups] = useState<PetCheckup[]>([]);
  const [vaccinations, setVaccinations] = useState<PetVaccination[]>([]);
  const [medications, setMedications] = useState<PetMedication[]>([]);
  
  // Form states
  const [newCheckup, setNewCheckup] = useState<Omit<PetCheckup, "id">>({
    petName: "",
    date: "",
    veterinarian: "",
    notes: ""
  });
  
  const [newVaccination, setNewVaccination] = useState<Omit<PetVaccination, "id" | "completed">>({
    petName: "",
    vaccineName: "",
    date: "",
    nextDueDate: ""
  });
  
  const [newMedication, setNewMedication] = useState<Omit<PetMedication, "id">>({
    petName: "",
    medicationName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    notes: ""
  });
  
  // Show form states
  const [showCheckupForm, setShowCheckupForm] = useState(false);
  const [showVaccinationForm, setShowVaccinationForm] = useState(false);
  const [showMedicationForm, setShowMedicationForm] = useState(false);

  // Handlers for checkups
  const handleAddCheckup = () => {
    if (newCheckup.petName && newCheckup.date) {
      const checkup: PetCheckup = {
        ...newCheckup,
        id: Date.now().toString()
      };
      setCheckups([...checkups, checkup]);
      setNewCheckup({
        petName: "",
        date: "",
        veterinarian: "",
        notes: ""
      });
      setShowCheckupForm(false);
    }
  };

  // Handlers for vaccinations
  const handleAddVaccination = () => {
    if (newVaccination.petName && newVaccination.vaccineName && newVaccination.date) {
      const vaccination: PetVaccination = {
        ...newVaccination,
        id: Date.now().toString(),
        completed: false
      };
      setVaccinations([...vaccinations, vaccination]);
      setNewVaccination({
        petName: "",
        vaccineName: "",
        date: "",
        nextDueDate: ""
      });
      setShowVaccinationForm(false);
    }
  };

  const toggleVaccinationStatus = (id: string) => {
    setVaccinations(
      vaccinations.map(vaccination => 
        vaccination.id === id 
          ? { ...vaccination, completed: !vaccination.completed } 
          : vaccination
      )
    );
  };

  // Handlers for medications
  const handleAddMedication = () => {
    if (newMedication.petName && newMedication.medicationName) {
      const medication: PetMedication = {
        ...newMedication,
        id: Date.now().toString()
      };
      setMedications([...medications, medication]);
      setNewMedication({
        petName: "",
        medicationName: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
        notes: ""
      });
      setShowMedicationForm(false);
    }
  };

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
            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold bangla">
                    পোষা প্রাণীর চেকআপ
                  </CardTitle>
                  <CardDescription className="bangla">
                    আপনার পোষা প্রাণীর ভেটেরিনারি চেকআপের সময়সূচী এবং নোট রাখুন
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {checkups.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {checkups.map((checkup) => (
                      <AccordionItem key={checkup.id} value={checkup.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <PawPrint className="h-4 w-4 text-primary" />
                            <span>{checkup.petName}</span>
                            <span className="text-muted-foreground ml-2">
                              {new Date(checkup.date).toLocaleDateString()}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-6">
                            <div>
                              <span className="font-medium">ভেটেরিনারিয়ান:</span> {checkup.veterinarian || 'অজানা'}
                            </div>
                            {checkup.notes && (
                              <div>
                                <span className="font-medium">নোট:</span> {checkup.notes}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-6 text-muted-foreground bangla">
                    কোন চেকআপ যোগ করা হয়নি
                  </div>
                )}
                
                {showCheckupForm ? (
                  <div className="mt-4 p-4 border rounded-md bg-background">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="petName">পোষা প্রাণীর নাম</Label>
                        <Input 
                          id="petName" 
                          value={newCheckup.petName} 
                          onChange={(e) => setNewCheckup({...newCheckup, petName: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">তারিখ</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={newCheckup.date} 
                          onChange={(e) => setNewCheckup({...newCheckup, date: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="veterinarian">ভেটেরিনারিয়ান</Label>
                        <Input 
                          id="veterinarian" 
                          value={newCheckup.veterinarian} 
                          onChange={(e) => setNewCheckup({...newCheckup, veterinarian: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">নোট</Label>
                        <Input 
                          id="notes" 
                          value={newCheckup.notes} 
                          onChange={(e) => setNewCheckup({...newCheckup, notes: e.target.value})}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => setShowCheckupForm(false)}>
                          <X className="mr-2 h-4 w-4" /> বাতিল
                        </Button>
                        <Button type="button" onClick={handleAddCheckup}>
                          <Check className="mr-2 h-4 w-4" /> সংরক্ষণ
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full mt-4" onClick={() => setShowCheckupForm(true)}>
                    <Plus className="mr-2 h-4 w-4" /> নতুন চেকআপ যোগ করুন
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Vaccinations Tab */}
          <TabsContent value="vaccinations" className="space-y-4">
            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Syringe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold bangla">
                    পোষা প্রাণীর টিকা
                  </CardTitle>
                  <CardDescription className="bangla">
                    আপনার পোষা প্রাণীর টিকা এবং সময়সূচী ট্র্যাক করুন
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {vaccinations.length > 0 ? (
                  <div className="space-y-2">
                    {vaccinations.map((vaccination) => (
                      <div key={vaccination.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            id={`vaccination-${vaccination.id}`} 
                            checked={vaccination.completed}
                            onCheckedChange={() => toggleVaccinationStatus(vaccination.id)}
                          />
                          <div className={`${vaccination.completed ? 'line-through text-muted-foreground' : ''}`}>
                            <div className="font-medium">{vaccination.petName} - {vaccination.vaccineName}</div>
                            <div className="text-sm text-muted-foreground">
                              তারিখ: {new Date(vaccination.date).toLocaleDateString()}
                              {vaccination.nextDueDate && ` | পরবর্তী তারিখ: ${new Date(vaccination.nextDueDate).toLocaleDateString()}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground bangla">
                    কোন টিকা যোগ করা হয়নি
                  </div>
                )}
                
                {showVaccinationForm ? (
                  <div className="mt-4 p-4 border rounded-md bg-background">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="petName">পোষা প্রাণীর নাম</Label>
                        <Input 
                          id="petName" 
                          value={newVaccination.petName} 
                          onChange={(e) => setNewVaccination({...newVaccination, petName: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="vaccineName">টিকার নাম</Label>
                        <Input 
                          id="vaccineName" 
                          value={newVaccination.vaccineName} 
                          onChange={(e) => setNewVaccination({...newVaccination, vaccineName: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">তারিখ</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={newVaccination.date} 
                          onChange={(e) => setNewVaccination({...newVaccination, date: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="nextDueDate">পরবর্তী সময়সূচী</Label>
                        <Input 
                          id="nextDueDate" 
                          type="date"
                          value={newVaccination.nextDueDate} 
                          onChange={(e) => setNewVaccination({...newVaccination, nextDueDate: e.target.value})}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => setShowVaccinationForm(false)}>
                          <X className="mr-2 h-4 w-4" /> বাতিল
                        </Button>
                        <Button type="button" onClick={handleAddVaccination}>
                          <Check className="mr-2 h-4 w-4" /> সংরক্ষণ
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full mt-4" onClick={() => setShowVaccinationForm(true)}>
                    <Plus className="mr-2 h-4 w-4" /> নতুন টিকা যোগ করুন
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-4">
            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold bangla">
                    পোষা প্রাণীর ওষুধ
                  </CardTitle>
                  <CardDescription className="bangla">
                    আপনার পোষা প্রাণীর ওষুধের তথ্য এবং সময়সূচী রাখুন
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {medications.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {medications.map((medication) => (
                      <AccordionItem key={medication.id} value={medication.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <Pill className="h-4 w-4 text-primary" />
                            <span>{medication.petName} - {medication.medicationName}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-6">
                            <div>
                              <span className="font-medium">ডোজ:</span> {medication.dosage}
                            </div>
                            <div>
                              <span className="font-medium">ফ্রিকোয়েন্সি:</span> {medication.frequency}
                            </div>
                            {medication.startDate && (
                              <div>
                                <span className="font-medium">শুরুর তারিখ:</span> {new Date(medication.startDate).toLocaleDateString()}
                              </div>
                            )}
                            {medication.endDate && (
                              <div>
                                <span className="font-medium">শেষের তারিখ:</span> {new Date(medication.endDate).toLocaleDateString()}
                              </div>
                            )}
                            {medication.notes && (
                              <div>
                                <span className="font-medium">নোট:</span> {medication.notes}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-6 text-muted-foreground bangla">
                    কোন ওষুধ যোগ করা হয়নি
                  </div>
                )}
                
                {showMedicationForm ? (
                  <div className="mt-4 p-4 border rounded-md bg-background">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="petName">পোষা প্রাণীর নাম</Label>
                        <Input 
                          id="petName" 
                          value={newMedication.petName} 
                          onChange={(e) => setNewMedication({...newMedication, petName: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="medicationName">ওষুধের নাম</Label>
                        <Input 
                          id="medicationName" 
                          value={newMedication.medicationName} 
                          onChange={(e) => setNewMedication({...newMedication, medicationName: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dosage">ডোজ</Label>
                        <Input 
                          id="dosage" 
                          value={newMedication.dosage} 
                          onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="frequency">ফ্রিকোয়েন্সি</Label>
                        <Input 
                          id="frequency" 
                          value={newMedication.frequency} 
                          onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="startDate">শুরুর তারিখ</Label>
                        <Input 
                          id="startDate" 
                          type="date"
                          value={newMedication.startDate} 
                          onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endDate">শেষের তারিখ</Label>
                        <Input 
                          id="endDate" 
                          type="date"
                          value={newMedication.endDate} 
                          onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">নোট</Label>
                        <Input 
                          id="notes" 
                          value={newMedication.notes} 
                          onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => setShowMedicationForm(false)}>
                          <X className="mr-2 h-4 w-4" /> বাতিল
                        </Button>
                        <Button type="button" onClick={handleAddMedication}>
                          <Check className="mr-2 h-4 w-4" /> সংরক্ষণ
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full mt-4" onClick={() => setShowMedicationForm(true)}>
                    <Plus className="mr-2 h-4 w-4" /> নতুন ওষুধ যোগ করুন
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PetCare;
