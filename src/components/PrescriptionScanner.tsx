
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Check, ScanLine } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import CameraCapture from "./scanner/CameraCapture";
import FileUploader from "./scanner/FileUploader";
import ScannerHeader from "./scanner/ScannerHeader";
import ScannerActions from "./scanner/ScannerActions";
import ProcessingIndicator from "./scanner/ProcessingIndicator";
import ImagePreview from "./scanner/ImagePreview";

export const PrescriptionScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleScan = () => {
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
      <ScannerHeader />
      
      {isScanning ? (
        <CameraCapture onCapture={handleImageCapture} onCancel={handleCancelScan} />
      ) : capturedImage ? (
        <ImagePreview imageUrl={capturedImage} />
      ) : (
        <ScannerActions 
          onScan={handleScan} 
          onUpload={handleImageUpload}
          isProcessing={isProcessing}
          scanComplete={scanComplete}
        />
      )}
      
      {isProcessing && <ProcessingIndicator />}
    </Card>
  );
};

export default PrescriptionScanner;
