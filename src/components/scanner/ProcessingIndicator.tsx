
import React from "react";
import { Loader2, ScanLine, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface ProcessingIndicatorProps {
  error?: string | null;
  processingStage?: 'scanning' | 'analyzing' | 'complete';
}

const ProcessingIndicator = ({ 
  error = null, 
  processingStage = 'scanning' 
}: ProcessingIndicatorProps) => {
  return (
    <div className="mt-6 text-center">
      {error ? (
        <Alert variant="destructive" className="mx-auto max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2 bangla">{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <div className={cn(
            "inline-block p-3 rounded-full bg-primary/10",
            processingStage === 'complete' && "bg-green-100"
          )}>
            {processingStage === 'scanning' && (
              <ScanLine className="h-8 w-8 animate-pulse text-primary" />
            )}
            {processingStage === 'analyzing' && (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            )}
            {processingStage === 'complete' && (
              <AlertCircle className="h-8 w-8 text-green-600" />
            )}
          </div>
          
          <p className="bangla mt-2">
            {processingStage === 'scanning' && "প্রেসক্রিপশন স্ক্যান করা হচ্ছে..."}
            {processingStage === 'analyzing' && "প্রেসক্রিপশন বিশ্লেষণ করা হচ্ছে..."}
            {processingStage === 'complete' && "প্রেসক্রিপশন প্রসেস করা হয়েছে!"}
          </p>
          
          {processingStage === 'analyzing' && (
            <div className="mt-4 space-y-2 max-w-md mx-auto">
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
              <Skeleton className="h-4 w-2/3 mx-auto" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProcessingIndicator;
