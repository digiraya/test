import React from 'react';

interface GenerateButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, disabled }) => {
    return (
        <button
        onClick={onClick}
        disabled={isLoading || disabled}
        className="w-full flex items-center justify-center p-4 text-lg font-bold bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 shadow-lg shadow-cyan-500/30"
        >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
            </>
        ) : (
            'Generate Mockup'
        )}
        </button>
    );
};
