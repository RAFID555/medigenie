
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Search, MapPin, Phone, Plus, Minus, ShoppingBag } from "lucide-react";

interface MedicineItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

const MedicineItem = ({ id, name, price, quantity, onQuantityChange }: MedicineItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div>
        <h4 className="font-medium bangla">{name}</h4>
        <p className="text-sm text-muted-foreground">৳ {price}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7"
          onClick={() => onQuantityChange(id, Math.max(0, quantity - 1))}
          disabled={quantity === 0}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7"
          onClick={() => onQuantityChange(id, quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export const MedicineOrderForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pharmacyQuery, setPharmacyQuery] = useState("");
  const { toast } = useToast();
  
  // Simulated medicine data
  const [medicines, setMedicines] = useState([
    { id: "1", name: "নাপা ৫০০ মিলিগ্রাম", price: 5, quantity: 1 },
    { id: "2", name: "সেক্লো ২০ মিলিগ্রাম", price: 8, quantity: 0 },
    { id: "3", name: "এন্টাসিড প্লাস", price: 6, quantity: 0 },
    { id: "4", name: "মেট্রিক ৫০০ মিলিগ্রাম", price: 12, quantity: 2 },
  ]);
  
  const handleQuantityChange = (id: string, quantity: number) => {
    setMedicines(
      medicines.map((medicine) => 
        medicine.id === id ? { ...medicine, quantity } : medicine
      )
    );
  };
  
  const totalItems = medicines.reduce((total, medicine) => total + medicine.quantity, 0);
  const subtotal = medicines.reduce((total, medicine) => total + (medicine.price * medicine.quantity), 0);
  const deliveryFee = 30;
  const total = subtotal + deliveryFee;
  
  const handleOrder = () => {
    toast({
      title: "অর্ডার সফল হয়েছে!",
      description: "আপনার ঔষধগুলি শীঘ্রই পৌঁছে যাবে।",
    });
  };
  
  return (
    <Card className="divide-y">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="ঔষধ খুঁজুন..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2 bangla">ঔষধ সমূহ</h3>
          <div className="space-y-1">
            {medicines.map((medicine) => (
              <MedicineItem
                key={medicine.id}
                id={medicine.id}
                name={medicine.name}
                price={medicine.price}
                quantity={medicine.quantity}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium mb-2 bangla">নিকটবর্তী ফার্মেসি</h3>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ফার্মেসি খুঁজুন..."
              className="pl-8"
              value={pharmacyQuery}
              onChange={(e) => setPharmacyQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-1 whitespace-nowrap">
            <Phone className="h-4 w-4" />
            <span className="bangla">কল</span>
          </Button>
        </div>
        
        <div className="bg-secondary rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              ল
            </div>
            <div className="flex-1">
              <h4 className="font-medium bangla">লাজুক ফার্মেসি</h4>
              <p className="text-xs text-muted-foreground bangla">
                ধানমন্ডি, ঢাকা - ০.৮ কি.মি দূরে
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium mb-3 bangla">অর্ডার সারাংশ</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="bangla">মোট আইটেম</span>
            <span>{totalItems}টি</span>
          </div>
          <div className="flex justify-between">
            <span className="bangla">উপমোট</span>
            <span>৳ {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="bangla">ডেলিভারি চার্জ</span>
            <span>৳ {deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span className="bangla">সর্বমোট</span>
            <span>৳ {total}</span>
          </div>
        </div>
        
        <Button className="w-full mt-4 gap-2" onClick={handleOrder}>
          <ShoppingBag className="h-4 w-4" />
          <span className="bangla">অর্ডার করুন</span>
        </Button>
      </div>
    </Card>
  );
};

export default MedicineOrderForm;
