import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!isLoading) {
                onSubmit();
            }
        }
    };
    
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., Add a llama next to the person"
        className="flex-grow w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-none"
        rows={2}
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="flex-shrink-0 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
};

export default PromptInput;
