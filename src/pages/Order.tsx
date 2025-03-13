
import Layout from "@/components/Layout";
import MedicineOrderForm from "@/components/MedicineOrderForm";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ShoppingBag, CheckCircle } from "lucide-react";

const Order = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-2xl font-bold bangla">ঔষধ অর্ডার</h1>
          <p className="text-muted-foreground bangla">নিকটবর্তী ফার্মেসি থেকে ঔষধ অর্ডার করুন</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MedicineOrderForm />
          
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 bangla">
                অর্ডার ট্র্যাকিং
              </h2>
              
              <Tabs defaultValue="active">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="active" className="flex-1 gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="bangla">চলমান</span>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex-1 gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="bangla">সম্পন্ন</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="mt-0">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium bangla">অর্ডার #১২৩৪</h3>
                        <p className="text-xs text-muted-foreground">৭ ডিসেম্বর, ২০২৩</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="bangla">মোট আইটেম:</span>
                        <span>৩টি</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="bangla">মোট:</span>
                        <span className="font-medium">৳ ৪৯</span>
                      </div>
                      <div className="flex justify-between text-blue-600">
                        <span className="bangla">স্ট্যাটাস:</span>
                        <span className="font-medium bangla">বিতরণ হচ্ছে</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div className="bg-primary h-2 rounded-full w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="bangla">অর্ডার গৃহীত</span>
                        <span className="bangla">প্রস্তুত হচ্ছে</span>
                        <span className="bangla">পথে</span>
                        <span className="bangla">বিতরণ</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="completed" className="mt-0">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium bangla">অর্ডার #১১২২</h3>
                        <p className="text-xs text-muted-foreground">৫ ডিসেম্বর, ২০২৩</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="bangla">মোট আইটেম:</span>
                        <span>২টি</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="bangla">মোট:</span>
                        <span className="font-medium">৳ ৩৫</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span className="bangla">স্ট্যাটাস:</span>
                        <span className="font-medium bangla">বিতরণ সম্পন্ন</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 bangla">
                প্রায়শই অর্ডার করা ঔষধ
              </h2>
              
              <div className="space-y-3">
                {[
                  { name: "নাপা ৫০০ মিলিগ্রাম", count: 5 },
                  { name: "সেক্লো ২০ মিলিগ্রাম", count: 3 },
                  { name: "এন্টাসিড প্লাস", count: 2 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="font-medium bangla">{item.name}</span>
                    <span className="text-sm text-muted-foreground bangla">
                      {item.count} বার অর্ডার করা হয়েছে
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
