
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onUpload: (imageData: string) => void;
  disabled: boolean;
}

const FileUploader = ({ onUpload, disabled }: FileUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          setIsUploading(false);
          onUpload(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <Button 
      variant="outline" 
      className={cn(
        "h-32 flex flex-col gap-2 border-dashed border-2",
        (isUploading || disabled) && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled || isUploading}
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
      ) : (
        <Upload className="h-8 w-8" />
      )}
      <span className="bangla text-lg">ছবি আপলোড করুন</span>
    </Button>
  );
};

export default FileUploader;
