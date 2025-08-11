import React, { useEffect } from 'react';
import { useWorkout } from '../store/WorkoutContext';
import type { Exercise } from '../data/mockData';
import styles from './Program.module.css';

interface ProgramScreenProps {
  workoutId: number;
}

const Program: React.FC<ProgramScreenProps> = ({ workoutId }) => {
  const { currentWorkout, loadWorkout, sessionProgress, updateWeight, completeSet, completeWorkout, navigate } = useWorkout();

  useEffect(() => {
    loadWorkout(workoutId);
  }, [workoutId, loadWorkout]);

  if (!currentWorkout) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  const totalSets = currentWorkout.exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
  const completedSets = sessionProgress?.completedSets || 0;

  const getCurrentExerciseAndSet = () => {
    let setsCount = 0;
    for (const exercise of currentWorkout.exercises) {
      if (setsCount + exercise.sets > completedSets) {
        return {
          exercise,
          currentSet: completedSets - setsCount,
          isCompleted: false
        };
      }
      setsCount += exercise.sets;
    }
    return { exercise: null, currentSet: 0, isCompleted: true };
  };

  const { exercise: currentExercise, currentSet, isCompleted } = getCurrentExerciseAndSet();

  const isExerciseCompleted = (exercise: Exercise) => {
    let setsCount = 0;
    for (const ex of currentWorkout.exercises) {
      if (ex.id === exercise.id) {
        return completedSets >= setsCount + exercise.sets;
      }
      setsCount += ex.sets;
    }
    return false;
  };

  const isExerciseActive = (exercise: Exercise) => {
    return currentExercise?.id === exercise.id;
  };

  const handleWeightChange = (exerciseId: number, delta: number) => {
    const exercise = currentWorkout.exercises.find(e => e.id === exerciseId);
    if (!exercise || exercise.equipment_type === 0) return;

    const currentWeight = sessionProgress?.updatedWeights[exerciseId] ?? exercise.weight;
    const newWeight = Math.max(0, currentWeight + delta);
    updateWeight(exerciseId, newWeight);
  };

  const getDisplayWeight = (exerciseId: number, originalWeight: number) => {
    return sessionProgress?.updatedWeights[exerciseId] ?? originalWeight;
  };

  const getWeightChangeIcon = (exerciseId: number, originalWeight: number) => {
    const currentWeight = getDisplayWeight(exerciseId, originalWeight);
    if (currentWeight > originalWeight) return '↑';
    if (currentWeight < originalWeight) return '↓';
    return '';
  };

  const formatWeight = (weight: number, equipmentType: number) => {
    if (equipmentType === 0) return '';
    if (equipmentType === 2) return `по ${weight}kg`;
    return `${weight}kg`;
  };

  // Split exercises into active/upcoming and completed
  const activeExercises = currentWorkout.exercises.filter(exercise => !isExerciseCompleted(exercise));
  const completedExercises = currentWorkout.exercises.filter(exercise => isExerciseCompleted(exercise));
  
  // Sort active exercises: active first, then by order
  const sortedActiveExercises = [...activeExercises].sort((a, b) => {
    const aActive = isExerciseActive(a);
    const bActive = isExerciseActive(b);
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    return a.order - b.order;
  });
  
  // Sort completed exercises by order
  const sortedCompletedExercises = [...completedExercises].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{currentWorkout.name}</h1>
      
      {/* Progress Bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressText}>Прогресс</span>
          <span className={styles.progressText}>{completedSets}/{totalSets} подходов</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${(completedSets / totalSets) * 100}%` }}
          />
        </div>
      </div>

      {/* Active/Upcoming Exercises */}
      <div className={styles.exerciseList}>
        {sortedActiveExercises.map((exercise) => {
          const exerciseActive = isExerciseActive(exercise);
          
          return (
            <div 
              key={exercise.id} 
              className={`${styles.exerciseCard} ${exerciseActive ? styles.active : ''}`}
            >
              <div className={styles.exerciseInfo}>
                <h3 className={styles.exerciseName}>{exercise.name}</h3>
                
                <div className={styles.exerciseDetails}>
                  <span className={styles.setsReps}>{exercise.sets} x {exercise.reps}</span>
                  
                  {/* Weight Controls - only show for exercises with equipment */}
                  {exercise.equipment_type > 0 && (
                    <div className={styles.weightControls}>
                      <button 
                        className={styles.weightButton}
                        onClick={() => handleWeightChange(exercise.id, -1)}
                      >
                        −
                      </button>
                      
                      <span className={styles.weightDisplay}>
                        {formatWeight(getDisplayWeight(exercise.id, exercise.weight), exercise.equipment_type)}
                        {getWeightChangeIcon(exercise.id, exercise.weight) && (
                          <span className={`${styles.weightIcon} ${
                            getDisplayWeight(exercise.id, exercise.weight) > exercise.weight 
                              ? styles.increase 
                              : styles.decrease
                          }`}>
                            {getWeightChangeIcon(exercise.id, exercise.weight)}
                          </span>
                        )}
                      </span>
                      
                      <button 
                        className={styles.weightButton}
                        onClick={() => handleWeightChange(exercise.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {exercise.relax_between && (
                  <div className={styles.restTime}>
                    Отдых: {exercise.relax_between}с
                  </div>
                )}
              </div>

              {/* Single Done Button with Counter - only show for active */}
              {exerciseActive && (
                <button
                  className={styles.doneButton}
                  onClick={completeSet}
                >
                  ✓ {currentSet}/{exercise.sets}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons - placed before completed exercises */}
      {sortedCompletedExercises.length > 0 && (
        <div className={styles.navigationButtons}>
          <button
            className={styles.backButton}
            onClick={() => navigate({ name: 'select' })}
          >
            Назад
          </button>
          
          <button
            className={styles.completeButton}
            onClick={completeWorkout}
          >
            Завершить
          </button>
        </div>
      )}

      {/* Completed Exercises */}
      {sortedCompletedExercises.length > 0 && (
        <div className={styles.exerciseList}>
          {sortedCompletedExercises.map((exercise) => (
            <div 
              key={exercise.id} 
              className={`${styles.exerciseCard} ${styles.completed}`}
            >
              <div className={styles.exerciseInfo}>
                <h3 className={styles.exerciseName}>{exercise.name}</h3>
                
                <div className={styles.exerciseDetails}>
                  <span className={styles.setsReps}>{exercise.sets} x {exercise.reps}</span>
                  
                  {/* Weight Display - read-only for completed */}
                  {exercise.equipment_type > 0 && (
                    <div className={styles.weightControls}>
                      <span className={styles.weightDisplay}>
                        {formatWeight(getDisplayWeight(exercise.id, exercise.weight), exercise.equipment_type)}
                        {getWeightChangeIcon(exercise.id, exercise.weight) && (
                          <span className={`${styles.weightIcon} ${
                            getDisplayWeight(exercise.id, exercise.weight) > exercise.weight 
                              ? styles.increase 
                              : styles.decrease
                          }`}>
                            {getWeightChangeIcon(exercise.id, exercise.weight)}
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {exercise.relax_between && (
                  <div className={styles.restTime}>
                    Отдых: {exercise.relax_between}с
                  </div>
                )}
              </div>

              <button className={`${styles.doneButton} ${styles.completed}`}>
                ✓ Готово
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Buttons - show at bottom if no completed exercises */}
      {sortedCompletedExercises.length === 0 && (
        <div className={styles.navigationButtons}>
          <button
            className={styles.backButton}
            onClick={() => navigate({ name: 'select' })}
          >
            Назад
          </button>
          
          <button
            className={styles.completeButton}
            onClick={completeWorkout}
          >
            Завершить
          </button>
        </div>
      )}
    </div>
  );
};

export default Program;