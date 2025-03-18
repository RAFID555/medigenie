
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";

interface ScannerActionsProps {
  onScan: () => void;
  onUpload: (imageData: string) => void;
  isProcessing: boolean;
  scanComplete: boolean;
}

const ScannerActions = ({ onScan, onUpload, isProcessing, scanComplete }: ScannerActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Button 
        className={cn(
          "h-32 flex flex-col gap-2 transition-all",
          (isProcessing) && "opacity-50 cursor-not-allowed"
        )}
        disabled={isProcessing}
        onClick={onScan}
      >
        {scanComplete ? (
          <Check className="h-8 w-8" />
        ) : (
          <Camera className="h-8 w-8" />
        )}
        <span className="bangla text-lg">ক্যামেরা দিয়ে স্ক্যান করুন</span>
      </Button>
      
      <FileUploader 
        onUpload={onUpload}
        disabled={isProcessing}
      />
    </div>
  );
};

export default ScannerActions;
