# Arcane Kitchen

**Arcane Kitchen** is a desktop-first batch recipe planning and publishing studio. It turns one core protein and pantry preferences into a full week of structured, styled recipe guides.

## Features

- **Batch Recipe Planning** — Select a core protein and pantry staples to generate a coherent week of recipe concepts
- **Three-Panel Builder** — Configure, review concepts, and preview with live theme styling simultaneously
- **Recipe Detail Editor** — Six-tab editor for content, ingredients, steps, notes, style, and preview
- **Theme System** — Four editorial themes: Arcane Editorial, Ayurvedic Kitchen, Rustic Pantry, and Meal Prep Clean
- **Export Center** — Export batches as PDF, PNG recipe cards, or shareable web pages

## Tech Stack

- **Next.js 14+** (App Router) with TypeScript
- **Tailwind CSS v4** with custom pine/cream/brass/olive colour palette
- **Lucide React** icons
- Mock data and API stubs (no backend required)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages (pricing, samples, sign-in)
│   ├── (app)/             # Authenticated pages (dashboard, batches, recipes, themes, exports, settings)
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Reusable UI primitives (Button, Card, Badge, Input, Select, Tabs, Modal)
│   ├── layout/            # Layout components (Sidebar, Header, AppLayout, PublicLayout)
│   ├── batch/             # Batch builder components (SetupPanel, RecipeBoard, LivePreview)
│   ├── recipe/            # Recipe editor tabs
│   ├── themes/            # Theme card and preview components
│   └── export/            # Export centre
├── lib/
│   ├── mock-data.ts       # Sample batches, concepts, recipes, themes
│   ├── api.ts             # Async API stub functions
│   └── utils.ts           # Utility functions (cn, formatTime, formatDate, slugify)
└── types/
    └── index.ts           # All TypeScript type definitions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Public homepage |
| `/pricing` | Pricing plans |
| `/samples` | Sample recipes |
| `/sign-in` | Sign in |
| `/dashboard` | Studio dashboard with batch overview |
| `/batches` | All batches list |
| `/batches/[id]` | Three-panel batch builder |
| `/recipes/[id]` | Recipe detail editor |
| `/themes` | Theme selector with live preview |
| `/exports` | Export centre |
| `/settings` | Account settings |
