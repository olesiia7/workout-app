import React, { useState, useEffect } from 'react';
import { useWorkout } from '../store/WorkoutContext';
import styles from './Timer.module.css';

interface TimerScreenProps {
  seconds: number;
}

const Timer: React.FC<TimerScreenProps> = ({ seconds }) => {
  const { navigate, currentWorkout } = useWorkout();
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          navigate({ name: 'program', workoutId: currentWorkout?.id || 0 });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeLeft, navigate, currentWorkout]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleSkip = () => {
    navigate({ name: 'program', workoutId: currentWorkout?.id || 0 });
  };

  const progress = ((seconds - timeLeft) / seconds) * 100;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Отдых</h1>
      
      <div className={styles.timerDisplay}>
        <div className={styles.progressRing}>
          <svg className={styles.progressSvg} viewBox="0 0 120 120">
            <circle
              className={styles.progressBackground}
              cx="60"
              cy="60"
              r="54"
            />
            <circle
              className={styles.progressFill}
              cx="60"
              cy="60"
              r="54"
              style={{
                strokeDashoffset: 339.29 - (339.29 * progress) / 100
              }}
            />
          </svg>
          <div className={styles.timeText}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.controlButton} ${styles.pauseButton}`}
          onClick={handlePauseResume}
        >
          {isPaused ? '▶️' : '⏸️'}
        </button>

        <button
          className={`${styles.controlButton} ${styles.skipButton}`}
          onClick={handleSkip}
        >
          ⏭️
        </button>
      </div>

      <div className={styles.pausedIndicatorContainer}>
        {isPaused && (
          <div className={styles.pausedIndicator}>
            Таймер на паузе
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;