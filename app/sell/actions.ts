'use server';

import { redirect } from 'next/navigation';
import { checkRateLimit, cleanText, getPublicLeadError, hasHoneypotValue, validateEmail } from '@/lib/lead-validation';
import { createSellSubmission } from '@/lib/repositories/submissions';
import { SubmissionType } from '@/types/submissions';
import { WatchCondition } from '@/types/watch';

type SubmissionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

async function submitLead(submissionType: SubmissionType, formData: FormData): Promise<SubmissionState> {
  const customerName = cleanText(formData.get('customerName'), 120);
  const email = cleanText(formData.get('email'), 254).toLowerCase();
  const phone = cleanText(formData.get('phone'), 40);
  const brand = cleanText(formData.get('brand'), 80);
  const model = cleanText(formData.get('model'), 120);
  const referenceNumber = cleanText(formData.get('referenceNumber'), 80);
  const condition = cleanText(formData.get('condition'), 30) as WatchCondition;
  const yearValue = cleanText(formData.get('year'), 4);
  const askingPriceValue = cleanText(formData.get('askingPrice'), 20);
  const notes = cleanText(formData.get('notes'), 1500);

  if (hasHoneypotValue(formData)) {
    return { status: 'error', message: 'Unable to submit right now.' };
  }

  if (!customerName || !email || !brand || !model) {
    return { status: 'error', message: 'Please complete name, email, brand, and model.' };
  }

  if (!validateEmail(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }

  if (!checkRateLimit(submissionType, email)) {
    return { status: 'error', message: 'Please wait a moment before submitting again.' };
  }

  if (!['Unworn', 'Excellent', 'Very Good', 'Good'].includes(condition)) {
    return { status: 'error', message: 'Please choose a valid condition.' };
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

  try {
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
  } catch (error) {
    return {
      status: 'error',
      message: getPublicLeadError(error)
    };
  }

  redirect(`/thank-you?type=${submissionType}`);
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
