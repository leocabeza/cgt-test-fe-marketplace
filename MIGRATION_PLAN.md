# React Marketplace Migration Plan

Migration from Create React App to Vite + React with modern tooling and proper functionality.

## Phase 1: Project Setup

- [x] Create new Vite + React project using `pnpm create vite`
- [x] Choose TypeScript template for better DX
- [x] Install and configure React Router DOM
- [x] Setup ESLint + Prettier with pre-commit hooks for code quality
- [x] Configure Vitest for testing
- [x] Initialize git repository and make initial commit

## Phase 2: Styling & UI Foundation

- [x] Install and configure Tailwind CSS
- [x] Create responsive layout components (Header, Footer, Layout)
- [x] Setup component structure for pages (Home, Products, Cart)
- [x] Implement mobile-first responsive design
- [x] Create base styling system (colors, typography, spacing)

## Phase 3: Data & Content Migration

- [x] Add react-query to mock data-fetching
- [x] Move product images (a.jpg, b.jpg) to new assets folder
- [x] Create proper product data structure (JSON/constants)
- [x] Migrate existing page content to new route components
- [x] Setup proper page routing with React Router
- [x] Implement navigation between pages
- [x] Add 404/Not Found page handling
- [x] Update ts config for relative paths
- [x] Lazy loading product images
- [x] Use local font instead of remote
- [x] SEO? (product url should have product title instead)
- [x] Can we cache some products in the client? Like they were created on build time?
- [x] standarize views
- [x] fix tests
- [x] remove react-query
- [x] Link component in vike?, getNavLinkClass looks broken

## Phase 4: Cart Functionality

- [ ] Choose state management solution (Context API vs Zustand)
- [ ] Implement cart state management (add, remove, update quantities)
- [ ] Create add-to-cart functionality for products
- [ ] Calculate totals and display cart items
- [ ] Add cart item counter in navigation
- [ ] Add persistence with localStorage
- [ ] Handle cart edge cases (empty cart, invalid items)

## Phase 5: Testing & Quality

- [x] Setup Vitest configuration
- [ ] Write tests for cart functionality
- [ ] Write tests for routing and navigation
- [ ] Add error boundaries for better error handling
- [ ] Test accessibility (a11y) compliance

## Phase 6: UX/UI Polish

- [ ] Review and improve navigation UX
- [ ] Add loading states and transitions
- [ ] Optimize images and performance
- [ ] Add hover effects and interactions
- [ ] Implement proper form validation if needed
- [ ] Add success/error notifications
- [ ] Final UI/UX review and improvements

## Phase 7: Deployment Ready

- [ ] Build optimization and bundle analysis
- [ ] Add SEO meta tags and page titles
- [ ] Setup deployment configuration (Vercel/Netlify)
- [ ] Add environment variables handling
- [ ] Final testing and cleanup
- [ ] Create production build and test
- [ ] Update documentation (README.md)

## Post-Migration Cleanup

- [ ] Archive or remove old CRA project files
- [ ] Update any documentation references
- [ ] Celebrate successful migration! 🎉

---

**Notes:**

- Each phase builds upon the previous one
- Test thoroughly after each major phase
- Commit changes frequently with descriptive messages
- Keep the old project as backup until migration is complete
