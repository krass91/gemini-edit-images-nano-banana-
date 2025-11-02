import React, { useState, useCallback } from 'react';
import { editImageWithPrompt } from './services/geminiService';
import type { ImageData } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import PromptInput from './components/PromptInput';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [generatedImage, setGeneratedImage] = useState<ImageData | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        src: reader.result as string,
        alt: file.name,
      });
      setGeneratedImage(null);
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const parseDataUrl = (dataUrl: string): { base64Data: string; mimeType: string } => {
    const parts = dataUrl.split(',');
    const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
    const base64Data = parts[1];
    return { base64Data, mimeType };
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const { base64Data, mimeType } = parseDataUrl(originalImage.src);
      const newBase64Image = await editImageWithPrompt(base64Data, mimeType, prompt);
      
      setGeneratedImage({
        src: `data:${mimeType};base64,${newBase64Image}`,
        alt: `Edited version of ${originalImage.alt}`,
      });
    } catch (e) {
      console.error(e);
      setError('Failed to generate the image. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg text-gray-400 mb-8">
            Upload an image, describe how you want to change it, and let Gemini bring your vision to life. Try prompts like "Add a retro filter" or "Make the sky look like a vibrant sunset".
          </p>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
            <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage} />

            {originalImage && (
              <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </div>
          
          {isLoading && (
              <div className="mt-8 flex flex-col items-center justify-center">
                <Spinner />
                <p className="mt-4 text-lg text-blue-400 animate-pulse">Gemini is thinking...</p>
              </div>
          )}

          <ImageDisplay originalImage={originalImage} generatedImage={generatedImage} />
        </div>
      </main>
    </div>
  );
};

export default App;
