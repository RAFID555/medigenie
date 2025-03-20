
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pill, Plus, X, Check } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

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

interface PetMedicationsProps {
  medications: PetMedication[];
  setMedications: (medications: PetMedication[]) => void;
}

const PetMedications = ({ medications, setMedications }: PetMedicationsProps) => {
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [newMedication, setNewMedication] = useState<Omit<PetMedication, "id">>({
    petName: "",
    medicationName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    notes: ""
  });

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
  );
};

export default PetMedications;
