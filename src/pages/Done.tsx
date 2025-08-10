import React from 'react';

interface DoneScreenProps {
  workoutId: number;
}

const Done: React.FC<DoneScreenProps> = ({ workoutId }) => {
  return (
    <div>
      <h1>Done Screen</h1>
      <p>Screen: done</p>
      <p>WorkoutId: {workoutId}</p>
    </div>
  );
};

export default Done;