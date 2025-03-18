
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Check, ScanLine } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import CameraCapture from "./scanner/CameraCapture";
import FileUploader from "./scanner/FileUploader";

export const PrescriptionScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Function to handle actual camera scanning
  const handleScan = async () => {
    setIsScanning(true);
  };
  
  const handleCancelScan = () => {
    setIsScanning(false);
  };

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setIsScanning(false);
    processImage();
  };

  const handleImageUpload = (imageData: string) => {
    setCapturedImage(imageData);
    processImage();
  };

  const processImage = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setScanComplete(true);
      
      toast({
        title: "প্রেসক্রিপশন সফলভাবে স্ক্যান করা হয়েছে",
        description: "আপনি এখন আপনার প্রেসক্রিপশন সহজভাবে দেখতে পাবেন",
      });
      
      // Reset after showing success
      setTimeout(() => {
        setScanComplete(false);
        setCapturedImage(null);
      }, 3000);
    }, 2000);
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 bangla">প্রেসক্রিপশন স্ক্যান করুন</h2>
        <p className="text-muted-foreground bangla">আপনার ডাক্তারের প্রেসক্রিপশন স্ক্যান করুন বা আপলোড করুন</p>
      </div>
      
      {isScanning ? (
        <CameraCapture onCapture={handleImageCapture} onCancel={handleCancelScan} />
      ) : capturedImage ? (
        <div className="mb-4">
          <img 
            src={capturedImage}
            alt="Captured prescription"
            className="w-full h-64 object-contain rounded-lg border"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            className={cn(
              "h-32 flex flex-col gap-2 transition-all",
              (isProcessing) && "opacity-50 cursor-not-allowed"
            )}
            disabled={isProcessing}
            onClick={handleScan}
          >
            {scanComplete ? (
              <Check className="h-8 w-8" />
            ) : (
              <Camera className="h-8 w-8" />
            )}
            <span className="bangla text-lg">ক্যামেরা দিয়ে স্ক্যান করুন</span>
          </Button>
          
          <FileUploader 
            onUpload={handleImageUpload}
            disabled={isProcessing}
          />
        </div>
      )}
      
      {isProcessing && (
        <div className="mt-6 text-center">
          <div className="inline-block p-3 rounded-full bg-primary/10">
            <ScanLine className="h-8 w-8 animate-pulse text-primary" />
          </div>
          <p className="bangla mt-2">প্রেসক্রিপশন প্রসেস করা হচ্ছে...</p>
        </div>
      )}
    </Card>
  );
};

export default PrescriptionScanner;
