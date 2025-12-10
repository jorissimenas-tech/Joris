import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { BreakdownStep } from '../types';

interface StepListProps {
  steps: BreakdownStep[];
  vibe: string;
  onToggle: (id: string) => void;
  onReset: () => void;
}

const StepList: React.FC<StepListProps> = ({ steps, vibe, onToggle, onReset }) => {
  const completedCount = steps.filter(s => s.completed).length;
  const progress = Math.round((completedCount / steps.length) * 100);
  const isAllDone = progress === 100;

  return (
    <div className="w-full max-w-lg mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Vibe Check Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6 text-center">
        <h3 className="text-secondary font-bold text-sm uppercase tracking-wider mb-1">Vibe Check</h3>
        <p className="text-white text-lg font-medium">"{vibe}"</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span className="text-slate-400">Progress</span>
          <span className={isAllDone ? 'text-green-400' : 'text-primary'}>{progress}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            onClick={() => onToggle(step.id)}
            className={`
              relative overflow-hidden rounded-xl border p-4 cursor-pointer transition-all duration-200
              ${step.completed 
                ? 'bg-slate-900/50 border-slate-800 opacity-60' 
                : 'bg-surface border-slate-700 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <button className={`mt-1 flex-shrink-0 transition-colors ${step.completed ? 'text-green-500' : 'text-slate-500'}`}>
                {step.completed ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
              <div className="flex-1">
                <h4 className={`text-lg font-semibold ${step.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                  {step.title}
                </h4>
                <p className={`text-sm mt-1 ${step.completed ? 'text-slate-500 line-through' : 'text-slate-400'}`}>
                  {step.description}
                </p>
                {!step.completed && (
                  <div className="mt-3 inline-block bg-slate-800/80 rounded-lg px-2 py-1 text-xs text-secondary font-medium border border-slate-700/50">
                    💡 {step.motivation}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Reset */}
      {isAllDone && (
        <div className="mt-8 text-center animate-bounce">
          <p className="text-2xl mb-4">🎉 Sheesh! You crushed it! 🎉</p>
          <button 
            onClick={onReset}
            className="text-slate-400 hover:text-white underline underline-offset-4 decoration-slate-600 transition"
          >
            Start a new task
          </button>
        </div>
      )}

       {!isAllDone && (
         <div className="mt-8 text-center">
            <button 
            onClick={onReset}
            className="text-sm text-slate-500 hover:text-slate-300 transition"
          >
            Clear and start over
          </button>
         </div>
       )}
    </div>
  );
};

export default StepList;