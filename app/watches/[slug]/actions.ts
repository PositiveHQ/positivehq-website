'use server';

import { createWatchInquiry } from '@/lib/repositories/submissions';

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

    if (!customerName || !email) {
      return { status: 'error', message: 'Please provide your name and email.' };
    }

    await createWatchInquiry({
      watchId: watch.id,
      watchSlug: watch.slug,
      watchReference: watch.reference,
      customerName,
      email,
      phone,
      message,
      sourcePage: `/watches/${watch.slug}`
    });

    return { status: 'success', message: 'Inquiry sent. We will contact you shortly.' };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unable to submit inquiry right now.'
    };
  }
}
