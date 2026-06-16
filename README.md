# Growth Intelligence — Cadient Talent

A client-facing digital performance audit, built as a React + TypeScript + Tailwind
single-page report with top-nav tabs. Prepared by CommerceV3.

## Sections
1. **Overview** — headline KPIs, executive summary, site-health radar, live snapshot
2. **Gap Analysis** — sub-tabs: SEO · Keywords · Backlinks · Conversion (incl. homepage conversion playbook)
3. **AI Visibility** — per-platform AI citations and AI-search health
4. **Competitors** — organic competitor footprint
5. **Revenue Gaps** — growth left on the table
6. **Action Plan** — phased roadmap + focus scorecard

## Develop
```bash
npm install
npm run dev      # local dev server
```

## Build
```bash
npm run build    # client + SSR + static prerender -> dist/
npm run preview  # serve the built dist/ at http://localhost:4173
```

The build prerenders the full report into `dist/index.html`, so all content is present
in the static HTML (readable without executing client-side JavaScript).

## Deploy (Netlify)
Build command and publish directory are configured in `netlify.toml`
(`npm run build` → `dist`). Connect the repo in Netlify and deploy.
