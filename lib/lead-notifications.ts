import { siteConfig } from '@/lib/site';

const fallbackMessage =
  'We could not submit your request online. Please email nick@mrpositivehq.com and cc robert@positivewatchhq.com so the team can review your request directly.';

export const leadSuccessMessage =
  'Request received. Our team will review the details and follow up privately. For urgent inquiries, email nick@mrpositivehq.com and cc robert@positivewatchhq.com.';

export function getLeadFallbackMessage() {
  return fallbackMessage;
}

type LeadEmailInput = {
  subject: string;
  formName: string;
  submittedAt?: string;
  fields: Record<string, string | number | boolean | null | undefined>;
};

function formatFieldLabel(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (char) => char.toUpperCase());
}

function formatLeadEmailText(input: LeadEmailInput) {
  const submittedAt = input.submittedAt || new Date().toISOString();
  const lines = [
    `New Positive Watch HQ lead`,
    `Form: ${input.formName}`,
    `Submitted: ${submittedAt}`,
    '',
    ...Object.entries(input.fields).map(([key, value]) => `${formatFieldLabel(key)}: ${value === undefined || value === null || value === '' ? '—' : String(value)}`)
  ];

  return lines.join('\n');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatLeadEmailHtml(input: LeadEmailInput) {
  const submittedAt = escapeHtml(input.submittedAt || new Date().toISOString());
  const rows = Object.entries(input.fields)
    .map(([key, value]) => {
      const label = escapeHtml(formatFieldLabel(key));
      const safeValue = escapeHtml(value === undefined || value === null || value === '' ? '—' : String(value));
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e6dcc5;font-weight:700;color:#0b1220;vertical-align:top;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e6dcc5;color:#1f2937;white-space:pre-wrap;">${safeValue}</td></tr>`;
    })
    .join('');

  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.5;color:#111827;background:#f8f4ea;padding:24px;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e6dcc5;border-radius:18px;overflow:hidden;">
        <div style="background:#071225;color:#f7edd2;padding:20px 24px;">
          <p style="margin:0 0 6px;text-transform:uppercase;letter-spacing:0.18em;font-size:11px;color:#d8b45d;">Positive Watch HQ</p>
          <h1 style="margin:0;font-size:22px;">New lead received</h1>
          <p style="margin:8px 0 0;color:#dbe4f0;">${input.formName} · ${submittedAt}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

export async function sendLeadNotification(input: LeadEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Lead email notification is not configured.');
  }

  const from = process.env.LEADS_FROM_EMAIL || 'Positive Watch HQ <leads@positivewatchhq.com>';
  const to = process.env.LEADS_TO_EMAIL || siteConfig.email;
  const cc = process.env.LEADS_CC_EMAIL || 'robert@positivewatchhq.com';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      cc: cc ? [cc] : undefined,
      subject: input.subject,
      text: formatLeadEmailText(input),
      html: formatLeadEmailHtml(input)
    })
  });

  if (!response.ok) {
    throw new Error('Lead email notification could not be sent.');
  }
}

export function splitName(customerName: string) {
  const parts = customerName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || '',
    lastName: parts.length > 1 ? parts.slice(1).join(' ') : ''
  };
}
