# Appie Gym

A modern, dark kickboxing-gym website built with Angular, TypeScript, and Tailwind CSS.

## Features

- **Home page** — hero, programs (Kickboxing / Boxing / MMA / Conditioning), today's classes, pricing, and contact/footer.
- **Weekly schedule** (`/schedule`) — browse this week's classes by day and discipline, see live spots-left, and reserve a class.
- **Member sign-in** — a lightweight name + email check-in (no password) used to attribute reservations. Stored in the browser's `localStorage`.
- **My Bookings** (`/my-bookings`) — see and cancel your reservations for the week.

## Getting started

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

## Architecture

- Standalone Angular components throughout (no NgModules), using the modern `@if`/`@for` control-flow syntax and signal-based `input()`/`output()`.
- [`BookingService`](src/app/services/booking.service.ts) — an injectable root service holding member/reservation state as Angular signals, persisted to `localStorage`.
- [`src/app/data/schedule.ts`](src/app/data/schedule.ts) — the static weekly class schedule (template data; actual calendar dates are computed at runtime).
- Styling via Tailwind CSS v4 (through `@tailwindcss/postcss`, configured in [`.postcssrc.json`](.postcssrc.json)).

## Notes on data

This is a front-end prototype: there is no backend, so reservations are stored per-browser and won't sync across devices. To make this production-ready for real members, swap `BookingService`'s `localStorage` persistence for calls to a real API/database.

## Scripts

- `npm start` — start the dev server (`ng serve`)
- `npm run build` — build for production
- `npm test` — run unit tests (Karma/Jasmine)
