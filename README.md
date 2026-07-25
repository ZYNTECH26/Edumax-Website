# Edumax Global College — Public Website

The public marketing site for Edumax Global College (Harare, Zimbabwe) — home page, blog, and the online admissions application form.

## Tech stack

- **Vite + React 18**, routed with `react-router`
- **Supabase** — a separate project from the school's internal dashboard (`edumax-app`), used only for its Edge Function backend (applications, blog, gallery)
- Content management (reviewing applications, writing blog posts, managing the gallery) happens in the **Edumax dashboard**, not on this site — see below

## Getting started

```bash
npm install
npm run dev
```

## Architecture note: admin functionality lives elsewhere

This site has no admin login of its own. Reviewing admissions applications, publishing blog posts, and managing gallery photos are all done from the **Website** section of the Edumax dashboard (`edumax-app`), which is verified against its own login before any of those actions are allowed — see `supabase/functions/server/index.tsx` for how that's enforced.

This site's own Supabase usage is limited to:
- Public reads: published blog posts (`GET /blog?published=true`), gallery photos (`GET /gallery`)
- The public application form (`POST /applications`)

## Building for production

```bash
npm run build
```
