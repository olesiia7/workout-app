import React from 'react';
import { useWorkout } from '../store/WorkoutContext';
import styles from './Done.module.css';

interface DoneScreenProps {
  workoutId: number;
}

const Done: React.FC<DoneScreenProps> = ({ workoutId: _ }) => {
  const { navigate, currentWorkout } = useWorkout();

  const workoutName = currentWorkout?.name || 'тренировка';

  return (
    <div className={styles.container}>
      {/* Success Icon */}
      <div className={styles.successIcon}>
        ✅
      </div>
      
      {/* Success Message */}
      <h1 className={styles.title}>
        Отлично!
      </h1>
      
      <p className={styles.message}>
        Тренировка <strong>{workoutName}</strong><br />
        успешно записана в календарь
      </p>

      {/* Back to Workouts Button */}
      <button
        className={styles.backButton}
        onClick={() => navigate({ name: 'select' })}
      >
        <span className={styles.buttonIcon}>🏠</span>
        К тренировкам
      </button>
    </div>
  );
};

export default Done;