
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Globe, Clock, Building } from "lucide-react";

interface AboutCompanyProps {
  language?: string;
}

const AboutCompany = ({ language = "bangla" }: AboutCompanyProps) => {
  const isEnglish = language === "english";

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Building className="h-5 w-5 mr-2" />
          MediGini
        </CardTitle>
        <CardDescription>
          {isEnglish ? "Your trusted healthcare companion" : "আপনার বিশ্বস্ত স্বাস্থ্যসেবা সঙ্গী"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">
            {isEnglish ? "Contact Information" : "যোগাযোগের তথ্য"}
          </h3>
          
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">
                {isEnglish ? "Office Address" : "অফিসের ঠিকানা"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isEnglish ? "House #23, Road #4, Dhanmondi" : "বাড়ি #২৩, রোড #৪, ধানমন্ডি"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isEnglish ? "Dhaka 1209, Bangladesh" : "ঢাকা ১২০৯, বাংলাদেশ"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">
                {isEnglish ? "Phone" : "ফোন"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isEnglish ? "+880 1712-345678" : "+৮৮০ ১৭১২-৩৪৫৬৭৮"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">
                {isEnglish ? "Email" : "ইমেইল"}
              </p>
              <p className="text-sm text-muted-foreground">info@medigini.com</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">
                {isEnglish ? "Website" : "ওয়েবসাইট"}
              </p>
              <p className="text-sm text-muted-foreground">www.medigini.com</p>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <h3 className="font-semibold text-lg mb-2">
            {isEnglish ? "Business Hours" : "কার্যালয়ের সময়"}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>{isEnglish ? "Monday - Friday" : "সোমবার - শুক্রবার"}</span>
            </div>
            <span className="text-muted-foreground">
              {isEnglish ? "9:00 AM - 8:00 PM" : "সকাল ৯:০০ - রাত ৮:০০"}
            </span>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>{isEnglish ? "Saturday" : "শনিবার"}</span>
            </div>
            <span className="text-muted-foreground">
              {isEnglish ? "10:00 AM - 6:00 PM" : "সকাল ১০:০০ - সন্ধ্যা ৬:০০"}
            </span>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>{isEnglish ? "Sunday" : "রবিবার"}</span>
            </div>
            <span className="text-muted-foreground">
              {isEnglish ? "Closed" : "বন্ধ"}
            </span>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <h3 className="font-semibold text-lg mb-2">
            {isEnglish ? "About Us" : "আমাদের সম্পর্কে"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isEnglish 
              ? "MediGini is a healthcare technology company founded in 2023 with a mission to make healthcare accessible and convenient for everyone in Bangladesh. We connect patients with healthcare providers, simplify medication management, and help you stay on top of your health goals."
              : "মেডিজিনি একটি স্বাস্থ্যসেবা প্রযুক্তি কোম্পানি যা ২০২৩ সালে প্রতিষ্ঠিত হয়েছে বাংলাদেশের সকলের জন্য স্বাস্থ্যসেবা সহজলভ্য ও সুবিধাজনক করার লক্ষ্যে। আমরা রোগীদের স্বাস্থ্যসেবা প্রদানকারীদের সাথে সংযোগ করি, ঔষধ ব্যবস্থাপনা সহজ করি এবং আপনাকে আপনার স্বাস্থ্য লক্ষ্য অর্জনে সাহায্য করি।"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutCompany;
