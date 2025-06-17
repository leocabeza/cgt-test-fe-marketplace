# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React marketplace MVP testing project built with Create React App. The application currently implements basic navigation between pages using `window.location.pathname` checks and needs full cart functionality implementation.

## Commands

- `pnpm start` - Runs development server on http://localhost:3000
- `pnpm test` - Runs tests in interactive watch mode
- `pnpm run build` - Creates production build in `build/` folder
- `pnpm run eject` - Ejects from Create React App (irreversible)

## Architecture

The application is currently a single-page app with manual routing:

- **App.js**: Main component handling all routing logic via `window.location.pathname`
- **Navigation**: Basic header with Home and Cart links
- **Products**: Two products (A and B) with hardcoded data and non-functional "Add to cart" buttons
- **Cart**: Empty cart implementation with placeholder `cartItems()` function

The project needs:

1. Proper state management for cart functionality
2. Working add-to-cart functionality
3. Total price calculations
4. Improved UI/UX and styling
5. Updated tests (current test is a default CRA test that doesn't match the actual app)

## Key Implementation Notes

- Uses inline styles and basic HTML structure
- No routing library (uses manual `window.location.pathname` checks)
- Product data is hardcoded in the component
- Cart functionality is stubbed with placeholder functions
- Testing framework is React Testing Library with Jest

## Dependency Management

- Always use pnpm to install/update remove dependencies for this project

## Routing Guidance

- Let's keep all react-router imports to react-router package and not react-router-dom

## Code Best Practices

- Prefer for...of instead of forEach
- When doing cleanup/modifications, make sure to remove unused imports and/or variables

## Testing Guidelines

- When creating unit tests, make sure not to test css/styles/classes, just functionality
