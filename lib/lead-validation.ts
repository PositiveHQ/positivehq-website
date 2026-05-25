import 'server-only';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitWindowMs = 60 * 1000;
const maxSubmissionsPerWindow = 3;
const attempts = new Map<string, { count: number; resetAt: number }>();

export type LeadAction = 'sell' | 'trade' | 'watch-inquiry' | 'newsletter' | 'contact';

export function cleanText(value: FormDataEntryValue | null, maxLength = 500) {
  return String(value ?? '').trim().slice(0, maxLength);
}

export function validateEmail(email: string) {
  return emailPattern.test(email);
}

export function hasHoneypotValue(formData: FormData) {
  return Boolean(cleanText(formData.get('company'), 120));
}

export function checkRateLimit(action: LeadAction, email: string) {
  const normalizedEmail = email.toLowerCase();
  const key = `${action}:${normalizedEmail || 'anonymous'}`;
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return true;
  }

  if (current.count >= maxSubmissionsPerWindow) {
    return false;
  }

  current.count += 1;
  attempts.set(key, current);
  return true;
}

export function getPublicLeadError(error: unknown) {
  if (error instanceof Error && error.message.includes('Supabase is not configured')) {
    return 'This form is not connected yet. Please contact us directly by email.';
  }

  return 'Unable to submit right now. Please try again or contact us directly.';
}
