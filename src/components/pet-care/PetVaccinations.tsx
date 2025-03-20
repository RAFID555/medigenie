
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Syringe, Plus, X, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface PetVaccination {
  id: string;
  petName: string;
  vaccineName: string;
  date: string;
  nextDueDate: string;
  completed: boolean;
}

interface PetVaccinationsProps {
  vaccinations: PetVaccination[];
  setVaccinations: (vaccinations: PetVaccination[]) => void;
}

const PetVaccinations = ({ vaccinations, setVaccinations }: PetVaccinationsProps) => {
  const [showVaccinationForm, setShowVaccinationForm] = useState(false);
  const [newVaccination, setNewVaccination] = useState<Omit<PetVaccination, "id" | "completed">>({
    petName: "",
    vaccineName: "",
    date: "",
    nextDueDate: ""
  });

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
  );
};

export default PetVaccinations;
