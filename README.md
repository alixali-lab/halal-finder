# Halal Finder (Vite + React + Tailwind)

This is a minimal scaffold for the Halal Finder app you asked for. The app stores user-added places in `localStorage` and opens addresses in Google Maps. The UI uses white & green colors.

## Quick start (copy-paste)

1. Install Node.js (v18+ recommended): https://nodejs.org/
2. Extract this zip and open a terminal in the project folder.

```bash
npm install
npm run dev
```

3. Open `http://localhost:5173` (Vite default) to view the site.

## Build for production

```bash
npm run build
npm run preview
```

## Deploy

- Push to GitHub and connect the repo to Vercel (recommended). Vercel will build automatically.
- Or use Netlify / other static hosts.

## Notes
- No external APIs are used. Data persists in the browser's localStorage only.
- The donation link is included at the bottom.
