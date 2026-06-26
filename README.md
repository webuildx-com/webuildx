# WebuildX

Marketing site and project inquiry form for [WebuildX](https://webuildx.com) — a design-led product development studio.

Built with Next.js 15, Tailwind CSS v4, Framer Motion, and Lenis smooth scroll.

## Getting started

```bash
npm install
cp .env.example .env   # add your keys
npm run dev            # http://localhost:3010
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key for inquiry emails |
| `RESEND_FROM_EMAIL` | Yes | Verified sender (e.g. `WebuildX <hello@webuildx.com>`) |
| `INQUIRY_TO_EMAIL` | Yes | Inbox for new inquiries |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes (prod) | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Yes (prod) | Cloudflare Turnstile secret |
| `UPSTASH_REDIS_REST_URL` | No | Rate limiting (recommended in prod) |
| `UPSTASH_REDIS_REST_TOKEN` | No | Rate limiting (recommended in prod) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 3010 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Deploy

Recommended: [Vercel](https://vercel.com) — import this repo, add env vars, connect `webuildx.com`.

Ensure your domain is verified in Resend and Turnstile before going live.
