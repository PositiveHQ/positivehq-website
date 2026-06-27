'use server';

import { createWatchInquiry } from '@/lib/repositories/submissions';

type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const inquiryLabels = {
  buy: 'Buy a watch',
  sell: 'Sell a watch',
  trade: 'Trade a watch',
  consign: 'Consign a watch',
  general: 'Ask a general question'
} as const;

type InquiryIntent = keyof typeof inquiryLabels;

function isInquiryIntent(value: string): value is InquiryIntent {
  return value in inquiryLabels;
}

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  try {
    const customerName = String(formData.get('customerName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const inquiryIntentValue = String(formData.get('inquiryIntent') ?? '').trim();
    const watchContext = String(formData.get('watchContext') ?? '').trim();
    const budgetOrExpectedValue = String(formData.get('budgetOrExpectedValue') ?? '').trim();
    const desiredTimeline = String(formData.get('desiredTimeline') ?? '').trim();
    const appointmentRequest = formData.get('appointmentRequest') === 'on';
    const preferredTime = String(formData.get('preferredTime') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!customerName || !email || !inquiryIntentValue || !message) {
      return { status: 'error', message: 'Please complete name, email, inquiry type, and message.' };
    }

    if (!isInquiryIntent(inquiryIntentValue)) {
      return { status: 'error', message: 'Please select what you are looking to do.' };
    }

    const compiledMessage = [
      `Inquiry type: ${inquiryLabels[inquiryIntentValue]}`,
      appointmentRequest ? 'Appointment requested: Yes' : 'Appointment requested: No',
      preferredTime ? `Preferred time: ${preferredTime}` : null,
      watchContext ? `Brand/model/reference: ${watchContext}` : null,
      budgetOrExpectedValue ? `Budget or expected value: ${budgetOrExpectedValue}` : null,
      desiredTimeline ? `Desired timeline: ${desiredTimeline}` : null,
      '',
      message
    ]
      .filter((line): line is string => line !== null)
      .join('\n');

    await createWatchInquiry({
      customerName,
      email,
      phone,
      message: compiledMessage,
      sourcePage: `/contact:${inquiryIntentValue}`
    });

    return { status: 'success', message: 'Contact request received. We will come back with the right next step.' };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unable to submit right now.'
    };
  }
}
