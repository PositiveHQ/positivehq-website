'use server';

import { createNewsletterSubscriber } from '@/lib/repositories/submissions';
import { checkRateLimit, cleanText, getPublicLeadError, hasHoneypotValue, validateEmail } from '@/lib/lead-validation';

export type NewsletterState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

export async function submitNewsletterAction(
  sourcePage: string,
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = cleanText(formData.get('email'), 254).toLowerCase();

  if (hasHoneypotValue(formData)) {
    return { status: 'error', message: 'Unable to submit right now.' };
  }

  if (!validateEmail(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }

  if (!checkRateLimit('newsletter', email)) {
    return { status: 'error', message: 'Please wait a moment before submitting again.' };
  }

  try {
    await createNewsletterSubscriber({ email, sourcePage });
    return { status: 'success', message: 'Thanks for subscribing. You are on the list.' };
  } catch (error) {
    return { status: 'error', message: getPublicLeadError(error) };
  }
}
