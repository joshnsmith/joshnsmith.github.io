# Control Josh's AI portfolio

Edit `content/josh-profile.json`:
- `facts`: approved public information. Add your professional background here.
- `answers`: approved fallback answers for offline use or exhausted free quota.

Edit `backend/src/voice.ts` to adjust its tone and conversation rules. These settings are kept out of the frontend bundle, though they remain readable in the repository.

Use only information you are comfortable publishing. The profile is bundled into the site and Worker. AI instructions guide behavior but cannot guarantee perfect factual answers; keep the approved facts accurate and check generated responses.

## Free live AI

The Worker uses Cloudflare Workers AI and Llama 3.1 8B. No OpenAI key, paid GPT, fine-tuning, or custom ChatGPT GPT is required. Stay on Workers Free to keep the bill at $0. Cloudflare currently provides 10,000 neurons per day, shared across the account. This is a compute allowance, not 10,000 messages. When it runs out, the chat falls back to approved answers.

## Connect your Cloudflare account

From `backend`, run:

```powershell
npx wrangler login
npm run dev
```

The AI binding uses Cloudflare remotely even during local development, so AI calls consume the daily allowance. The frontend defaults to localhost:8787 during development. Run `npm run dev` in the repository root in a separate terminal.

After checking the answers, deploy the Worker from `backend`:

```powershell
npm run deploy
```

Copy its workers.dev URL. For a local production build, copy `.env.example` to `.env` in the repository root and set `PUBLIC_API_URL` to that URL. For the GitHub Actions deployment, add a repository Actions variable called `PUBLIC_API_URL` with the Worker URL. Rebuild the frontend after changing the URL.

After changing the profile, rebuild the frontend and redeploy the Worker so both use the same facts.

## Checks

From `backend`, `npm test -- --run` runs mocked tests without calling live AI. From the repository root, `npm run build` checks the static build.

## Current limits

The chat keeps only six recent messages in the page, and clears them on New conversation or reload. Those messages are sent to Cloudflare for inference. The app does not store conversations in a database.

CORS restricts browser origins but is not an abuse prevention system. The Free plan's quota caps usage; direct callers can still exhaust the allowance. Add Turnstile or rate limiting before promoting the public endpoint broadly.

Contact validation is implemented, but email delivery remains unconnected. The endpoint returns an unavailable status rather than claiming an email was sent.
