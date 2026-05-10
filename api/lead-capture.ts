/**
 * POST /api/lead-capture
 * Receives contact form submissions, emails Arisa via Resend.
 *
 * Auth: x-api-key header must equal LEAD_CAPTURE_SECRET.
 *
 * Body:
 *   { name, email, message, dollOfInterest? }
 *
 * Status: SKELETON — not wired into contact.html yet. Test before enabling frontend.
 */

import { json } from './_lib/json';
import { corsHeaders, handlePreflight } from './_lib/cors';
import { str, email as validateEmail, ValidationError, escapeHtml } from './_lib/validate';
import { sendEmail } from './_lib/resend';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const preflight = handlePreflight(req);
  if (preflight) return preflight;

  const cors = corsHeaders(req.headers.get('origin'));

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, cors);
  }

  const apiKey = req.headers.get('x-api-key');
  if (!apiKey || apiKey !== process.env.LEAD_CAPTURE_SECRET) {
    return json({ error: 'Unauthorized' }, 401, cors);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400, cors);
  }

  let name: string, emailAddr: string, message: string, dollOfInterest: string;
  try {
    name = str(body.name, 'name', { min: 1, max: 200 });
    emailAddr = validateEmail(body.email);
    message = str(body.message, 'message', { min: 1, max: 5000 });
    dollOfInterest = str(body.dollOfInterest, 'dollOfInterest', { required: false, max: 200 });
  } catch (e) {
    if (e instanceof ValidationError) return json({ error: e.message, field: e.field }, 400, cors);
    return json({ error: 'Validation failed' }, 400, cors);
  }

  const inbox = process.env.LEAD_INBOX ?? 'arisainwonderdolls@gmail.com';
  const subject = dollOfInterest
    ? `New adoption inquiry — ${name} (${dollOfInterest})`
    : `New adoption inquiry — ${name}`;

  const text = [
    `New adoption inquiry from the website.`,
    ``,
    `Name:    ${name}`,
    `Email:   ${emailAddr}`,
    dollOfInterest ? `Doll:    ${dollOfInterest}` : null,
    ``,
    `Message:`,
    message,
    ``,
    `—`,
    `Reply directly to this email to respond.`,
  ].filter(Boolean).join('\n');

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; line-height: 1.6;">
      <h2 style="font-weight: 400;">New adoption inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br>
         <strong>Email:</strong> ${escapeHtml(emailAddr)}
         ${dollOfInterest ? `<br><strong>Doll:</strong> ${escapeHtml(dollOfInterest)}` : ''}</p>
      <p style="white-space: pre-wrap; border-left: 2px solid #1A1410; padding-left: 14px; color: #3C342D;">${escapeHtml(message)}</p>
      <hr style="border: none; border-top: 1px solid #E6DCCB; margin: 24px 0;">
      <p style="font-size: 12px; color: #6E6258;">Reply directly to this email to respond.</p>
    </div>
  `;

  try {
    await sendEmail({
      to: inbox,
      subject,
      text,
      html,
      replyTo: emailAddr,
    });
  } catch (e) {
    console.error('lead-capture send failed', e);
    return json({ error: 'Failed to send' }, 500, cors);
  }

  return json({ ok: true }, 200, cors);
}
