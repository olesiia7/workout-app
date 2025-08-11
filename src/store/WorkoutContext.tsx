import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Screen, SessionProgress } from '../types';
import { mockWorkouts } from '../data/mockData';
import type { Exercise } from '../data/mockData';

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
  
  // Workout data
  currentWorkout: { id: number; name: string; exercises: Exercise[] } | null;
  loadWorkout: (workoutId: number) => void;
  
  // Session progress
  sessionProgress: SessionProgress | null;
  updateWeight: (exerciseId: number, newWeight: number) => void;
  completeSet: () => void;
  completeWorkout: () => void;
};

const WorkoutContext = createContext<Ctx | null>(null);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = usePersistedState<Screen>('current-screen', { name: 'select' });
  const [sessionProgress, setSessionProgress] = usePersistedState<SessionProgress | null>('current-workout', null);
  const [currentWorkout, setCurrentWorkout] = useState<{ id: number; name: string; exercises: Exercise[] } | null>(null);

  const navigate = (next: Screen) => setScreen(next);
  const reset = () => setScreen({ name: 'select' });

  const loadWorkout = (workoutId: number) => {
    const workout = mockWorkouts[workoutId as keyof typeof mockWorkouts];
    if (workout) {
      setCurrentWorkout(workout);
      
      // Initialize session progress only if not exists or different workout
      if (!sessionProgress || sessionProgress.workoutId !== workoutId) {
        const newProgress: SessionProgress = {
          workoutId,
          completedSets: 0,
          updatedWeights: {}
        };
        setSessionProgress(newProgress);
      }
      // If sessionProgress exists for the same workoutId, it will be preserved automatically
    }
  };

  const updateWeight = (exerciseId: number, newWeight: number) => {
    if (!sessionProgress) return;
    
    setSessionProgress({
      ...sessionProgress,
      updatedWeights: {
        ...sessionProgress.updatedWeights,
        [exerciseId]: newWeight
      }
    });
  };

  const completeSet = () => {
    if (!sessionProgress) return;
    
    setSessionProgress({
      ...sessionProgress,
      completedSets: sessionProgress.completedSets + 1
    });
  };

  const completeWorkout = () => {
    setSessionProgress(null); // Clear session
    navigate({ name: 'done', workoutId: currentWorkout?.id || 0 });
  };

  const value = useMemo(() => ({ 
    screen, navigate, reset,
    currentWorkout, loadWorkout,
    sessionProgress, updateWeight, completeSet, completeWorkout
  }), [screen, currentWorkout, sessionProgress, navigate, reset, loadWorkout, updateWeight, completeSet, completeWorkout]);
  
  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
};

export const useWorkout = () => {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error('useWorkout must be used within WorkoutProvider');
  return ctx;
};