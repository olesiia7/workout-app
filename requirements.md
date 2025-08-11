# Workout App Requirements

## Application Architecture

### Core Flow
1. **Select Screen** (`src/pages/Select.tsx`) - User chooses workout type
2. **Program Screen** (`src/pages/Program.tsx`) - Exercise completion with progress tracking  
3. **Done Screen** (`src/pages/Done.tsx`) - Success confirmation and navigation

### State Management (`src/store/WorkoutContext.tsx`)
- **Navigation**: Screen-based routing using discriminated unions
- **Progress Tracking**: Simple completed sets counter (`SessionProgress.completedSets`)
- **Weight Management**: Per-exercise weight changes with persistence
- **Session Persistence**: `usePersistedState()` hook saves to localStorage automatically

## Core Logic

### Exercise Progression
- **One-at-a-time completion**: Only one exercise is active, others wait
- **Progress calculation**: `getCurrentExerciseAndSet()` determines current exercise from total completed sets
- **Exercise states**: Active (purple styling) → Completed (gray, moved to bottom)
- **Weight tracking**: ±1kg adjustments with visual indicators (↑ green, ↓ red)

### Data Structures

#### Exercise Schema (see `src/data/mockData.ts`)

#### Session Progress (see `src/types.ts`)

#### Screen Navigation (see `src/types.ts`)

## UI Logic

### Program Screen Behavior
- **Exercise ordering**: Active exercises first, then completed at bottom (see `sortedActiveExercises`, `sortedCompletedExercises`)
- **Progress display**: Shows completion counter (0/3, 1/3, etc.) only for active exercise
- **Weight controls**: Only visible for `equipment_type > 0`, disabled for completed exercises
- **Navigation buttons**: Smart placement before completed exercises (see navigation button logic)

### Visual States
- **Active exercise**: Purple theme (`#6f42c1`), scaled up, shadow effect
- **Completed exercise**: Gray styling, scaled down, "✓ Готово" button
- **Weight changes**: Arrow indicators with colors (see `getWeightChangeIcon()`)

## Technical Implementation

### Styling
- **CSS Modules**: Each component has `.module.css` file
- **Purple theme**: Consistent `#6f42c1` accent color throughout
- **Responsive design**: Touch-friendly controls, mobile-first approach

### Data Flow
1. Load workout from `mockWorkouts` (see `loadWorkout()`)
2. Track progress in localStorage via `usePersistedState()`
3. Calculate exercise states from total progress
4. Update UI based on current exercise state
5. Clear session on workout completion

### Future Integration Points
- **Timer Screen**: Optional rest periods (see `relax_between` field)
- **Supabase**: Replace mock data with database queries
- **Weight sync**: Batch upload weight changes on completion