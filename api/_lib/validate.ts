/**
 * Input validation helpers — vanilla, no schema lib.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export class ValidationError extends Error {
  field: string;
  constructor(field: string, message: string) {
    super(`${field}: ${message}`);
    this.field = field;
  }
}

export function str(value: unknown, field: string, opts: { min?: number; max?: number; required?: boolean } = {}): string {
  const { min = 1, max = 5000, required = true } = opts;
  if (value == null || value === '') {
    if (required) throw new ValidationError(field, 'required');
    return '';
  }
  if (typeof value !== 'string') throw new ValidationError(field, 'must be a string');
  const trimmed = value.trim();
  if (trimmed.length < min) throw new ValidationError(field, `min length ${min}`);
  if (trimmed.length > max) throw new ValidationError(field, `max length ${max}`);
  return trimmed;
}

export function email(value: unknown, field = 'email'): string {
  const v = str(value, field, { min: 5, max: 254 });
  if (!EMAIL_RE.test(v)) throw new ValidationError(field, 'invalid email');
  return v.toLowerCase();
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
