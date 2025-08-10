# Workout App Requirements

## Tech Stack Recommendations
- **State Management**: Keep current WorkoutContext pattern, extend for workout data
- **Routing**: Continue with current screen-based navigation (simpler than React Router)
- **Database**: Use localStorage with JSON for simplicity (no external dependencies)
- **UI Language**: Russian for user interface

## Application Screens

### 1. Workout Selection Screen ✅ (exists)
**Navigation:**
- `correction` → Done Screen
- `shoulders` (workout=1) or `glutes` (workout=2) → Program Screen

### 2. Workout Program Screen
**Components:**
- Progress bar: `completed sets / total sets for all exercises`
- Exercise list with:
  - Exercise name
  - Sets/reps display
  - Weight with +/- buttons (format: "по 15kg" for equipment_type=2)
  - "Готово" button per set
  - Rest time (if `relax_between` exists)
- "Завершить" button → Done Screen  
- Back button → Selection Screen

**Behavior:**
- Click "Готово" → mark set completed, update progress
- If rest time exists & not last set → Timer Screen
- Weight +/- buttons → update weight in storage for next session
- Preserve progress if app closed/reopened

### 3. Done Screen
**Content:**
- Checkmark icon
- Text: "Тренировка {workout_name} успешно записана в календарь"
- "К тренировкам" button → Selection Screen

### 4. Timer Screen  
**Components:**
- Countdown timer (from `relax_between` seconds)
- "Пауза" button (pause/resume)
- "Заново" button (restart timer)
- "Пропустить" button (skip rest)

**Behavior:**
- Timer ends → return to Program Screen (preserve progress)
- All buttons → return to Program Screen

## Data Structure

### Database Schema (to implement in localStorage)
```sql
training_exercises:
- id: number
- name: string  
- equipment_type: 1|2 (1=single equipment, 2=paired like dumbbells)
- weight: number
- order: number (exercise order in workout)
- sets: number
- reps: number  
- relax_between: number|null (rest seconds)
- workout: 1|2 (1=shoulders, 2=glutes)
```

### Extended Screen Types
```typescript
Screen = 
  | { name: 'select' }
  | { name: 'program'; workout: 1|2; title: string }
  | { name: 'timer'; seconds: number; exerciseId: number; setNumber: number }
  | { name: 'done'; title: string }
```

### Progress State
```typescript
WorkoutProgress = {
  workoutId: 1|2
  exercises: {
    [exerciseId]: {
      completedSets: number[]  // array of completed set indices
      currentWeight: number    // updated weight for this exercise
    }
  }
}
```

## Implementation Notes
- Use single-user app approach (no authentication needed)
- Persist workout progress and updated weights to localStorage
- Key localStorage keys: `workout-progress`, `exercise-weights-{workoutId}`
- Handle app restoration from localStorage on startup