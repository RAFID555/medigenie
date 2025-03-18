
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onCancel: () => void;
}

const CameraCapture = ({ onCapture, onCancel }: CameraCaptureProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  // Start camera when component mounts
  useState(() => {
    startCamera();
    return () => {
      // Clean up camera on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        title: "ক্যামেরা অ্যাক্সেস করতে ব্যর্থ হয়েছে",
        description: "অনুগ্রহ করে ক্যামেরা অ্যাক্সেস দিন অথবা ছবি আপলোড করুন",
        variant: "destructive"
      });
      onCancel();
    }
  };
  
  const captureImage = () => {
    if (videoRef.current && videoRef.current.srcObject && canvasRef.current) {
      setIsProcessing(true);
      
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
        
        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        
        // Process the captured image
        setTimeout(() => {
          setIsProcessing(false);
          onCapture(imageData);
        }, 500);
      }
    }
  };

  return (
    <div className="relative mb-4">
      <video 
        ref={videoRef} 
        className="w-full h-64 object-cover rounded-lg bg-black"
        playsInline
        autoPlay
      />
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="flex justify-center gap-2 mt-4">
        {isProcessing ? (
          <Button disabled className="gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="bangla">প্রসেস হচ্ছে...</span>
          </Button>
        ) : (
          <Button onClick={captureImage} className="gap-2">
            <Camera className="h-4 w-4" />
            <span className="bangla">ছবি তুলুন</span>
          </Button>
        )}
        <Button variant="outline" onClick={onCancel} className="gap-2">
          <span className="bangla">বাতিল করুন</span>
        </Button>
      </div>
    </div>
  );
};

export default CameraCapture;
