import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function source(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8');
}

test('shared SMS consent field is optional, default-off, linked to Quo, and captures page URL', async () => {
  const component = await source('components/sms-consent-field.tsx');
  assert.match(component, /type="checkbox"/);
  assert.match(component, /name="smsConsent"/);
  assert.doesNotMatch(component, /required/);
  assert.doesNotMatch(component, /defaultChecked/);
  assert.match(component, /name="submissionPageUrl"/);
  assert.match(component, /window\.location\.href/);
  assert.match(component, /addEventListener\(['"]submit['"]/);
  assert.match(component, /addEventListener\(['"]hashchange['"]/);
  assert.match(component, /QUO_PRIVACY_POLICY_URL/);
  assert.match(component, /SMS_CONSENT_COPY/);
});

for (const relativePath of [
  'components/sell-form.tsx',
  'components/contact-form.tsx',
  'components/watch-inquiry-form.tsx',
]) {
  test(`${relativePath} places SMS consent directly above submit`, async () => {
    const component = await source(relativePath);
    const consentIndex = component.indexOf('<SmsConsentField');
    const submitIndex = component.indexOf('<FormSubmitButton');
    assert.ok(consentIndex >= 0, 'missing shared SMS consent field');
    assert.ok(submitIndex > consentIndex, 'SMS consent must appear before submit');
    assert.doesNotMatch(component.slice(consentIndex, submitIndex), /required/);
  });
}
