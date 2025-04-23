
import React, { useState, memo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, PawPrint, Plus } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import PetCareForm from "./PetCareForm";
import { PetCheckup } from "@/hooks/usePetCareStorage";

interface PetCheckupsProps {
  checkups: PetCheckup[];
  setCheckups: (checkups: PetCheckup[]) => void;
}

const PetCheckups = memo(({ checkups, setCheckups }: PetCheckupsProps) => {
  const [showCheckupForm, setShowCheckupForm] = useState(false);

  const handleAddCheckup = useCallback((data: Omit<PetCheckup, "id">) => {
    const checkup: PetCheckup = {
      ...data,
      id: Date.now().toString()
    };
    setCheckups([...checkups, checkup]);
    setShowCheckupForm(false);
  }, [checkups, setCheckups]);

  const handleCancelForm = useCallback(() => {
    setShowCheckupForm(false);
  }, []);

  return (
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
          <PetCareForm 
            formType="checkup"
            onSubmit={handleAddCheckup}
            onCancel={handleCancelForm}
          />
        ) : (
          <Button className="w-full mt-4" onClick={() => setShowCheckupForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> <span className="bangla">নতুন চেকআপ যোগ করুন</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
});

PetCheckups.displayName = "PetCheckups";
export default PetCheckups;
