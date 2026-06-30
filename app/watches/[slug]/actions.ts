'use server';

import { createWatchInquiry } from '@/lib/repositories/submissions';
import { getLeadFallbackMessage, leadSuccessMessage, sendLeadNotification, splitName } from '@/lib/lead-notifications';

type InquiryState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

export async function submitWatchInquiryAction(
  watch: { id: string; slug: string; reference: string },
  _prevState: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  try {
    const customerName = String(formData.get('customerName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!customerName || !email || !message) {
      return { status: 'error', message: 'Please provide your name, email, and message.' };
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { status: 'error', message: 'Please enter a valid email address.' };
    }

    if (message.length < 10) {
      return { status: 'error', message: 'Please add a little more detail so we can review properly.' };
    }

    const { firstName, lastName } = splitName(customerName);
    const storedLead = await createWatchInquiry({
      watchId: watch.id,
      watchSlug: watch.slug,
      watchReference: watch.reference,
      customerName,
      firstName,
      lastName,
      email,
      phone,
      desiredModelReference: watch.reference,
      message,
      sourcePage: `/watches/${watch.slug}`,
      formName: 'Request This Watch',
      leadPayload: {
        watchSlug: watch.slug,
        watchReference: watch.reference,
        message
      }
    });

    await sendLeadNotification({
      subject: 'New Positive Watch HQ Request a Watch Lead',
      formName: 'Request This Watch',
      submittedAt: storedLead.createdAt,
      fields: {
        leadId: storedLead.id,
        firstName,
        lastName,
        fullName: customerName,
        email,
        phone,
        desiredModelReference: watch.reference,
        sourcePage: `/watches/${watch.slug}`,
        message
      }
    });

    return { status: 'success', message: leadSuccessMessage };
  } catch (_error) {
    return {
      status: 'error',
      message: getLeadFallbackMessage()
    };
  }
}
