export interface Exercise {
  id: number;
  name: string;
  equipment_type: number;
  weight: number;
  order: number;
  sets: number;
  reps: number;
  relax_between?: number;
  workout: number;
}

export const mockShoulderExercises: Exercise[] = [
  {
    id: 1,
    name: 'Сгибание вбок',
    equipment_type: 1,
    weight: 3,
    order: 1,
    sets: 1,
    reps: 10,
    workout: 1
  },
  {
    id: 2,
    name: 'Разгибание гантели вверх',
    equipment_type: 1,
    weight: 3,
    order: 2,
    sets: 1,
    reps: 10,
    workout: 1
  },
  {
    id: 3,
    name: 'Подъем наверх с ногой',
    equipment_type: 1,
    weight: 3,
    order: 3,
    sets: 1,
    reps: 10,
    workout: 1
  },
  {
    id: 4,
    name: 'Русалка',
    equipment_type: 1,
    weight: 3,
    order: 4,
    sets: 1,
    reps: 12,
    workout: 1
  },
  {
    id: 5,
    name: 'Треугольник',
    equipment_type: 1,
    weight: 3,
    order: 5,
    sets: 1,
    reps: 15,
    workout: 1
  },
  {
    id: 6,
    name: 'Тяга в наклоне (спина)',
    equipment_type: 1,
    weight: 8,
    order: 6,
    sets: 3,
    reps: 12,
    relax_between: 60,
    workout: 1
  },
  {
    id: 7,
    name: 'Червячок на 3',
    equipment_type: 0, // no equipment
    weight: 25,
    order: 7,
    sets: 3,
    reps: 12,
    relax_between: 75,
    workout: 1
  },
  {
    id: 8,
    name: 'Жим сидя (наверх)',
    equipment_type: 2,
    weight: 5,
    order: 8,
    sets: 3,
    reps: 12,
    relax_between: 60,
    workout: 1
  },
  {
    id: 9,
    name: 'Подъём гантелей в сторону',
    equipment_type: 2,
    weight: 2,
    order: 9,
    sets: 3,
    reps: 15,
    relax_between: 75,
    workout: 1
  }
];

export const mockWorkouts = {
  1: {
    id: 1,
    name: 'Плечи',
    exercises: mockShoulderExercises
  },
  2: {
    id: 2,
    name: 'Ягодицы',
    exercises: [] // TODO: добавить упражнения для ягодиц
  }
};

export const equipmentTypes = {
  0: 'Без оборудования',
  1: 'Single', // одна гантель/эспандер
  2: 'Double'  // пара гантелей/эспандеров
};