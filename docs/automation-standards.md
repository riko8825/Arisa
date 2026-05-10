# Automation Standards — Arisa in WonderDolls

Visi backend endpoint'ai — **Vercel Edge Functions, TypeScript**. Jokio Express, jokio Node serverio.

## Endpoint anatomy

Kiekvienas `api/*.ts` failas:

```typescript
// api/lead-capture.ts
export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  // 1. Method guard
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  // 2. Auth (x-api-key)
  const key = req.headers.get('x-api-key');
  if (key !== process.env.LEAD_CAPTURE_SECRET) {
    return json({ error: 'Unauthorized' }, 401);
  }

  // 3. Parse + validate
  let body: LeadInput;
  try {
    body = await req.json();
    validate(body);
  } catch (e) {
    return json({ error: 'Invalid input' }, 400);
  }

  // 4. Business logic
  try {
    await sendLeadEmail(body);
    return json({ ok: true }, 200);
  } catch (e) {
    console.error('lead-capture failed', e);
    return json({ error: 'Internal error' }, 500);
  }
}
```

## Privalomi standartai

### 1. Auth — `x-api-key` per endpoint
- Atskiras `*_SECRET` env var per endpoint (NE shared)
- Pavyzdžiai: `LEAD_CAPTURE_SECRET`, `RESERVE_SECRET`, `NEWSLETTER_SECRET`
- Generavimas: `openssl rand -hex 32`
- Saugoma: Vercel dashboard → Project → Settings → Environment Variables. **Niekada git.**

### 2. Input validation
- Visi user input — validuoti rankiniu būdu (be Zod jei nori vanilla, Zod OK jei reikia)
- Email regex, name length (1-200), message length (1-5000)
- Reject su 400 + clear error message

### 3. Rate limiting
Phase 1 — per Vercel Edge Config arba paprastas in-memory map (best-effort).
Phase 2 — Upstash Redis rate limit jei iškils abuse.

### 4. CORS
- `Access-Control-Allow-Origin: https://arisainwonderdolls.com` (NE `*`)
- Preflight OPTIONS handler privalomas

### 5. Error handling
- Bandyti viską `try/catch`
- Logo per `console.error` (Vercel logs catch'ina)
- Vartotojui — generic message, niekada stack trace

### 6. Reusable wrappers (`api/_lib/`)

- `_lib/resend.ts` — Resend wrapper su retry
- `_lib/validate.ts` — input validation helpers
- `_lib/cors.ts` — CORS headers builder
- `_lib/json.ts` — `json(data, status)` Response helper

**Niekada copy-paste integration code tarp endpoint'ų.** Visada iš `_lib/`.

## Esami planuojami endpoint'ai

### `api/lead-capture.ts` (P1)
- **Trigger:** `contact.html` form submit
- **Input:** `{ name, email, message, dollOfInterest? }`
- **Action:** Resend → email Arisai (`arisainwonderdolls@gmail.com`) su lead details
- **Response:** 200 OK → frontend toast "A letter is on its way"
- **Email subject:** `New adoption inquiry — {name}`
- **Email body:** Plain text, vardas/email/žinutė/optional doll

### `api/reserve.ts` (P1)
- **Trigger:** Cart "Continue to adoption" submit
- **Input:** `{ buyer: {name, email, phone?}, items: [{id, name, price}], notes? }`
- **Action:**
  1. Email Arisai — "Reservation request: {item names}"
  2. Email buyer — confirmation + "Arisa will write back within 24h with bank details"
- **Response:** 200 OK → success page

### `api/newsletter.ts` (P3)
- **Trigger:** Newsletter form submit
- **Input:** `{ email }`
- **Action:** Resend Audiences API add contact
- **Response:** 200 OK

### `api/lead-score.ts` (P2)
- **Trigger:** Po `lead-capture` (server-to-server)
- **Action:** Claude API → score lead intent (collector / parent / therapist / casual / spam)
- **Output:** Email subject prefix `[high-intent]` / `[mid]` / `[low]`

## Testing

Prieš production push:
1. Lokalus test su `vercel dev` arba curl į localhost endpoint
2. Test su realiu emailu (Arisos test inbox arba savo)
3. Test su nevalidžiu input — turi atmesti su 400
4. Test be `x-api-key` — turi atmesti su 401

## Env vars (žr. `.env.example`)

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
LEAD_CAPTURE_SECRET=hex32
RESERVE_SECRET=hex32
NEWSLETTER_SECRET=hex32
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

## Deploy

- Edge Functions auto-deploy su `git push origin main`
- Vercel build log — žiūrėti per Vercel dashboard
- Po deploy — smoke test endpoint su curl arba Postman

## Monitoring

Phase 1: Vercel function logs.
Phase 2: pridėti Sentry arba paprastesnį webhook į Slack jei error.
