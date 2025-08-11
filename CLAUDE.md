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

## Project Overview

This is a React TypeScript workout application using Vite as the build tool. 

**Core functionality:** Single-user workout app where users select exercises (shoulders/glutes/correction), complete them one-by-one with progress tracking, and weight management. Progress persists in localStorage for session recovery.

**Architecture:** Screen-based navigation using React Context, CSS modules for styling, mock data for development.

## Documentation References

- **Full App Logic & Structure**: See `requirements.md` for complete application flow, data structures, and UI behavior
- **Implementation Checklist**: See `plan.md` for current status and detailed future development steps.
**Important**: never use code snippets in documentation, use refferences only.

## Project Structure
- `src/store/` - Context providers and state management
- `src/pages/` - Screen components with CSS modules (Select, Program, Done)
- `src/data/` - Mock data for exercises and workouts  
- `src/types.ts` - TypeScript type definitions