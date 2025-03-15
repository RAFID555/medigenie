
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Landmark, Wallet, CreditCardIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppointmentPayment = ({ appointmentFee = 500 }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("bkash");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "পেমেন্ট সম্পন্ন হয়েছে",
        description: "আপনার অ্যাপয়েন্টমেন্ট কনফার্ম করা হয়েছে।",
      });
      // Reset form fields
      setPhoneNumber("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="bangla">ডাক্তার অ্যাপয়েন্টমেন্ট পেমেন্ট</CardTitle>
        <CardDescription className="bangla">
          আপনার অ্যাপয়েন্টমেন্ট কনফার্ম করতে পেমেন্ট করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePayment}>
          <div className="space-y-4">
            <div>
              <Label className="bangla mb-2 block">পেমেন্ট মাধ্যম নির্বাচন করুন</Label>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="bkash" id="bkash" />
                  <Label htmlFor="bkash" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-pink-600 rounded-md flex items-center justify-center text-white font-bold">
                      b
                    </div>
                    <span>বিকাশ</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="nagad" id="nagad" />
                  <Label htmlFor="nagad" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">
                      ন
                    </div>
                    <span>নগদ</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="w-5 h-5" />
                    <span>ক্রেডিট/ডেবিট কার্ড</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                    <Landmark className="w-5 h-5" />
                    <span>ব্যাংক ট্রান্সফার</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="bangla">মোবাইল নম্বর</Label>
                <Input 
                  id="phone" 
                  placeholder="01XXX-XXXXXX" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            )}
            
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="bangla">কার্ড নম্বর</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="XXXX XXXX XXXX XXXX" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="bangla">মেয়াদ</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY" 
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="bangla">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="XXX" 
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-4 border-t">
              <div className="flex justify-between mb-2">
                <p className="bangla">অ্যাপয়েন্টমেন্ট ফি</p>
                <p className="font-medium">৳{appointmentFee}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="bangla">সার্ভিস চার্জ</p>
                <p className="font-medium">৳20</p>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <p className="bangla">মোট</p>
                <p>৳{appointmentFee + 20}</p>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4 gap-2" 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="bangla">প্রসেস করা হচ্ছে...</span>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  <span className="bangla">পেমেন্ট করুন</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        <p className="bangla">সকল পেমেন্ট সুরক্ষিত ও এনক্রিপ্টেড</p>
      </CardFooter>
    </Card>
  );
};

export default AppointmentPayment;
