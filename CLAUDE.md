# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build

**IMPORTANT**
- Never change or write code unless you are more than 70–80% confident in the solution.
- Ask questions and request more context if you are less than 80% confident in the solution.
- Document all of your code: create separate .md files and reference them from this instruction.

**Note:** No test command is configured in package.json scripts.

## Requirements

See `requirements.md` for complete application specifications, data structure, and implementation details.

## Implementation Plan

See `plan.md` for detailed phased implementation plan with tasks, dependencies, and timeline.

## Architecture

This is a React TypeScript workout application using Vite as the build tool.

### State Management
The app uses React Context for state management via `WorkoutContext`:
- **WorkoutProvider** (`src/store/WorkoutContext.tsx`): Manages navigation between screens and persists current screen to localStorage
- **useWorkout** hook: Custom hook to access workout context safely with error checking
- **usePersistedState** custom hook: Persists state to localStorage and restores on page load

### Screen-Based Navigation
The app follows a screen-based navigation pattern using discriminated unions:
- Screen type defined in `src/types.ts` with variants: `select`, `program`, `rest`, `done`
- Each screen has its own component in `src/pages/`
- Navigation is controlled through the WorkoutContext's `navigate()` and `reset()` functions

### Type Definitions
Core types in `src/types.ts`:
- **Screen**: Discriminated union defining all possible app screens with their data
- **Option**: Workout selection options (shoulders, glutes, correction)

### Project Structure
- `src/store/` - Context providers and state management
- `src/pages/` - Screen components (Select, Program, Rest, Done)
- `src/types.ts` - TypeScript type definitions
- Standard Vite + React setup with TypeScript