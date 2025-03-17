
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, RefreshCw, Check, ScanLine } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export const PrescriptionScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  // Function to handle actual camera scanning
  const handleScan = async () => {
    try {
      setIsScanning(true);
      
      // If we're already scanning, take the picture
      if (videoRef.current && videoRef.current.srcObject && canvasRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current video frame to the canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert to data URL
          const imageData = canvas.toDataURL('image/jpeg');
          setCapturedImage(imageData);
          
          // Stop camera stream
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
          video.srcObject = null;
          
          // Process the captured image
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
        }
        return;
      }
      
      // Start camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera error:", error);
      setIsScanning(false);
      toast({
        title: "ক্যামেরা অ্যাক্সেস করতে ব্যর্থ হয়েছে",
        description: "অনুগ্রহ করে ক্যামেরা অ্যাক্সেস দিন অথবা ছবি আপলোড করুন",
        variant: "destructive"
      });
    }
  };
  
  const handleCancelScan = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setCapturedImage(null);
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
      
      // Create file preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
        }
        
        // Simulate processing
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
            setCapturedImage(null);
          }, 3000);
        }, 2000);
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 bangla">প্রেসক্রিপশন স্ক্যান করুন</h2>
        <p className="text-muted-foreground bangla">আপনার ডাক্তারের প্রেসক্রিপশন স্ক্যান করুন বা আপলোড করুন</p>
      </div>
      
      {isScanning ? (
        <div className="relative mb-4">
          <video 
            ref={videoRef} 
            className="w-full h-64 object-cover rounded-lg bg-black"
            playsInline
            autoPlay
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ScanLine className="w-48 h-48 text-primary opacity-50" />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Button onClick={handleScan} className="gap-2">
              <Camera className="h-4 w-4" />
              <span className="bangla">ছবি তুলুন</span>
            </Button>
            <Button variant="outline" onClick={handleCancelScan} className="gap-2">
              <span className="bangla">বাতিল করুন</span>
            </Button>
          </div>
        </div>
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
            disabled={isProcessing || isUploading}
            onClick={handleScan}
          >
            {scanComplete ? (
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
            disabled={isProcessing || isUploading}
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
      )}
      
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
