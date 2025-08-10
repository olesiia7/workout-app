# Implementation Plan: Workout App

## 🎯 Current Status
- ✅ **Foundation**: Mock data, types, WorkoutContext with localStorage persistence
- ✅ **Select Screen**: Working with navigation to Program/Done screens  
- ✅ **App Integration**: Screen routing implemented
- 🚧 **Next**: Implement Program and Done screens

## Phase 2: Core Implementation

### 2.2 Program Screen  
- [ ] Implement `src/pages/Program.tsx`:
  - Workout progress bar
  - Exercise list with sets
  - +/- buttons for weight adjustment
  - "Готово" button for each set
  - "Завершить" and "Назад" buttons
- [ ] Extend `WorkoutContext` to manage:
  - Current workout program (from mock data)
  - Session progress (localStorage)
  - Weight updates locally

### 2.3 Timer Screen
- [ ] Create `src/pages/Timer.tsx`:
  - Countdown timer
  - "Пауза", "Заново", "Пропустить" buttons
  - Auto-return to Program after completion

### 2.4 Done Screen
- [ ] Implement `src/pages/Done.tsx`:
  - Checkmark icon
  - Success message
  - Return to selection button

## Phase 3: Polish & Integration

### 3.1 Core Features
- [ ] Test complete app flow
- [ ] Verify session persistence on close/reopen
- [ ] Basic styling and mobile layout

### 3.2 Supabase Integration (Optional)
- [ ] Setup Supabase client
- [ ] Replace mock data with database
- [ ] Add weight synchronization