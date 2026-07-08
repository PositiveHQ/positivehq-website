'use server';

import { createNewsletterSignup } from '@/lib/repositories/submissions';

type NewsletterState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

export async function submitNewsletterAction(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  try {
    const email = String(formData.get('email') ?? '').trim().toLowerCase();

    if (!email) {
      return { status: 'error', message: 'Please enter your email address.' };
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { status: 'error', message: 'Please enter a valid email address.' };
    }

    await createNewsletterSignup({ email, sourcePage: String(formData.get('sourcePage') ?? '/newsletter') });

    return { status: 'success', message: 'Thanks for subscribing. You are on the list.' };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unable to subscribe right now.'
    };
  }
}
