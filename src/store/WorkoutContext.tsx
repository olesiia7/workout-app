import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Screen } from '../types';

function usePersistedState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch { /* noop */ }
  }, [key, state]);
  
  return [state, setState] as const;
}

type Ctx = {
  screen: Screen;
  navigate: (next: Screen) => void;
  reset: () => void;
};

const WorkoutContext = createContext<Ctx | null>(null);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = usePersistedState<Screen>('current-screen', { name: 'select' });

  const navigate = (next: Screen) => setScreen(next);
  const reset = () => setScreen({ name: 'select' });

  const value = useMemo(() => ({ screen, navigate, reset }), [screen]);
  
  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};

export const useWorkout = () => {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error('useWorkout must be used within WorkoutProvider');
  return ctx;
};