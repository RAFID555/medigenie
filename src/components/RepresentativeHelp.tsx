
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, Phone, Calendar, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const RepresentativeHelp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredHospital, setPreferredHospital] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, we would send this data to a backend
    console.log("Appointment help request:", { name, phone, preferredDate, preferredHospital });
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      toast({
        title: "অনুরোধ পাঠানো হয়েছে",
        description: "আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
      });
      // Reset form
      setName("");
      setPhone("");
      setPreferredDate("");
      setPreferredHospital("");
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="bangla">সিরিয়াল সহায়তা</CardTitle>
        <CardDescription className="bangla">
          আপনার পছন্দের ডাক্তার বা হাসপাতালে সিরিয়াল নিতে সাহায্য পান
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground bangla mb-4">
          আমাদের প্রতিনিধি আপনাকে সাহায্য করবে পছন্দের ডাক্তার/হাসপাতালে সিরিয়াল নিতে।
          নিচের বাটনে ক্লিক করে অনুরোধ পাঠান।
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full gap-2 bangla">
                <MessageSquare className="h-4 w-4" />
                <span>প্রতিনিধির সাহায্য নিন</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="bangla">সিরিয়াল সহায়তার অনুরোধ</DialogTitle>
                <DialogDescription className="bangla">
                  আপনার তথ্য দিন, আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে।
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="bangla">আপনার নাম</Label>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="নাম লিখুন"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="bangla">মোবাইল নম্বর</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="০১XXXXXXXXX"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate" className="bangla">পছন্দের তারিখ (ঐচ্ছিক)</Label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="preferredDate"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        placeholder="তারিখ লিখুন"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredHospital" className="bangla">পছন্দের হাসপাতাল/ডাক্তার (ঐচ্ছিক)</Label>
                    <Input 
                      id="preferredHospital"
                      value={preferredHospital}
                      onChange={(e) => setPreferredHospital(e.target.value)}
                      placeholder="হাসপাতাল/ডাক্তারের নাম"
                    />
                  </div>
                </div>
                
                <DialogFooter className="mt-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full bangla">
                    {isSubmitting ? "অপেক্ষা করুন..." : "অনুরোধ পাঠান"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="w-full gap-2 bangla">
            <Phone className="h-4 w-4" />
            <span>কল করুন - ০১৭XXXXXXXX</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground justify-center bangla">
        সকাল ৯টা থেকে রাত ৯টা পর্যন্ত সেবা উপলব্ধ
      </CardFooter>
    </Card>
  );
};

export default RepresentativeHelp;
