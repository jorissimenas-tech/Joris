import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (goal: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-surface rounded-2xl p-2 border border-slate-700 shadow-xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. I need to clean my room but it's a disaster..."
          className="w-full bg-transparent text-white p-4 text-lg placeholder-slate-500 focus:outline-none resize-none h-32 rounded-xl"
          disabled={isLoading}
        />
        <div className="flex justify-between items-center px-2 pb-2">
          <span className="text-xs text-slate-500 font-medium px-2">
            Press Enter ↵
          </span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all
              ${!input.trim() || isLoading 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary to-accent text-white hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/50'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                Unstick Me
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Suggestions */}
      {!isLoading && !input && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <button 
            type="button"
            onClick={() => setInput("I want to start a side project but feel overwhelmed.")}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 transition"
          >
            🚀 Start a side project
          </button>
          <button 
            type="button"
            onClick={() => setInput("My room is messy and I don't know where to start.")}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 transition"
          >
            🧹 Clean messy room
          </button>
          <button 
            type="button"
            onClick={() => setInput("I have an essay due tomorrow and haven't started.")}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 transition"
          >
            📚 Essay panic
          </button>
        </div>
      )}
    </form>
  );
};

export default InputForm;