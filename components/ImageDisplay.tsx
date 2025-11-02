import React from 'react';
import type { ImageData } from '../types';

interface ImageCardProps {
    title: string;
    imageData: ImageData | null;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, imageData }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full">
            <h3 className="text-lg font-semibold p-4 bg-gray-700/50 text-center text-gray-300">{title}</h3>
            <div className="p-4 flex justify-center items-center min-h-[200px] md:min-h-[300px]">
                {imageData ? (
                    <img
                        src={imageData.src}
                        alt={imageData.alt}
                        className="max-w-full max-h-80 object-contain rounded-md"
                    />
                ) : (
                    <div className="text-gray-500">Image will appear here</div>
                )}
            </div>
        </div>
    );
};


interface ImageDisplayProps {
  originalImage: ImageData | null;
  generatedImage: ImageData | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, generatedImage }) => {
    if (!originalImage && !generatedImage) {
        return null;
    }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageCard title="Original Image" imageData={originalImage} />
        <ImageCard title="Generated Image" imageData={generatedImage} />
    </div>
  );
};

export default ImageDisplay;
