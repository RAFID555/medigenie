
import React, { useState, memo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Syringe, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import PetCareForm from "./PetCareForm";
import { PetVaccination } from "@/hooks/usePetCareStorage";

interface PetVaccinationsProps {
  vaccinations: PetVaccination[];
  setVaccinations: (vaccinations: PetVaccination[]) => void;
}

const PetVaccinations = memo(({ vaccinations, setVaccinations }: PetVaccinationsProps) => {
  const [showVaccinationForm, setShowVaccinationForm] = useState(false);

  const handleAddVaccination = useCallback((data: Omit<PetVaccination, "id" | "completed">) => {
    const vaccination: PetVaccination = {
      ...data,
      id: Date.now().toString(),
      completed: false
    };
    setVaccinations([...vaccinations, vaccination]);
    setShowVaccinationForm(false);
  }, [vaccinations, setVaccinations]);

  const handleCancelForm = useCallback(() => {
    setShowVaccinationForm(false);
  }, []);

  const toggleVaccinationStatus = useCallback((id: string) => {
    setVaccinations(
      vaccinations.map(vaccination => 
        vaccination.id === id 
          ? { ...vaccination, completed: !vaccination.completed } 
          : vaccination
      )
    );
  }, [vaccinations, setVaccinations]);

  return (
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
              <div key={vaccination.id} className="flex items-center justify-between p-3 border rounded-md bg-card/80 hover:bg-accent/10 transition-colors">
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
          <PetCareForm 
            formType="vaccination"
            onSubmit={handleAddVaccination}
            onCancel={handleCancelForm}
          />
        ) : (
          <Button className="w-full mt-4" onClick={() => setShowVaccinationForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> <span className="bangla">নতুন টিকা যোগ করুন</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
});

PetVaccinations.displayName = "PetVaccinations";

export default PetVaccinations;
