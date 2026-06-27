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
    const boxPapers = String(formData.get('boxPapers') ?? '').trim();
    const serviceHistory = String(formData.get('serviceHistory') ?? '').trim();
    const aftermarketParts = String(formData.get('aftermarketParts') ?? '').trim();
    const timeline = String(formData.get('timeline') ?? '').trim();
    const targetWatch = String(formData.get('targetWatch') ?? '').trim();
    const cashDifference = String(formData.get('cashDifference') ?? '').trim();
    const extendedNotes = [
      notes,
      boxPapers && `Box/papers: ${boxPapers}`,
      serviceHistory && `Service history: ${serviceHistory}`,
      aftermarketParts && `Aftermarket parts: ${aftermarketParts}`,
      timeline && `Timeline: ${timeline}`,
      targetWatch && `Target watch: ${targetWatch}`,
      cashDifference && `Expected cash difference: ${cashDifference}`
    ].filter(Boolean).join('\n');

    if (!customerName || !email || !brand || !model) {
      return { status: 'error', message: 'Please complete name, email, brand, and model.' };
    }

    let year: number | undefined;
    if (yearValue) {
      const parsedYear = Number(yearValue);
      if (!Number.isFinite(parsedYear) || parsedYear < 1900 || parsedYear > 2100) {
        return { status: 'error', message: 'Year must be between 1900 and 2100.' };
      }
      year = parsedYear;
    }

    let askingPrice: number | undefined;
    if (askingPriceValue) {
      const parsedAskingPrice = Number(askingPriceValue);
      if (!Number.isFinite(parsedAskingPrice) || parsedAskingPrice < 0) {
        return { status: 'error', message: 'Asking price must be a positive number.' };
      }
      askingPrice = parsedAskingPrice;
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
      box: formData.get('box') === 'on' || boxPapers === 'Full set' || boxPapers === 'Box only',
      papers: formData.get('papers') === 'on' || boxPapers === 'Full set' || boxPapers === 'Papers only',
      askingPrice,
      notes: extendedNotes
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
