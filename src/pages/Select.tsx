import React from 'react';
import type { Option } from '../types';
import { useWorkout } from '../store/WorkoutContext';

const options: Option[] = [
  { emoji: '💪', label: 'Плечи', value: 'shoulders' },
  { emoji: '🍑', label: 'Ягодицы', value: 'glutes' },
  { emoji: '🧘‍♀️', label: 'Коррекция', value: 'correction' }
];

const Select: React.FC = () => {
  const { navigate } = useWorkout();

  const handleSelection = (value: Option['value']) => {
    switch (value) {
      case 'correction':
        navigate({ name: 'done', workoutId: 0 });
        break;
      case 'shoulders':
        navigate({ name: 'program', workoutId: 1 });
        break;
      case 'glutes':
        navigate({ name: 'program', workoutId: 2 });
        break;
    }
  };

  return (
    <div>
      <h1>Выберите тренировку</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelection(option.value)}
            style={{
              padding: '16px',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '24px' }}>{option.emoji}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;