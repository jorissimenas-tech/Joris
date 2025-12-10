export interface BreakdownStep {
  id: string;
  title: string;
  description: string;
  motivation: string; // E.g., "You got this bestie!"
  completed: boolean;
}

export interface AIResponseSchema {
  steps: {
    title: string;
    description: string;
    motivation: string;
  }[];
  overallVibe: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}