import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function source(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8');
}

for (const [relativePath, expectedFallback] of [
  ['app/sell/actions.ts', 'sourcePage'],
  ['app/contact/actions.ts', "'/contact'"],
  ['app/watches/[slug]/actions.ts', '`/watches/${watch.slug}`'],
]) {
  test(`${relativePath} persists SMS consent evidence and includes it in notifications`, async () => {
    const action = await source(relativePath);
    assert.match(action, /import \{ headers \} from ['"]next\/headers['"]/);
    assert.match(action, /buildSmsConsentEvidence/);
    assert.ok(action.includes(`formData, ${expectedFallback}`), 'missing canonical source-page fallback');
    assert.match(action, /headers\(\)\.get\(['"]referer['"]\)/);
    assert.match(action, /leadPayload:\s*\{[\s\S]*\.\.\.smsConsentEvidence/);
    assert.match(action, /smsConsent:\s*smsConsentEvidence\.smsConsent/);
    assert.match(action, /smsConsentAt:\s*smsConsentEvidence\.smsConsentAt/);
    assert.match(action, /submissionPageUrl:\s*smsConsentEvidence\.submissionPageUrl/);
    assert.match(action, /submittedAt:\s*smsConsentEvidence\.submittedAt/);
  });
}
