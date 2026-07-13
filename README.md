# Yoav Azulay — Portfolio

Personal portfolio built with **React + Vite + Tailwind CSS v4 + Framer Motion**.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Edit mode (owner only)

Visit **`/#edit`** on the site and enter the password (default: `vinyl-2026`).
A floating pill appears — open the editor to change any text, add/remove/reorder
projects (including their cover artwork), skills, timeline entries and links,
with live preview.

- Edits are saved as a **draft in your browser only** (localStorage).
- To publish: click **Export data files**, drop the downloaded
  `projects.js` / `site.js` into `src/data/`, commit and redeploy.
  The public site can only change through a deploy — that, not the password,
  is what keeps it owner-only.
- To change the password: `echo -n "new-password" | shasum -a 256` and paste
  the hash into `PASS_HASH` in [`src/admin/Admin.jsx`](src/admin/Admin.jsx).

## Project screenshots

Screenshots are static files: drop images into `public/projects/` (e.g.
`public/projects/solos/1.png`) and list their paths in the project's
`screenshots` array — either in `projects.js` or via the edit panel
(`/projects/solos/1.png`). An empty array shows placeholder boxes.

## Adding a new album-cover style

Cover artwork styles live in the `patterns` object in
[`src/components/AlbumCover.jsx`](src/components/AlbumCover.jsx). Each style is
a function that receives the cover's ink color and returns SVG elements drawn
on a 200×200 canvas (keep artwork roughly above y≈145 — the title sits below —
and opacities around 0.2–0.4 so text stays legible). Example:

```jsx
diagonal: (ink) => (
  <g stroke={ink} opacity="0.3">
    {[0, 40, 80, 120, 160].map((x) => (
      <line key={x} x1={x} y1="0" x2={x + 60} y2="145" strokeWidth="2" />
    ))}
  </g>
),
```

Add the entry, and it automatically shows up in the edit panel's pattern
dropdown and can be used as `pattern: 'diagonal'` in `projects.js`.

## Editing content directly (no code changes needed)

| What | Where |
|---|---|
| Projects (Cover Flow) | [`src/data/projects.js`](src/data/projects.js) — add/remove/reorder objects; the UI regenerates itself. Each project's album art is CSS-only, configured via its `cover` field (gradient colors + a pattern: `rings`, `map`, `orb`, `bars`, `grid`). |
| Links, skills, experience | [`src/data/site.js`](src/data/site.js) |
| Accent color | `--color-accent` in [`src/index.css`](src/index.css) |
| Resume | Replace `public/resume.pdf` |

## Structure

```
src/
  data/          content lives here — edit these
  components/    one component per section
    CoverFlow.jsx    Apple Cover Flow carousel (keyboard / wheel / drag)
    AlbumCover.jsx   CSS/SVG album artwork generator
    ProjectModal.jsx project details panel
  App.jsx        section order
```
