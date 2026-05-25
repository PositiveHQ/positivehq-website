'use server';

import { redirect } from 'next/navigation';
import { checkRateLimit, cleanText, getPublicLeadError, hasHoneypotValue, validateEmail } from '@/lib/lead-validation';
import { createContactSubmission } from '@/lib/repositories/submissions';

export type ContactState = {
  status: 'idle' | 'error';
  message?: string;
};

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const customerName = cleanText(formData.get('customerName'), 120);
  const email = cleanText(formData.get('email'), 254).toLowerCase();
  const phone = cleanText(formData.get('phone'), 40);
  const subject = cleanText(formData.get('subject'), 160);
  const message = cleanText(formData.get('message'), 1500);

  if (hasHoneypotValue(formData)) {
    return { status: 'error', message: 'Unable to submit right now.' };
  }

  if (!customerName || !email || !message) {
    return { status: 'error', message: 'Please complete name, email, and message.' };
  }

  if (!validateEmail(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }

  if (!checkRateLimit('contact', email)) {
    return { status: 'error', message: 'Please wait a moment before submitting again.' };
  }

  try {
    await createContactSubmission({
      customerName,
      email,
      phone,
      subject,
      message,
      sourcePage: '/contact'
    });
  } catch (error) {
    return { status: 'error', message: getPublicLeadError(error) };
  }

  redirect('/thank-you?type=contact');
}
