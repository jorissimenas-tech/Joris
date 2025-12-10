import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import StepList from './components/StepList';
import { breakDownTask } from './services/geminiService';
import { BreakdownStep, AppState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [steps, setSteps] = useState<BreakdownStep[]>([]);
  const [vibe, setVibe] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleTaskSubmit = async (goal: string) => {
    setAppState(AppState.LOADING);
    setErrorMsg("");

    try {
      const result = await breakDownTask(goal);
      
      const newSteps: BreakdownStep[] = result.steps.map((s, index) => ({
        id: crypto.randomUUID(),
        title: s.title,
        description: s.description,
        motivation: s.motivation,
        completed: false
      }));

      setSteps(newSteps);
      setVibe(result.overallVibe);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("Oof, the AI tripped. Try again maybe?");
      setAppState(AppState.ERROR);
    }
  };

  const toggleStep = (id: string) => {
    setSteps(current => 
      current.map(step => 
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const handleReset = () => {
    setSteps([]);
    setVibe("");
    setAppState(AppState.IDLE);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-white selection:bg-primary selection:text-white pb-20">
      
      <Header />

      <main className="container mx-auto px-4">
        
        {appState === AppState.IDLE && (
          <div className="animate-in fade-in duration-700">
            <InputForm onSubmit={handleTaskSubmit} isLoading={false} />
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center mt-12 animate-in fade-in duration-500">
            <InputForm onSubmit={() => {}} isLoading={true} />
            <p className="mt-8 text-slate-400 animate-pulse text-sm">
              Analyzing vibes... Breaking down the scary stuff...
            </p>
          </div>
        )}

        {appState === AppState.ERROR && (
           <div className="max-w-lg mx-auto mt-8 bg-red-900/20 border border-red-500/50 p-4 rounded-xl flex items-center gap-4 text-red-200">
             <AlertCircle className="w-6 h-6 flex-shrink-0" />
             <div>
               <p className="font-bold">Error</p>
               <p className="text-sm">{errorMsg}</p>
               <button 
                 onClick={handleReset}
                 className="mt-2 text-xs bg-red-500/20 hover:bg-red-500/40 px-3 py-1 rounded transition"
               >
                 Try Again
               </button>
             </div>
           </div>
        )}

        {appState === AppState.SUCCESS && (
          <StepList 
            steps={steps} 
            vibe={vibe} 
            onToggle={toggleStep}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default App;