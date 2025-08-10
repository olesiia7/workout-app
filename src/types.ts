export type Option = {
    emoji: string;
    label: string;
    value: 'shoulders' | 'glutes' | 'correction';
}

export type Screen =
  | { name: 'select' }
  | { name: 'program'; workoutId: number }
  | { name: 'timer'; seconds: number }
  | { name: 'done'; workoutId: number };

export type SessionProgress = {
  workoutId: number;
  currentExerciseIndex: number;
  currentSetIndex: number;
  updatedWeights: { [exerciseId: number]: number };
};