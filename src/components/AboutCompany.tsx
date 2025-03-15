
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Globe, Clock, Building } from "lucide-react";

const AboutCompany = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Building className="h-5 w-5 mr-2" />
          MediGini
        </CardTitle>
        <CardDescription>Your trusted healthcare companion</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Contact Information</h3>
          
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Office Address</p>
              <p className="text-sm text-muted-foreground">House #23, Road #4, Dhanmondi</p>
              <p className="text-sm text-muted-foreground">Dhaka 1209, Bangladesh</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">+880 1712-345678</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">info@medigini.com</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">Website</p>
              <p className="text-sm text-muted-foreground">www.medigini.com</p>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>Monday - Friday</span>
            </div>
            <span className="text-muted-foreground">9:00 AM - 8:00 PM</span>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>Saturday</span>
            </div>
            <span className="text-muted-foreground">10:00 AM - 6:00 PM</span>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>Sunday</span>
            </div>
            <span className="text-muted-foreground">Closed</span>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <h3 className="font-semibold text-lg mb-2">About Us</h3>
          <p className="text-sm text-muted-foreground">
            MediGini is a healthcare technology company founded in 2023 with a mission to make healthcare 
            accessible and convenient for everyone in Bangladesh. We connect patients with healthcare 
            providers, simplify medication management, and help you stay on top of your health goals.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutCompany;
