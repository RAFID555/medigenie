
import React from "react";
import { ScanLine } from "lucide-react";

const ProcessingIndicator = () => {
  return (
    <div className="mt-6 text-center">
      <div className="inline-block p-3 rounded-full bg-primary/10">
        <ScanLine className="h-8 w-8 animate-pulse text-primary" />
      </div>
      <p className="bangla mt-2">প্রেসক্রিপশন প্রসেস করা হচ্ছে...</p>
    </div>
  );
};

export default ProcessingIndicator;
