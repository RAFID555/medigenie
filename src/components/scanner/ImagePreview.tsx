
import React from "react";

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  return (
    <div className="mb-4">
      <img 
        src={imageUrl}
        alt="Captured prescription"
        className="w-full h-64 object-contain rounded-lg border"
      />
    </div>
  );
};

export default ImagePreview;
