const CANONICAL_SITE_URL = 'https://www.positivewatchhq.com';

export const QUO_PRIVACY_POLICY_URL = 'https://www.quo.com/policies/OR77vgarTY';

export const SMS_CONSENT_COPY =
  'I agree to receive text messages from Positive Watch LLC, doing business as Positive Watch HQ, regarding watch inquiries, appointments, orders, shipping updates, and customer support. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not a condition of purchase. View our Privacy Policy.';

export type SmsConsentEvidence = {
  smsConsent: boolean;
  smsConsentAt: string | null;
  submittedAt: string;
  submissionPageUrl: string;
};

function isAllowedSubmissionUrl(url: URL) {
  const hostname = url.hostname.toLowerCase();
  const isProduction = hostname === 'positivewatchhq.com' || hostname.endsWith('.positivewatchhq.com');
  const isAuthorizedPreview = hostname.endsWith('-nick-7133s-projects.vercel.app');
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

  return (url.protocol === 'https:' && (isProduction || isAuthorizedPreview)) || (url.protocol === 'http:' && isLocal);
}

function normalizeAllowedSubmissionPageUrl(rawValue: FormDataEntryValue | null) {
  const rawUrl = typeof rawValue === 'string' ? rawValue.trim() : '';

  if (rawUrl.length > 2048) return;

  if (rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      if (isAllowedSubmissionUrl(parsed)) return parsed.toString();
    } catch {
      // Try the next trusted source.
    }
  }
}

function normalizeSubmissionPageUrl(
  rawValue: FormDataEntryValue | null,
  referer: string | null,
  fallbackPath: string
) {
  const submittedUrl = normalizeAllowedSubmissionPageUrl(rawValue);
  if (submittedUrl) return submittedUrl;

  const refererUrl = normalizeAllowedSubmissionPageUrl(referer);
  if (refererUrl) return refererUrl;

  return new URL(fallbackPath, CANONICAL_SITE_URL).toString();
}

export function buildSmsConsentEvidence(
  formData: FormData,
  fallbackPath: string,
  submittedAt = new Date().toISOString(),
  referer: string | null = null
): SmsConsentEvidence {
  const smsConsent = formData.get('smsConsent') === 'on';

  return {
    smsConsent,
    smsConsentAt: smsConsent ? submittedAt : null,
    submittedAt,
    submissionPageUrl: normalizeSubmissionPageUrl(formData.get('submissionPageUrl'), referer, fallbackPath),
  };
}
