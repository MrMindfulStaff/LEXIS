# LEXIS — Legal Council Intelligence System

LEXIS is a structured legal reasoning interface built on the D.R.U.G.S. Engine architecture by House Reed. It provides attorneys with verified legal analysis, adversarial position testing, and dead-end detection — all backed by an eleven-member cognitive council that produces traceable, auditable legal intelligence.

## Local Setup

```bash
git clone https://github.com/MrMindfulStaff/LEXIS.git
cd LEXIS
npm install
```

Create `.env.local` with your keys:

```
ANTHROPIC_API_KEY=your-anthropic-api-key
NEXT_PUBLIC_LEXIS_ACCESS_CODE=your-access-code
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push this repo to GitHub
2. Connect the repo in [Vercel Dashboard](https://vercel.com)
3. Set environment variables in Vercel:
   - `ANTHROPIC_API_KEY` — your Anthropic API key
   - `NEXT_PUBLIC_LEXIS_ACCESS_CODE` — the demo access password
4. Deploy

## Changing the Access Code

Update `NEXT_PUBLIC_LEXIS_ACCESS_CODE` in Vercel environment variables and redeploy.

## System Prompt

The LEXIS v2.0 system prompt is in `lib/lexis-system-prompt.ts` for easy updates.

---

LEXIS v2.0 | D.R.U.G.S. Engine Architecture | House Reed
