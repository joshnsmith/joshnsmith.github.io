# Josh GPT

A conversational portfolio built with Astro and plain CSS. The frontend is static on GitHub Pages. Live portfolio chat uses Cloudflare Workers AI with approved answers as a fallback. See AI-SETUP.md for account connection, free-tier limits, and deployment.

## Local development

Use Node.js 22.19 or newer and run:

```sh
npm install
npm run dev
```

Open http://localhost:4321. `npm run build` generates the static site in `dist/`; `npm run preview` serves the built version.

- `src/pages/index.astro`: homepage structure and suggested questions
- `src/styles/global.css`: responsive design
- `content/josh-profile.json`: public facts and fallback answers
- `src/scripts/chat.ts`: live chat and fallback behavior
- `scripts/prepare-assets.mjs`: copies the existing résumé and linked legacy projects into generated `public/` for development and builds

The existing root `index.html` is retained as the legacy page; the new homepage source is `src/pages/index.astro`. The existing modified résumé source is preserved. Generated `public/` should not be edited; update the original assets instead.

## GitHub Pages

When ready to publish, commit the source and lockfile, choose **GitHub Actions** in repository Settings → Pages, then manually run **Deploy Josh GPT** in Actions. The workflow publishes only when manually triggered. The frontend is hosted at https://joshnsmith.github.io/ and the AI backend at https://josh-portfolio-backend.joshsmithsp.workers.dev. The PUBLIC_API_URL repository Actions variable connects the two.

## Content

Update `content/josh-profile.json` with verified professional details before expanding the content. The profile covers professional experience, projects, education, and personal interests. Voice and conversation settings live in `backend/src/voice.ts`. Conversations live only in the current page and reset on reload or New conversation.
