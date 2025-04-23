
import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ProfileAvatarUploadProps {
  avatarUrl?: string;
  onAvatarChange: (base64Image: string) => void;
  disabled?: boolean;
}

const ProfileAvatarUpload = ({
  avatarUrl,
  onAvatarChange,
  disabled = false,
}: ProfileAvatarUploadProps) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const { toast } = useToast();

  // Update preview when avatarUrl prop changes
  useEffect(() => {
    setPreview(avatarUrl);
  }, [avatarUrl]);

  // Check if device has camera
  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setHasCamera(videoDevices.length > 0);
      } catch (err) {
        console.error("Error checking camera:", err);
        setHasCamera(false);
      }
    };
    
    checkCamera();
  }, []);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setPreview(imageData);
          onAvatarChange(imageData);
          
          toast({
            title: "ছবি আপলোড হয়েছে",
            description: "প্রোফাইল ছবি সফলভাবে আপলোড করা হয়েছে।",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Camera logic
  const handleCameraOpen = async () => {
    setCameraError(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("ক্যামেরা অ্যাক্সেস হয়নি। অনুগ্রহ করে অনুমতি দিন।");
    }
  };

  const handleCameraCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Ensure video is playing and has dimensions
      if (video.readyState !== video.HAVE_ENOUGH_DATA || !video.videoWidth) {
        toast({
          title: "ক্যামেরা প্রস্তুত নয়",
          description: "অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন।",
          variant: "destructive",
        });
        return;
      }
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setPreview(dataUrl);
        onAvatarChange(dataUrl);

        // Stop camera stream
        stopCameraStream();
        setIsCameraOpen(false);
        
        toast({
          title: "ছবি তোলা হয়েছে",
          description: "প্রোফাইল ছবি সফলভাবে সেট করা হয়েছে।",
        });
      }
    }
  };

  const handleCameraClose = () => {
    stopCameraStream();
    setIsCameraOpen(false);
  };
  
  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-24 w-24 mb-3 border-2 border-primary/20">
        <AvatarImage src={preview} alt="প্রোফাইল ছবি" />
        <AvatarFallback>
          <User className="h-12 w-12 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex gap-2">
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={handleFileSelect}
          disabled={disabled}
          className="gap-1"
        >
          <Upload className="h-4 w-4" />
          <span className="bangla">গ্যালারী</span>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={handleCameraOpen}
          disabled={disabled || !hasCamera}
          className="gap-1"
        >
          <Camera className="h-4 w-4" />
          <span className="bangla">ক্যামেরা</span>
        </Button>
      </div>

      {/* Camera Modal using Dialog for better UI */}
      <Dialog open={isCameraOpen} onOpenChange={(open) => {
        if (!open) handleCameraClose();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="bangla text-center">প্রোফাইল ছবি তুলুন</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center">
            {cameraError ? (
              <div className="text-red-500 bangla mb-2 text-center">{cameraError}</div>
            ) : null}
            
            <div className="relative w-64 h-64 bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover" 
                autoPlay 
                playsInline
                muted
              />
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleCameraCapture}
                className="bangla"
              >
                <Camera className="h-4 w-4 mr-2" />
                ছবি তুলুন
              </Button>
              <Button
                variant="outline"
                onClick={handleCameraClose}
                className="bangla"
              >
                বাতিল
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileAvatarUpload;
