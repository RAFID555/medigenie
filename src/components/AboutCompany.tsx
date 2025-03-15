
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Globe, Clock, Building } from "lucide-react";

const AboutCompany = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="bangla">আমাদের সম্পর্কে</CardTitle>
        <CardDescription className="bangla">
          কোম্পানির তথ্য এবং যোগাযোগ
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium bangla">আমাদের লক্ষ্য</h3>
          <p className="text-sm text-muted-foreground bangla">
            আমরা বাংলাদেশের সকল মানুষের জন্য সহজলভ্য, সাশ্রয়ী এবং মানসম্পন্ন স্বাস্থ্যসেবা নিশ্চিত করতে চাই। 
            আমাদের অ্যাপ্লিকেশন মাধ্যমে আমরা ডিজিটাল স্বাস্থ্যসেবা সকলের কাছে পৌঁছে দিচ্ছি।
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium bangla">যোগাযোগের ঠিকানা</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="bangla">
                লেভেল ৩, প্লট ১১৮, ব্লক ই, গুলশান ২, ঢাকা ১২১২, বাংলাদেশ
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p>+৮৮০ ১৭১৭-১২৩৪৫৬</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p>info@aushudhaloy.com</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <p>www.aushudhaloy.com</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="bangla">সকাল ৯টা - রাত ৯টা (প্রতিদিন)</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 pt-2 border-t">
          <h3 className="text-lg font-medium bangla">আমাদের সেবাসমূহ</h3>
          <ul className="list-disc list-inside space-y-1 text-sm bangla">
            <li>ঔষধ ডেলিভারি</li>
            <li>ডাক্তার অ্যাপয়েন্টমেন্ট বুকিং</li>
            <li>ডিজিটাল প্রেসক্রিপশন</li>
            <li>ঔষধ রিমাইন্ডার</li>
            <li>হেলথ ট্র্যাকিং</li>
            <li>হেলথকেয়ার কনসালটেশন</li>
          </ul>
        </div>
        
        <div className="space-y-2 pt-2 border-t">
          <h3 className="text-lg font-medium bangla">আমরা কারা</h3>
          <p className="text-sm text-muted-foreground bangla">
            আমরা বাংলাদেশের একটি প্রতিষ্ঠিত হেলথকেয়ার টেকনোলজি কোম্পানি, যা ২০১৮ সালে প্রতিষ্ঠিত। 
            আমাদের দক্ষ ডাক্তার, ফার্মাসিস্ট এবং সফটওয়্যার ইঞ্জিনিয়ারদের একটি দল রয়েছে যারা সর্বাধুনিক ডিজিটাল হেলথকেয়ার সেবা প্রদান করে।
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutCompany;
