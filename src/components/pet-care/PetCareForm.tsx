
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormType = 'checkup' | 'vaccination' | 'medication';

// Define the form schema based on the form type
const createFormSchema = (formType: FormType) => {
  const baseSchema = {
    petName: z.string().min(1, "Pet name is required"),
    date: z.string().min(1, "Date is required"),
  };

  if (formType === 'checkup') {
    return z.object({
      ...baseSchema,
      veterinarian: z.string().optional(),
      notes: z.string().optional(),
    });
  } else if (formType === 'vaccination') {
    return z.object({
      ...baseSchema,
      vaccineName: z.string().min(1, "Vaccine name is required"),
      nextDueDate: z.string().optional(),
    });
  } else {
    return z.object({
      ...baseSchema,
      medicationName: z.string().min(1, "Medication name is required"),
      dosage: z.string().optional(),
      frequency: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      notes: z.string().optional(),
    });
  }
};

interface PetCareFormProps {
  formType: FormType;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const PetCareForm = memo(({ formType, onSubmit, onCancel, initialData = {} }: PetCareFormProps) => {
  const formSchema = createFormSchema(formType);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const submitForm = (data: FormValues) => {
    onSubmit(data);
  };

  return (
    <div className="p-4 border rounded-md bg-card shadow-sm mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
          <FormField
            control={form.control}
            name="petName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="bangla">পোষা প্রাণীর নাম</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="মিমি" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="bangla">তারিখ</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {formType === 'checkup' && (
            <>
              <FormField
                control={form.control}
                name="veterinarian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bangla">ভেটেরিনারিয়ান</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ডাঃ আহমেদ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bangla">নোট</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="পরীক্ষা নোট" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {formType === 'vaccination' && (
            <>
              <FormField
                control={form.control}
                name="vaccineName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bangla">টিকার নাম</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="রেবিজ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nextDueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bangla">পরবর্তী তারিখ</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {formType === 'medication' && (
            <>
              <FormField
                control={form.control}
                name="medicationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bangla">ওষুধের নাম</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="দেখুন" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bangla">ডোজ</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="১ টেবলেট" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bangla">ফ্রিকোয়েন্সি</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="দিনে দুইবার" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bangla">শুরুর তারিখ</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bangla">শেষের তারিখ</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bangla">নোট</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="বিশেষ নির্দেশনা" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onCancel} className="w-24">
              <X className="mr-2 h-4 w-4" /> <span className="bangla">বাতিল</span>
            </Button>
            <Button type="submit" className="w-24">
              <Check className="mr-2 h-4 w-4" /> <span className="bangla">সংরক্ষণ</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
});

PetCareForm.displayName = "PetCareForm";

export default PetCareForm;
