import React, { useState, useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-cyan-400');
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onFileSelect(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  }, [onFileSelect]);
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-cyan-400');
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-cyan-400');
  };


  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400">Step 1: Upload Your Logo</h2>
      <div 
        className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 hover:border-cyan-500 bg-gray-900/50"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
        {preview ? (
          <img src={preview} alt="Logo preview" className="max-h-full max-w-full object-contain p-2" />
        ) : (
          <div className="text-center text-gray-400">
            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            <p className="mt-2">Click or drag & drop to upload</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};
