# Workout App Requirements

## Tech Stack Recommendations
- **State Management**: Keep current WorkoutContext pattern, extend for workout data
- **Routing**: Continue with current screen-based navigation (simpler than React Router)
- **Database**: Supabase for workout programs, localStorage for session progress
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
- Weight +/- buttons → update weight in localStorage (sync to Supabase on workout completion)
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

### Supabase Schema (existing)
```sql
training_exercises:
- id: number
- name: string  
- equipment_type: 1|2 (1=single equipment, 2=paired like dumbbells)
- weight: number (updated directly on weight changes)
- order: number (exercise order in workout)
- sets: number
- reps: number  
- relax_between: number|null (rest seconds)
- workout: 1|2 (1=shoulders, 2=glutes)
```

### localStorage Schema (session only)
```typescript
"current-workout" = {
  workoutId: 1|2,
  exercises: {
    [exerciseId]: {
      completedSets: number[], // indices of completed sets
      currentWeight: number    // may differ from Supabase until sync
    }
  }
}
```

### Extended Screen Types
```typescript
Screen = 
  | { name: 'select' }
  | { name: 'program'; workout: 1|2; title: string }
  | { name: 'timer'; seconds: number; exerciseId: number; setNumber: number }
  | { name: 'done'; title: string }
```

## Implementation Notes
- **Single-user approach**: No authentication needed
- **Session persistence**: Save current workout progress to localStorage for crash recovery
- **Weight updates**: Update Supabase immediately on weight change OR batch update on workout completion
- **Data flow**: 
  1. Load workout program from Supabase
  2. Track progress in localStorage during session
  3. On completion: sync changed weights to Supabase, clear localStorage
  4. Calendar integration for completed workouts
- **Offline support**: App works without internet during workout (sync weights later)