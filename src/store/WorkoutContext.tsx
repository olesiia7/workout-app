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
    if (!sessionProgress || !currentWorkout) return;
    
    const newCompletedSets = sessionProgress.completedSets + 1;
    
    setSessionProgress({
      ...sessionProgress,
      completedSets: newCompletedSets
    });

    // Check if we should start a timer
    const getExerciseInfo = () => {
      let setsCount = 0;
      for (const exercise of currentWorkout.exercises) {
        const exerciseEndCount = setsCount + exercise.sets;
        
        // If we just completed a set that belongs to this exercise
        if (sessionProgress.completedSets < exerciseEndCount && newCompletedSets <= exerciseEndCount) {
          const isLastSetOfExercise = newCompletedSets === exerciseEndCount;
          return { 
            exercise, 
            isLastSetOfExercise,
            isLastSetOfWorkout: newCompletedSets === currentWorkout.exercises.reduce((sum, ex) => sum + ex.sets, 0)
          };
        }
        setsCount = exerciseEndCount;
      }
      return null;
    };

    const exerciseInfo = getExerciseInfo();
    
    // Start timer if:
    // 1. There's a rest period defined for the exercise we just completed a set for
    // 2. It's NOT the last set of that exercise
    // 3. It's NOT the last set of the entire workout
    if (exerciseInfo?.exercise.relax_between && 
        !exerciseInfo.isLastSetOfExercise && 
        !exerciseInfo.isLastSetOfWorkout) {
      navigate({ name: 'timer', seconds: exerciseInfo.exercise.relax_between });
    }
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