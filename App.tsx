import React, { useState, useCallback } from 'react';
import { generateMockup } from './services/geminiService';
import { ProductTemplate } from './types';
import { PRODUCT_TEMPLATES } from './constants';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ProductSelector } from './components/ProductSelector';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { InstructionsInput } from './components/InstructionsInput';
import { GenerateButton } from './components/GenerateButton';

const App: React.FC = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductTemplate | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        }
      };
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const urlToGenerativePart = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${url}`);
    }
    const blob = await response.blob();
    const reader = new FileReader();
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
             if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
             }
        };
        reader.readAsDataURL(blob);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: blob.type },
    };
  };

  const handleGenerate = useCallback(async () => {
    if (!logoFile || !selectedProduct) {
      setError('Please upload a logo and select a product.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const logoPart = await fileToGenerativePart(logoFile);
      const productPart = await urlToGenerativePart(selectedProduct.imageUrl);
      
      const result = await generateMockup(productPart, logoPart, prompt);
      setGeneratedImage(result);

    } catch (err) {
      console.error(err);
      setError('Failed to generate mockup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [logoFile, selectedProduct, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-8 bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <ImageUploader onFileSelect={setLogoFile} />
            <ProductSelector
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
            />
            <InstructionsInput value={prompt} onChange={setPrompt} />
            <GenerateButton
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={!logoFile || !selectedProduct}
            />
          </div>

          {/* Right Column: Display */}
          <div className="flex flex-col bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Your Mockup</h2>
            {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4">{error}</div>}
            <GeneratedImageDisplay
              generatedImage={generatedImage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
