import React from 'react';

interface ProgramScreenProps {
  workoutId: number;
}

const Program: React.FC<ProgramScreenProps> = ({ workoutId }) => {
  return (
    <div>
      <h1>Program Screen</h1>
      <p>Screen: program</p>
      <p>WorkoutId: {workoutId}</p>
    </div>
  );
};

export default Program;