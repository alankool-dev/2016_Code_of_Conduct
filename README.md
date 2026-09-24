# St. Pauls Artane FC — Behaviour Guide

A mobile-friendly guide for schoolboy players and coaches. Player text adapts the club's published code with practical reminders for younger players. Parents and guardians are encouraged to read it with their child. Expectations appear beside the introduction on wider screens and directly after a compact introduction on mobile.

## Run locally

Requires Node.js 22 or later. No dependencies or install step.

```
node scripts/serve.mjs
```

Open http://127.0.0.1:4173. Run `node scripts/check.mjs` for content and configuration checks.

## Deployment

Import this repository into Vercel. Framework: Other. The committed vercel.json runs validation and the build script, then publishes dist. No dependencies or install step are needed.

Each build inserts `Build YYYY.MM.DD · Git <short SHA>` into the footer. The date uses Europe/Dublin time; the commit comes from VERCEL_GIT_COMMIT_SHA and links to the full GitHub commit. Keep Vercel's system environment variables enabled. Production builds fail if this metadata is unavailable rather than displaying an invented reference. Local builds are labelled Local preview.

Run `node --test scripts/build-info.test.mjs` to verify metadata handling. Run `node scripts/build.mjs` to generate the static output in dist. The source public/index.html retains its placeholder so every rebuild receives fresh metadata.

## Supabase

The public guide is prepared to read the `behaviour_guides` table from a separate Supabase project. Database creation is pending the organisation and cost confirmation; the current deployment uses the bundled schoolboy guide. Only a publishable key is placed in `public/config.json`; never use a secret or service-role key. Anonymous access is read-only. No player information or acknowledgements are collected. Edit guide text in the Supabase dashboard; updates appear on the next page load.

If the live data cannot be reached, the site explicitly displays its saved guide from `public/guide.json`.

## Content sources

- https://www.stpaulsartanefc.com/code-of-conduct-parents-spectators
- https://www.stpaulsartanefc.com/child-safeguarding-statement
- https://www.stpaulsartanefc.com/social-media-and-photo-policy

Brand assets (St Pauls crest, O’Neills and Shelbourne logos) are reused from the club’s Identify Fixture App task. Navy, blue, typography and partner presentation match that club identity. The application links to the full club policies.
