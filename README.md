# Goetz's Nursery — 2026 Tree Catalog

An interactive, image-forward catalog of the 39 trees Goetz's Nursery (Hartford, WI) is offering for the 2026 season. Built as a single-page React app, designed for property owners across Southeastern Wisconsin who want to compare trees side-by-side with full specs, pros/cons, and siting guidance before they call the nursery.

> **Live:** _set after first Vercel deploy — see [Deployment](#deployment)_
> **Repo:** https://github.com/tonybangert/Goetz-Nursery-Project

---

## What's inside

- **39 trees** curated for USDA Zone 5a / 4b along the Lake Michigan corridor — every entry has cultivar-accurate or species-representative photography, full mature-size specs, fall color, sun/soil requirements, growth rate, pros, trade-offs, and siting notes
- **Image-forward grid** with category filters, sun-exposure filters, search-by-name/trait/tag, and price/A–Z sorting
- **Detail dialog** (Radix `<Dialog>`-based modal) with a hero image, 8-cell spec grid, pros vs. trade-offs, siting notes, and a tap-to-call CTA
- **Mobile-first** — sticky scroll-snap filter bar, 44 px tap targets, iOS safe-area handling, `dvh`-aware dialog sizing, no auto-zoom on input focus
- **Accessible** — keyboard nav, focus traps in the dialog, ARIA labels, `prefers-reduced-motion` honored across all Framer Motion animations

---

## Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | **React 18** | Industry standard, no SSR needed for a catalog SPA |
| Build / dev server | **Vite 5** | Sub-second HMR, zero-config |
| Styling | **Tailwind CSS v4** with `@theme` brand tokens | All the design tokens live in one CSS file (no `tailwind.config.js`) |
| UI primitives | **Radix UI** (Dialog) | Accessibility table-stakes — focus trap, scroll lock, Esc-to-close, ARIA wiring out of the box |
| Animation | **Framer Motion** | Layout transitions for filter changes, dialog enter/exit, drifting leaves in header |
| Icons | **lucide-react** | Lightweight, consistent stroke-based icon set |
| Class utilities | **clsx** | Tiny conditional `className` composition |

---

## File structure

```
Goetz-Nursery-Project/
├── public/
│   ├── logo.webp               # Goetz brand mark (~10 KB, extracted from base64)
│   └── trees/                  # 39 tree photos, one per slug, ~17 MB total
├── scripts/
│   ├── fetch-tree-images.mjs   # Curated-candidate downloader with HEAD validation
│   └── fetch-tree-images-api.mjs # Wikimedia Commons search API fallback
├── src/
│   ├── main.jsx                # Entry point
│   ├── App.jsx                 # Composition root + filter/sort state
│   ├── index.css               # Tailwind import + @theme tokens + base/utility layers
│   ├── data/
│   │   └── trees.js            # All 39 tree records as a typed-shape array
│   ├── components/
│   │   ├── Header.jsx          # Hero with photo mosaic + drifting leaves
│   │   ├── FilterBar.jsx       # Sticky search + sort + scroll-snap pill filters
│   │   ├── TreeCard.jsx        # Image-forward card with hover lift
│   │   ├── TreeDialog.jsx      # Radix modal with full tree detail
│   │   ├── TreeImage.jsx       # Image with blur-up loading + emoji fallback
│   │   ├── EmptyState.jsx      # No-results state with reset button
│   │   └── Footer.jsx          # Brand strip + phone CTA + attribution
│   └── lib/
│       └── cn.js               # clsx re-export for terser imports
├── index.html                  # Static shell with font preconnect + OG meta
├── vite.config.js              # React + Tailwind v4 plugins
└── package.json
```

### Why split data from components?

Earlier iterations had all 39 trees inline in `App.jsx` — the file ballooned to 1,900 lines and made the JSX hard to read. Moving the catalog to `src/data/trees.js` keeps the component layer focused on rendering and behavior. Anyone updating prices for the 2027 season can edit one file without scrolling past JSX.

---

## Design system

Brand tokens live in `src/index.css` under `@theme`:

```css
--color-forest-50  → #f3f8f4   (lightest tints, surfaces)
--color-forest-400 → #5fa15a   (logo leaf — accent)
--color-forest-600 → #2e6e3f   (mid-tone, primary buttons)
--color-forest-800 → #1f4d2c   (deep brand green, headings)
--color-forest-900 → #163721   (footer, dark surfaces)
--color-cream      → #fafaf6   (page background)
--color-amber-warm → #d97706   (autumn / fall-color accent)
--font-sans        → Inter
--font-serif       → Cormorant Garamond  (display headings)
```

Use `bg-forest-700`, `text-forest-300`, `ring-forest-100`, etc. as standard Tailwind utilities.

---

## Tree image pipeline

Tree photos are sourced from Wikimedia Commons. Each tree has its own dedicated image at `public/trees/<slug>.jpg`. Two scripts populate the directory:

### `scripts/fetch-tree-images.mjs`
A curated-candidates downloader. For each tree slug, it tries a hand-picked list of Wikimedia filenames (cultivar-specific first, species-level fallbacks). Validates each candidate with a HEAD request — only saves files where `Content-Type: image/*` and size > 8 KB (Wikimedia's 404 page is ~2 KB).

### `scripts/fetch-tree-images-api.mjs`
A search-API fallback. For trees where no curated candidate works, hits the Wikimedia Commons `action=query&list=search` endpoint with a tuned query and downloads the first result that passes content-type validation.

### Adding a new tree

1. Add the tree object to `src/data/trees.js` with a unique `slug`
2. Either:
   - Add a curated entry to `scripts/fetch-tree-images.mjs` and run `node scripts/fetch-tree-images.mjs`, OR
   - Add a search query to `scripts/fetch-tree-images-api.mjs` and run `node scripts/fetch-tree-images-api.mjs`
3. Verify the new `public/trees/<slug>.jpg` exists and looks correct

Both scripts are idempotent — they skip slugs that already have valid files on disk.

---

## Develop

Prerequisites: **Node 18+** (tested on 22.12). Use the project's lockfile.

```bash
npm install
npm run dev      # http://localhost:5173 with HMR
npm run build    # production build → dist/
npm run preview  # serve dist/ locally to verify the prod build
```

Vite's HMR will live-update component edits without losing dialog/filter state. CSS edits hot-swap without a reload.

---

## Deployment

This project deploys to Vercel from the `main` branch.

### First-time setup

```bash
vercel link         # Link the local repo to a Vercel project
vercel --prod       # Deploy main branch to production
```

After the first deploy, Vercel auto-deploys on every push to `main`. Pull requests get preview URLs.

### Environment

No environment variables are required — the app is fully static. Vercel auto-detects Vite and uses:
- **Build command:** `vite build`
- **Output directory:** `dist`
- **Install command:** `npm install`

---

## Accessibility

- All interactive elements meet a **44 × 44 px** touch target (iOS HIG)
- **Keyboard navigation** works throughout — tab, shift-tab, Enter to open card, Esc to close dialog
- **Focus is trapped** inside the dialog while open and **restored** to the trigger card on close (Radix Dialog handles this)
- **Focus-visible rings** on all controls (subtle but never hidden)
- **`prefers-reduced-motion`** disables the drifting-leaf header animation, card-stagger fade-in, and dialog enter/exit transitions
- **`aria-label`**, **`aria-pressed`**, **`aria-modal`** wired correctly on filter pills, dialog, and search input
- **iOS auto-zoom-on-input** disabled by ensuring inputs render at 16 px

---

## Mobile considerations

The app is mobile-first by default. Specific phone optimizations:

| Feature | Implementation |
|---|---|
| iOS dynamic toolbar | Dialog uses `max-h-[94dvh]` (dynamic viewport height) so it never gets cropped when Safari's bottom toolbar appears |
| Safe-area insets | `pb-safe` utility on the footer reads `env(safe-area-inset-bottom)` so content clears the home indicator on iPhone |
| Filter pills | Single horizontally-scrollable row with `snap-x snap-mandatory` and hidden scrollbar (Apple Music / Spotify / Linear pattern) |
| Search keyboard | `enterKeyHint="search"` + `inputMode="search"` shows iOS's blue magnifying-glass "Search" button |
| Tap delay | `touch-action: manipulation` removes the legacy 300 ms double-tap-zoom delay |
| Tap flash | `-webkit-tap-highlight-color: transparent` removes the default iOS Safari blue overlay |
| Dialog hero crop | 4:3 aspect on phones (better for portrait tree photos), 16:9 on tablets+ |

---

## Scripts reference

```bash
npm run dev                              # Vite dev server, HMR
npm run build                            # Production bundle to dist/
npm run preview                          # Preview the prod bundle locally

node scripts/fetch-tree-images.mjs       # Re-fetch any missing tree images via curated list
node scripts/fetch-tree-images-api.mjs   # Wikimedia API fallback for cultivars not in curated list
```

---

## Contact

**Goetz's Nursery**
1765 Co Rd CC
Hartford, WI 53027
**(262) 628-0502**

---

## Credits

Tree photographs courtesy of Wikimedia Commons contributors. Used under their respective Creative Commons licenses for illustrative and educational purposes.

The Goetz's Nursery logo is the property of Goetz's Nursery and used here with permission.
