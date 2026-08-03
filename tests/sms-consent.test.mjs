import assert from 'node:assert/strict';
import test from 'node:test';

import {
  QUO_PRIVACY_POLICY_URL,
  SMS_CONSENT_COPY,
  buildSmsConsentEvidence,
} from '../lib/sms-consent.ts';

const timestamp = '2026-08-03T12:34:56.000Z';

test('uses the exact approved consent language and verified Quo policy URL', () => {
  assert.equal(
    SMS_CONSENT_COPY,
    'I agree to receive text messages from Positive Watch LLC, doing business as Positive Watch HQ, regarding watch inquiries, appointments, orders, shipping updates, and customer support. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not a condition of purchase. View our Privacy Policy.'
  );
  assert.equal(QUO_PRIVACY_POLICY_URL, 'https://www.quo.com/policies/OR77vgarTY');
});

test('unchecked consent remains false and is never required', () => {
  const formData = new FormData();
  formData.set('submissionPageUrl', 'https://www.positivewatchhq.com/sell?campaign=quo#sell-form');

  assert.deepEqual(buildSmsConsentEvidence(formData, '/sell#sell-form', timestamp), {
    smsConsent: false,
    smsConsentAt: null,
    submittedAt: timestamp,
    submissionPageUrl: 'https://www.positivewatchhq.com/sell?campaign=quo#sell-form',
  });
});

test('checked consent records affirmative evidence and server submission timestamp', () => {
  const formData = new FormData();
  formData.set('smsConsent', 'on');
  formData.set('submissionPageUrl', 'https://positivewatchhq.com/contact?intent=appointment#contact-form');

  assert.deepEqual(buildSmsConsentEvidence(formData, '/contact', timestamp), {
    smsConsent: true,
    smsConsentAt: timestamp,
    submittedAt: timestamp,
    submissionPageUrl: 'https://positivewatchhq.com/contact?intent=appointment#contact-form',
  });
});

test('untrusted or missing page URLs fall back to the canonical Positive Watch URL', () => {
  const malicious = new FormData();
  malicious.set('submissionPageUrl', 'https://attacker.example/forged');
  assert.equal(
    buildSmsConsentEvidence(malicious, '/trade-in#trade-form', timestamp).submissionPageUrl,
    'https://www.positivewatchhq.com/trade-in#trade-form'
  );

  assert.equal(
    buildSmsConsentEvidence(new FormData(), '/consignment#consignment-review', timestamp).submissionPageUrl,
    'https://www.positivewatchhq.com/consignment#consignment-review'
  );
});

test('uses an allowed server Referer when the submitted page URL is missing or untrusted', () => {
  const missing = new FormData();
  assert.equal(
    buildSmsConsentEvidence(
      missing,
      '/contact',
      timestamp,
      'https://www.positivewatchhq.com/contact?intent=appointment'
    ).submissionPageUrl,
    'https://www.positivewatchhq.com/contact?intent=appointment'
  );

  const forged = new FormData();
  forged.set('submissionPageUrl', 'https://attacker.example/forged');
  assert.equal(
    buildSmsConsentEvidence(
      forged,
      '/sell#sell-form',
      timestamp,
      'https://positivewatchhq.com/sell?campaign=quo'
    ).submissionPageUrl,
    'https://positivewatchhq.com/sell?campaign=quo'
  );
});

test('rejects an untrusted server Referer and keeps the canonical route fallback', () => {
  assert.equal(
    buildSmsConsentEvidence(
      new FormData(),
      '/consignment#consignment-review',
      timestamp,
      'https://attacker.example/forged'
    ).submissionPageUrl,
    'https://www.positivewatchhq.com/consignment#consignment-review'
  );
});

test('enforces the submission URL origin and protocol allowlist', () => {
  const accepted = [
    'https://www.positivewatchhq.com/contact?intent=buy#contact-form',
    'https://positivewatchhq.com/sell',
    'https://positivewatchhq-website-git-preview-positivehq-sms-consent-nick-7133s-projects.vercel.app/trade-in',
    'http://localhost:3100/contact',
    'http://127.0.0.1:3100/watches/rolex-submariner-124060',
  ];

  for (const url of accepted) {
    const formData = new FormData();
    formData.set('submissionPageUrl', url);
    assert.equal(buildSmsConsentEvidence(formData, '/contact', timestamp).submissionPageUrl, url);
  }

  const rejected = [
    'http://www.positivewatchhq.com/contact',
    'https://positivewatchhq.com.attacker.example/contact',
    'https://unapproved-project.vercel.app/contact',
    'not a URL',
    `https://www.positivewatchhq.com/contact?payload=${'x'.repeat(2050)}`,
  ];

  for (const url of rejected) {
    const formData = new FormData();
    formData.set('submissionPageUrl', url);
    assert.equal(
      buildSmsConsentEvidence(formData, '/contact', timestamp).submissionPageUrl,
      'https://www.positivewatchhq.com/contact'
    );
  }
});
