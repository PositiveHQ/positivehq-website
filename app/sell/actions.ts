'use server';

import { createSellSubmission } from '@/lib/repositories/submissions';
import { SubmissionType } from '@/types/submissions';
import { WatchCondition } from '@/types/watch';

type SubmissionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

async function submitLead(submissionType: SubmissionType, formData: FormData): Promise<SubmissionState> {
  try {
    const customerName = String(formData.get('customerName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const brand = String(formData.get('brand') ?? '').trim();
    const model = String(formData.get('model') ?? '').trim();
    const referenceNumber = String(formData.get('referenceNumber') ?? '').trim();
    const condition = String(formData.get('condition') ?? 'Excellent') as WatchCondition;
    const yearValue = String(formData.get('year') ?? '').trim();
    const askingPriceValue = String(formData.get('askingPrice') ?? '').trim();
    const notes = String(formData.get('notes') ?? '').trim();

    if (!customerName || !email || !brand || !model) {
      return { status: 'error', message: 'Please complete name, email, brand, and model.' };
    }

    const year = yearValue ? Number(yearValue) : undefined;
    if (yearValue && (Number.isNaN(year) || year < 1900 || year > 2100)) {
      return { status: 'error', message: 'Year must be between 1900 and 2100.' };
    }

    const askingPrice = askingPriceValue ? Number(askingPriceValue) : undefined;
    if (askingPriceValue && (Number.isNaN(askingPrice) || askingPrice < 0)) {
      return { status: 'error', message: 'Asking price must be a positive number.' };
    }

    await createSellSubmission({
      submissionType,
      customerName,
      email,
      phone,
      brand,
      model,
      referenceNumber,
      condition,
      year,
      box: formData.get('box') === 'on',
      papers: formData.get('papers') === 'on',
      askingPrice,
      notes
    });

    return {
      status: 'success',
      message: submissionType === 'sell' ? 'Submission received. We will send an offer shortly.' : 'Trade request received. We will follow up with options.'
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unable to submit right now.'
    };
  }
}

export async function submitSellSubmissionAction(
  _prevState: SubmissionState,
  formData: FormData
): Promise<SubmissionState> {
  return submitLead('sell', formData);
}

export async function submitTradeSubmissionAction(
  _prevState: SubmissionState,
  formData: FormData
): Promise<SubmissionState> {
  return submitLead('trade', formData);
}
