/**
 * CORS headers builder. Locks origin to production site (and localhost for dev).
 */
const ALLOWED_ORIGINS = new Set([
  'https://arisainwonderdolls.com',
  'https://www.arisainwonderdolls.com',
  'http://localhost:3000',
  'http://127.0.0.1:5501',
  'http://127.0.0.1:5500',
]);

export function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://arisainwonderdolls.com';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export function handlePreflight(req: Request): Response | null {
  if (req.method !== 'OPTIONS') return null;
  return new Response(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) });
}
