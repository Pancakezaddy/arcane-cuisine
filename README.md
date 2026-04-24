# Arcane Kitchen

Arcane Kitchen is a desktop-first web app that turns one core protein and a pantry profile into a batch of structured, styled recipe guides for a week of cooking. It is a batch recipe planning and publishing studio.

## Features

- **Pantry Fingerprint** — persistent user kitchen profile with categorized ingredient chips, toggleable staples, and saved presets (Mediterranean, Asian Pantry, Latin Kitchen). Influences batch generation to increase ingredient overlap and reduce unrealistic suggestions.
- **Leftover Chain Mode** — intentionally designs recipe sequences where one recipe feeds into another. Visual upstream/downstream indicators on recipe cards show chain relationships (e.g., Roast Chicken → Rice Bowls → Soup → Wraps → Grain Salad).
- **Budget Guardrail Mode** — user-selectable cost profiles: Cheapest Possible Week, Balanced Budget Week, Premium Week. Influences ingredient selection and estimated weekly cost displayed throughout the planner.
- **Weekly Kitchen Packet** — bundled export combining recipe zine pages, consolidated grocery list, prep notes, leftover map, and suggested weekly cook order into one cohesive planning document.

## Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Python FastAPI + Postgres (architecture ready; frontend runs on mock data)
- **Design**: Pine green + warm cream + muted gold palette, editorial serif headings, desktop-first

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard — stats, recent batches, pantry summary, packet exports |
| `/batch/new` | Generate a new batch plan |
| `/batch/[id]` | Three-panel batch builder: setup · recipe board · detail/export |
| `/pantry` | Pantry Fingerprint editor |

## Project Structure

```
src/
├── app/            # Next.js App Router pages
├── components/     # UI components
├── context/        # BatchContext global state
├── lib/            # Mock data and planner logic
└── types/          # TypeScript data models
```
