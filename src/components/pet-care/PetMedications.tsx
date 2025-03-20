
import React, { useState, memo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Plus } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import PetCareForm from "./PetCareForm";
import { PetMedication } from "@/hooks/usePetCareStorage";

interface PetMedicationsProps {
  medications: PetMedication[];
  setMedications: (medications: PetMedication[]) => void;
}

const PetMedications = memo(({ medications, setMedications }: PetMedicationsProps) => {
  const [showMedicationForm, setShowMedicationForm] = useState(false);

  const handleAddMedication = useCallback((data: Omit<PetMedication, "id">) => {
    const medication: PetMedication = {
      ...data,
      id: Date.now().toString()
    };
    setMedications([...medications, medication]);
    setShowMedicationForm(false);
  }, [medications, setMedications]);

  const handleCancelForm = useCallback(() => {
    setShowMedicationForm(false);
  }, []);

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
          <PetCareForm 
            formType="medication"
            onSubmit={handleAddMedication}
            onCancel={handleCancelForm}
          />
        ) : (
          <Button className="w-full mt-4" onClick={() => setShowMedicationForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> <span className="bangla">নতুন ওষুধ যোগ করুন</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
});

PetMedications.displayName = "PetMedications";

export default PetMedications;
