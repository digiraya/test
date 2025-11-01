import React from 'react';

interface InstructionsInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const InstructionsInput: React.FC<InstructionsInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400">Step 3: Add Instructions (Optional)</h2>
      <textarea
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 placeholder-gray-500"
        rows={3}
        placeholder="e.g., 'Make the logo smaller and place it on the top left corner'"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
