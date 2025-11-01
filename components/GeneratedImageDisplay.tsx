import React from 'react';

interface GeneratedImageDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
        <p className="mt-4 text-lg text-gray-300">AI is creating your masterpiece...</p>
    </div>
);

const EmptyState: React.FC = () => (
     <div className="flex flex-col items-center justify-center h-full text-center bg-gray-900/50 p-8 rounded-lg">
        <svg className="w-20 h-20 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <h3 className="text-xl font-semibold text-gray-300">Your generated mockup will appear here.</h3>
        <p className="text-gray-500 mt-2">Follow the steps on the left to get started.</p>
    </div>
);


export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ generatedImage, isLoading }) => {
  return (
    <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
      {isLoading ? (
        <LoadingSpinner />
      ) : generatedImage ? (
        <>
            <img src={generatedImage} alt="Generated mockup" className="object-contain w-full h-full" />
             <a
                href={generatedImage}
                download="mockup.png"
                className="absolute bottom-4 right-4 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors duration-300 flex items-center gap-2 shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
            </a>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
