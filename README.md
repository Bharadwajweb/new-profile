# Bharadwaj M — Cybersecurity Portfolio

A cinematic, responsive portfolio built with React, TypeScript, Vite, Tailwind CSS, GSAP, Canvas particles, and Framer Motion.

## Run locally

```bash
pnpm install
pnpm dev
```

Create a production build with `pnpm build`; Vite writes the deployable site to `dist/`. `pnpm preview` serves that production build locally.

## Personalize before publishing

- Replace `public/portrait.png` with a portrait you have permission to use. Keep the filename and path. The Canvas effect reads the image pixels to place and color the particles; a high-contrast portrait against a dark background produces the clearest result.
- Set `contactEmail` in `src/data/portfolio.ts` to the address you want the contact link to use.
- Update the short project briefs and capability copy in `src/data/portfolio.ts` to match the work you want to present.

The intro respects `prefers-reduced-motion`, includes a skip control, and uses a desktop-only custom cursor. Vercel is configured to build with `pnpm build` and serve `dist/`.
