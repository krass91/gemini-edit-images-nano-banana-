import React, { useRef } from 'react';
import type { ImageData } from '../types';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImage: ImageData | null;
}

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <div>
      <label
        htmlFor="image-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        className="cursor-pointer block border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300"
      >
        <input
          id="image-upload"
          name="image-upload"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="sr-only"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {originalImage ? (
            <div className="flex flex-col items-center">
                <img src={originalImage.src} alt={originalImage.alt} className="max-h-40 rounded-md mb-4"/>
                <span className="text-blue-400">Click or drop to replace image</span>
            </div>
        ) : (
          <div className="flex flex-col items-center">
            <ImageIcon />
            <p className="mt-2 text-gray-400">
              <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
