import React from 'react';
import './App.css';
import { WorkoutProvider, useWorkout } from './store/WorkoutContext';
import Select from './pages/Select';
import Program from './pages/Program';
import Done from './pages/Done';

const AppContent: React.FC = () => {
  const { screen } = useWorkout();

  switch (screen.name) {
    case 'select':
      return <Select />;
    case 'program':
      return <Program workoutId={screen.workoutId} />;
    case 'done':
      return <Done workoutId={screen.workoutId} />;
    case 'timer':
      // Timer component not implemented yet
      return <div>Timer: {screen.seconds}s</div>;
    default:
      return <Select />;
  }
};

function App() {
  return (
    <WorkoutProvider>
      <div className="App">
        <AppContent />
      </div>
    </WorkoutProvider>
  );
}

export default App;