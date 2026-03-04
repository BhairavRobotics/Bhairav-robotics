

## Plan: Refine Homepage UI

### 1. Transparent Header with Scroll Effect
**File: `frontend/src/components/Header.jsx`**
- Remove `bg-background/80 backdrop-blur-md border-b border-border` from the default header state
- Add scroll listener: when `scrollY > 50`, apply `bg-background/90 backdrop-blur-md border-b border-border`; otherwise fully transparent
- Add smooth transition classes for the background change

### 2. Move Stats into Hero Section
**File: `frontend/src/sections/Hero.jsx`**
- Import `stats` from `@/data/siteData`
- Add stats strip at the bottom of the hero section (above the scroll indicator), positioned absolutely
- Display stats in a horizontal row with clean typography, no orange background
- Add `whileInView` fade-in/slide-up animation via Framer Motion
- Use semi-transparent text styling for a premium overlay look

**File: `frontend/src/pages/Index.jsx`**
- Remove `<StatsStrip />` import and usage (stats now live inside Hero)

### 3. Redesign Technical Specifications Section
**File: `frontend/src/sections/TechSpecs.jsx`**
- Add a subtle dark glass background (`bg-card/50 backdrop-blur-sm border border-border/50`)
- Improve tab buttons: larger padding, subtle bottom-border active indicator instead of full background fill
- Add `AnimatePresence` + `motion.div` with `key={activeTab}` for smooth tab content transitions
- Improve spec rows: add `hover:bg-white/5` effect, better padding, subtle separator lines
- Increase font weight contrast between labels and values

### 4. Remove Partners & Testimonials Sections
**File: `frontend/src/pages/Index.jsx`**
- Remove `<Partners />` and `<Testimonials />` imports and components from the page layout

No file deletions needed — just removing them from the page render.

### 5. Summary of Files Changed
- `frontend/src/components/Header.jsx` — transparent + scroll effect
- `frontend/src/sections/Hero.jsx` — embed stats overlay
- `frontend/src/sections/TechSpecs.jsx` — redesigned tabs and table
- `frontend/src/pages/Index.jsx` — remove StatsStrip, Partners, Testimonials

