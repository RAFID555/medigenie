
import { useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload, User } from "lucide-react";

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

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreview(event.target.result as string);
          onAvatarChange(event.target.result as string);
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
        videoRef.current.play();
      }
    } catch (err) {
      setCameraError("ক্যামেরা অ্যাক্সেস হয়নি।");
    }
  };

  const handleCameraCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setPreview(dataUrl);
        onAvatarChange(dataUrl);

        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
        setIsCameraOpen(false);
      }
    }
  };

  const handleCameraClose = () => {
    setIsCameraOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-20 w-20 mb-2">
        <AvatarImage src={preview} alt="Profile" />
        <AvatarFallback>
          <User className="h-10 w-10" />
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
          disabled={disabled}
          className="gap-1"
        >
          <Camera className="h-4 w-4" />
          <span className="bangla">ক্যামেরা</span>
        </Button>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center">
          <div className="bg-white dark:bg-black rounded-lg p-4 flex flex-col items-center">
            {cameraError && (
              <div className="text-red-500 bangla mb-2">{cameraError}</div>
            )}
            <video ref={videoRef} className="w-56 h-56 object-cover rounded" autoPlay playsInline />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                onClick={handleCameraCapture}
                className="bangla"
              >
                ছবি তুলুন
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCameraClose}
                className="bangla"
              >
                বাতিল
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatarUpload;
