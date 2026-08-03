'use client';

import { useEffect, useRef } from 'react';
import { QUO_PRIVACY_POLICY_URL, SMS_CONSENT_COPY } from '@/lib/sms-consent';

const privacyLabel = 'Privacy Policy.';
const consentPrefix = SMS_CONSENT_COPY.slice(0, -privacyLabel.length);

export function SmsConsentField() {
  const submissionPageUrlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = submissionPageUrlRef.current;
    const form = input?.form;
    const updateSubmissionPageUrl = () => {
      if (input) input.value = window.location.href;
    };

    updateSubmissionPageUrl();
    form?.addEventListener('submit', updateSubmissionPageUrl, true);
    window.addEventListener('hashchange', updateSubmissionPageUrl);
    window.addEventListener('popstate', updateSubmissionPageUrl);

    return () => {
      form?.removeEventListener('submit', updateSubmissionPageUrl, true);
      window.removeEventListener('hashchange', updateSubmissionPageUrl);
      window.removeEventListener('popstate', updateSubmissionPageUrl);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
      <input ref={submissionPageUrlRef} type="hidden" name="submissionPageUrl" defaultValue="" />
      <label className="flex cursor-pointer items-start gap-3 text-xs leading-6 text-slate-300 sm:text-sm">
        <input
          type="checkbox"
          name="smsConsent"
          className="mt-1 h-5 w-5 shrink-0 accent-amber-200"
          aria-describedby="sms-consent-description"
        />
        <span id="sms-consent-description">
          {consentPrefix}
          <a
            href={QUO_PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-100 underline decoration-amber-100/50 underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>
    </div>
  );
}
