
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, RefreshCw, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export const PrescriptionScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
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
        }, 3000);
      }, 2000);
    }, 2000);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload and processing
      setTimeout(() => {
        setIsUploading(false);
        setIsProcessing(true);
        
        setTimeout(() => {
          setIsProcessing(false);
          setScanComplete(true);
          
          toast({
            title: "প্রেসক্রিপশন সফলভাবে আপলোড করা হয়েছে",
            description: "আপনি এখন আপনার প্রেসক্রিপশন সহজভাবে দেখতে পাবেন",
          });
          
          // Reset after showing success
          setTimeout(() => {
            setScanComplete(false);
          }, 3000);
        }, 2000);
      }, 2000);
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 bangla">প্রেসক্রিপশন স্ক্যান করুন</h2>
        <p className="text-muted-foreground bangla">আপনার ডাক্তারের প্রেসক্রিপশন স্ক্যান করুন বা আপলোড করুন</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          className={cn(
            "h-32 flex flex-col gap-2 transition-all",
            (isScanning || isProcessing) && "opacity-50 cursor-not-allowed"
          )}
          disabled={isScanning || isProcessing || isUploading}
          onClick={handleScan}
        >
          {isScanning ? (
            <RefreshCw className="h-8 w-8 animate-spin" />
          ) : scanComplete ? (
            <Check className="h-8 w-8" />
          ) : (
            <Camera className="h-8 w-8" />
          )}
          <span className="bangla text-lg">ক্যামেরা দিয়ে স্ক্যান করুন</span>
        </Button>
        
        <Button 
          variant="outline" 
          className={cn(
            "h-32 flex flex-col gap-2 border-dashed border-2",
            (isUploading || isProcessing) && "opacity-50 cursor-not-allowed"
          )}
          disabled={isScanning || isProcessing || isUploading}
          onClick={handleUploadClick}
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            accept="image/*" 
            onChange={handleFileChange}
          />
          
          {isUploading ? (
            <RefreshCw className="h-8 w-8 animate-spin" />
          ) : isProcessing ? (
            <RefreshCw className="h-8 w-8 animate-spin" />
          ) : scanComplete ? (
            <Check className="h-8 w-8" />
          ) : (
            <Upload className="h-8 w-8" />
          )}
          <span className="bangla text-lg">ছবি আপলোড করুন</span>
        </Button>
      </div>
      
      {isProcessing && (
        <div className="mt-6 text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="bangla">প্রেসক্রিপশন প্রসেস করা হচ্ছে...</p>
        </div>
      )}
    </Card>
  );
};

export default PrescriptionScanner;
