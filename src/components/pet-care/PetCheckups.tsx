
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, PawPrint, Plus, X, Check } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface PetCheckup {
  id: string;
  petName: string;
  date: string;
  veterinarian: string;
  notes: string;
}

interface PetCheckupsProps {
  checkups: PetCheckup[];
  setCheckups: (checkups: PetCheckup[]) => void;
}

const PetCheckups = ({ checkups, setCheckups }: PetCheckupsProps) => {
  const [showCheckupForm, setShowCheckupForm] = useState(false);
  const [newCheckup, setNewCheckup] = useState<Omit<PetCheckup, "id">>({
    petName: "",
    date: "",
    veterinarian: "",
    notes: ""
  });

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
  );
};

export default PetCheckups;
