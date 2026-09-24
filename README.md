# St. Pauls Artane FC — Behaviour Guide

A mobile-friendly guide for players and coaches. Player text summarises the club's published code; coach expectations are a proposed draft for club review.

## Run locally

Requires Node.js 22 or later. No dependencies or install step.

```
node scripts/serve.mjs
```

Open http://127.0.0.1:4173. Run `node scripts/check.mjs` for content and configuration checks.

## Deployment

Import this repository into Vercel. Framework: Other. Output directory: public. No build or install command is needed.

## Supabase

The public guide reads the `behaviour_guides` table from a separate Supabase project. Only a publishable key is placed in `public/config.json`; never use a secret or service-role key. Anonymous access is read-only. No player information or acknowledgements are collected. Edit guide text in the Supabase dashboard; updates appear on the next page load.

If the live data cannot be reached, the site explicitly displays its saved review draft from `public/guide.json`.

## Content sources

- https://www.stpaulsartanefc.com/code-of-conduct-parents-spectators
- https://www.stpaulsartanefc.com/child-safeguarding-statement
- https://www.stpaulsartanefc.com/social-media-and-photo-policy

The colour scheme and SP monogram are presentation choices, not an official club crest. Club approval is required before removing the review labels.
