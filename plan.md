# Implementation Plan: Workout App

## 🏗️ Phase 1: Foundation with Mock Data

### 1.1 Mock Data Setup
- [x] Create mock data file `src/data/mockData.ts` with:
  - Exercise interface and mock shoulder exercises
  - Workout definitions (shoulders=1, glutes=2)  
  - Equipment types (0=no equipment, 1=single, 2=double)
- [x] Update `src/types.ts`:
  - Import and use Exercise interface from mock data
  - Extend `Screen` types for timer and program screens
  - Add localStorage session data types

### 1.2 WorkoutContext Extension
- [ ] Extend `WorkoutContext` to manage:
  - Current workout program (from mock data)
  - Session progress (localStorage)
  - Weight updates locally
- [ ] Add methods:
  - `loadWorkout(id)` - get program from mock data
  - `saveProgress()`, `loadProgress()` - localStorage session
  - `updateWeight(exerciseId, weight)` - local updates
  - `completeWorkout()` - clear session, show done
- [ ] Integrate localStorage for session persistence

## 🎯 Phase 2: Core Implementation

### 2.1 Selection Screen
- [ ] Create `src/pages/Select.tsx` with selection buttons
- [ ] Add navigation handlers:
  - correction → Done screen
  - shoulders/glutes → Program screen
- [ ] Style with emojis and Russian text

### 2.2 Program Screen  
- [ ] Create `src/pages/Program.tsx`:
  - Workout progress bar
  - Exercise list with sets
  - +/- buttons for weight adjustment
  - "Готово" button for each set
  - "Завершить" and "Назад" buttons
- [ ] Create component `src/components/ExerciseItem.tsx`
- [ ] Create component `src/components/ProgressBar.tsx`
- [ ] Progress update logic for completed sets

### 2.3 Timer Screen
- [ ] Create `src/pages/Timer.tsx`:
  - Countdown timer
  - "Пауза", "Заново", "Пропустить" buttons
  - Auto-return to Program after completion
- [ ] Create hook `src/hooks/useTimer.ts` for timer management

### 2.4 Done Screen
- [ ] Create `src/pages/Done.tsx`:
  - Checkmark icon
  - Success message
  - Return to selection button

## 🎨 Phase 3: UI/UX & Polish

### 3.1 Styling & Responsiveness
- [ ] Update `src/App.css` for modern design
- [ ] Create UI components:
  - `src/components/Button.tsx`
  - `src/components/Card.tsx` 
  - `src/components/Timer.tsx`
- [ ] Responsive mobile layout
- [ ] Dark/light theme (optional)

### 3.2 User Experience
- [ ] Screen transition animations
- [ ] Timer completion sound notifications
- [ ] Haptic feedback (vibration)
- [ ] Loading indicators

### 3.3 Error Handling & Edge Cases
- [ ] Exercise data validation
- [ ] localStorage error handling
- [ ] App state integrity checks
- [ ] Fallback UI for invalid data

## 🔧 Phase 4: Integration & Testing

### 4.1 Component Integration
- [ ] Update `src/App.tsx` to render all screens
- [ ] Configure proper screen navigation
- [ ] Test complete app flow

### 4.2 Optimization & Refactoring
- [ ] Performance optimization (useMemo, useCallback)
- [ ] Code splitting into logical modules
- [ ] Remove unused code
- [ ] TypeScript type checking

### 4.3 Final Testing
- [ ] Test all usage scenarios
- [ ] Verify session persistence on close/reopen
- [ ] Test Supabase synchronization (online/offline)
- [ ] Test weight updates and persistence
- [ ] Test different screen sizes
- [ ] Verify localStorage cleanup on completion

## 🔗 Phase 5: Supabase Integration

### 5.1 Database Setup  
- [ ] Setup Supabase client in `src/lib/supabase.ts`
- [ ] Create data service `src/services/workoutService.ts` for Supabase operations
- [ ] Migrate mock data structure to Supabase tables
- [ ] Setup database schema for exercises and workouts

### 5.2 Data Service Layer
- [ ] Replace mock data calls with Supabase queries
- [ ] Add weight synchronization to database
- [ ] Implement offline/online data sync
- [ ] Add error handling for database operations
- [ ] Update WorkoutContext to use Supabase service

## 📦 Phase 6: Production Ready

### 6.1 Build & Deploy
- [ ] Configure production build
- [ ] Bundle optimization
- [ ] PWA manifest setup (if needed)
- [ ] Telegram Mini App preparation

### 6.2 Documentation & Metadata
- [ ] Update README.md
- [ ] Add screenshots to documentation
- [ ] Update package.json metadata

## ⚡ Dependencies & Execution Order

**Critical Path:**
1. Phase 1.1 → 1.2 (mock data and types needed for context)
2. Phase 1.2 → 2.1-2.4 (context needed for all screens)
3. Phases 2.1-2.4 → 3.1-3.2 (functionality before styling)
4. All previous → Phase 4 (integration at the end)
5. Phase 4 → Phase 5 (Supabase integration after all features work)
6. Phase 5 → Phase 6 (production deployment)

**Parallel Work:**
- Screens 2.1-2.4 after context is ready
- Styling 3.1 can run parallel with functionality
- UX improvements 3.2 after basic functionality

**Estimated Time:** 2-3 days of active development with phased approach.