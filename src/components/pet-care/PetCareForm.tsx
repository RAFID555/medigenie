
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormType = "checkup" | "vaccination" | "medication";
type PetCareFormProps = {
  formType: FormType;
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

const PetCareForm: React.FC<PetCareFormProps> = ({ formType, onSubmit, onCancel }) => {
  const [form, setForm] = React.useState<any>({
    petName: "",
    date: "",
    veterinarian: "",
    notes: "",
    vaccineName: "",
    nextDueDate: "",
    medicationName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  const resetFields = useCallback(() => {
    setForm({
      petName: "",
      date: "",
      veterinarian: "",
      notes: "",
      vaccineName: "",
      nextDueDate: "",
      medicationName: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: ""
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Extract only needed fields according to formType
      let data: any = {};
      if (formType === "checkup") {
        data = {
          petName: form.petName,
          date: form.date,
          veterinarian: form.veterinarian,
          notes: form.notes
        };
      }
      if (formType === "vaccination") {
        data = {
          petName: form.petName,
          vaccineName: form.vaccineName,
          date: form.date,
          nextDueDate: form.nextDueDate
        };
      }
      if (formType === "medication") {
        data = {
          petName: form.petName,
          medicationName: form.medicationName,
          dosage: form.dosage,
          frequency: form.frequency,
          startDate: form.startDate,
          endDate: form.endDate,
          notes: form.notes
        };
      }
      onSubmit(data);
      resetFields();
    },
    [form, formType, onSubmit, resetFields]
  );

  return (
    <form className="space-y-4 bg-background/90 p-4 rounded-md shadow" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="petName" className="bangla">পোষা প্রাণীর নাম</Label>
        <Input required name="petName" id="petName" value={form.petName} onChange={handleChange} />
      </div>

      {formType === "checkup" && (
        <>
          <div>
            <Label htmlFor="date" className="bangla">তারিখ</Label>
            <Input type="date" required name="date" id="date" value={form.date} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="veterinarian" className="bangla">ভেটেরিনারিয়ান</Label>
            <Input name="veterinarian" id="veterinarian" value={form.veterinarian} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="notes" className="bangla">নোট</Label>
            <Input name="notes" id="notes" value={form.notes} onChange={handleChange} />
          </div>
        </>
      )}

      {formType === "vaccination" && (
        <>
          <div>
            <Label htmlFor="vaccineName" className="bangla">টিকার নাম</Label>
            <Input required name="vaccineName" id="vaccineName" value={form.vaccineName} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="date" className="bangla">টিকা তারিখ</Label>
            <Input type="date" required name="date" id="date" value={form.date} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="nextDueDate" className="bangla">পরবর্তী ডিউ তারিখ</Label>
            <Input type="date" name="nextDueDate" id="nextDueDate" value={form.nextDueDate} onChange={handleChange} />
          </div>
        </>
      )}

      {formType === "medication" && (
        <>
          <div>
            <Label htmlFor="medicationName" className="bangla">ওষুধের নাম</Label>
            <Input required name="medicationName" id="medicationName" value={form.medicationName} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="dosage" className="bangla">খাবার মাত্রা (Dosage)</Label>
            <Input name="dosage" id="dosage" value={form.dosage} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="frequency" className="bangla">ফ্রিকোয়েন্সি</Label>
            <Input name="frequency" id="frequency" value={form.frequency} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="startDate" className="bangla">শুরুর তারিখ</Label>
            <Input type="date" name="startDate" id="startDate" value={form.startDate} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="endDate" className="bangla">শেষের তারিখ</Label>
            <Input type="date" name="endDate" id="endDate" value={form.endDate} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="notes" className="bangla">নোট</Label>
            <Input name="notes" id="notes" value={form.notes} onChange={handleChange} />
          </div>
        </>
      )}

      <div className="flex gap-3 justify-between mt-4">
        <Button type="submit" className="w-full bangla">সংরক্ষণ করুন</Button>
        <Button type="button" variant="outline" className="w-full bangla" onClick={onCancel}>বাতিল</Button>
      </div>
    </form>
  );
};
export default PetCareForm;
