
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, Ambulance, Heart, User } from "lucide-react";

const Emergency = () => {
  return (
    <Layout>
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold bangla">জরুরী সাহায্য</h1>
          <p className="text-muted-foreground bangla">
            জরুরী অবস্থায় সাহায্য পেতে নিচের অপশনগুলো ব্যবহার করুন
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Emergency Call Section */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50 rounded-t-lg dark:bg-red-950/20">
              <CardTitle className="flex items-center gap-2 bangla">
                <PhoneCall className="h-5 w-5 text-red-600" />
                জরুরী কল
              </CardTitle>
              <CardDescription className="bangla">
                সরাসরি জরুরী সাহায্য পাওয়ার জন্য কল করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-4">
              <Button 
                className="w-full py-6 text-lg bg-red-600 hover:bg-red-700"
                onClick={() => window.location.href = "tel:999"}
              >
                <PhoneCall className="mr-2 h-6 w-6" />
                <span className="bangla">জাতীয় জরুরী সেবা: ৯৯৯</span>
              </Button>
              
              <Button 
                className="w-full py-6 text-lg" 
                variant="outline"
                onClick={() => window.location.href = "tel:16263"}
              >
                <PhoneCall className="mr-2 h-6 w-6" />
                <span className="bangla">স্বাস্থ্য বাতায়ন: ১৬২৬৩</span>
              </Button>
            </CardContent>
          </Card>
          
          {/* Ambulance Section */}
          <Card className="border-orange-200">
            <CardHeader className="bg-orange-50 rounded-t-lg dark:bg-orange-950/20">
              <CardTitle className="flex items-center gap-2 bangla">
                <Ambulance className="h-5 w-5 text-orange-600" />
                অ্যাম্বুলেন্স সার্ভিস
              </CardTitle>
              <CardDescription className="bangla">
                দ্রুত অ্যাম্বুলেন্স পেতে কল করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-4">
              <Button 
                className="w-full py-4 bg-orange-600 hover:bg-orange-700"
                onClick={() => window.location.href = "tel:10921"}
              >
                <Ambulance className="mr-2 h-5 w-5" />
                <span className="bangla">জাতীয় অ্যাম্বুলেন্স: ১০৯২১</span>
              </Button>
              
              <Button 
                className="w-full py-4" 
                variant="outline"
                onClick={() => window.location.href = "tel:01713377773"}
              >
                <Ambulance className="mr-2 h-5 w-5" />
                <span className="bangla">রেড ক্রিসেন্ট: ০১৭১৩৩৭৭৭৭৩</span>
              </Button>
            </CardContent>
          </Card>
          
          {/* Blood Bank Section */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50 rounded-t-lg dark:bg-red-950/20">
              <CardTitle className="flex items-center gap-2 bangla">
                <Heart className="h-5 w-5 text-red-600" />
                ব্লাড ব্যাংক সাপোর্ট
              </CardTitle>
              <CardDescription className="bangla">
                জরুরী রক্তের প্রয়োজনে যোগাযোগ করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-4">
              <Button 
                className="w-full py-4 bg-red-600 hover:bg-red-700"
                onClick={() => window.location.href = "tel:01534537242"}
              >
                <Heart className="mr-2 h-5 w-5" />
                <span className="bangla">বাংলাদেশ রেড ক্রিসেন্ট</span>
              </Button>
              
              <Button 
                className="w-full py-4" 
                variant="outline"
                onClick={() => window.location.href = "tel:10622"}
              >
                <Heart className="mr-2 h-5 w-5" />
                <span className="bangla">সানরাইজ ব্লাড ব্যাংক: ১০৬২২</span>
              </Button>
            </CardContent>
          </Card>
          
          {/* Speed Dial Section */}
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50 rounded-t-lg dark:bg-blue-950/20">
              <CardTitle className="flex items-center gap-2 bangla">
                <User className="h-5 w-5 text-blue-600" />
                স্পিড ডায়াল আত্মীয়
              </CardTitle>
              <CardDescription className="bangla">
                আপনার নিকটতম আত্মীয়দের দ্রুত কল করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-4">
              <Button 
                className="w-full py-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = "tel:+8801XXXXXXXXX"}
              >
                <User className="mr-2 h-5 w-5" />
                <span className="bangla">প্রাথমিক যোগাযোগ</span>
              </Button>
              
              <Button 
                className="w-full py-4" 
                variant="outline"
                onClick={() => window.location.href = "tel:+8801XXXXXXXXX"}
              >
                <User className="mr-2 h-5 w-5" />
                <span className="bangla">দ্বিতীয় যোগাযোগ</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Emergency;
