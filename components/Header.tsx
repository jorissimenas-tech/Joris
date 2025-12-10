import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
          Anti-Stuck AI
        </h1>
      </div>
      <p className="text-slate-400 text-lg max-w-md">
        Overwhelmed? Don't ghost your goals. Let's break it down, bestie. ✨
      </p>
    </header>
  );
};

export default Header;