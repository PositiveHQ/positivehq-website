'use server';

import { headers } from 'next/headers';
import { createSellSubmission } from '@/lib/repositories/submissions';
import { getLeadFallbackMessage, leadSuccessMessage, sendLeadNotification, splitName } from '@/lib/lead-notifications';
import { buildSmsConsentEvidence } from '@/lib/sms-consent';
import { SubmissionType } from '@/types/submissions';
import { WatchCondition } from '@/types/watch';

type SubmissionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

function subjectForSubmission(submissionType: SubmissionType) {
  if (submissionType === 'trade' || submissionType === 'consignment') return 'New Positive Watch HQ Trade / Consignment Lead';
  return 'New Positive Watch HQ Watch Review Lead';
}

function formNameForSubmission(submissionType: SubmissionType) {
  if (submissionType === 'trade') return 'Trade Inquiry';
  if (submissionType === 'consignment') return 'Consignment Inquiry';
  return 'Start Watch Review / Sell Your Watch';
}

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
    const desiredOutcome = submissionType;
    const sourcePage = submissionType === 'sell' ? '/sell#sell-form' : submissionType === 'trade' ? '/trade-in#trade-form' : '/consignment#consignment-review';
    const smsConsentEvidence = buildSmsConsentEvidence(formData, sourcePage, undefined, headers().get('referer'));
    const formName = formNameForSubmission(submissionType);
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

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { status: 'error', message: 'Please enter a valid email address.' };
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

    const { firstName, lastName } = splitName(customerName);
    const storedLead = await createSellSubmission({
      submissionType,
      customerName,
      firstName,
      lastName,
      email,
      phone,
      brand,
      model,
      referenceNumber,
      condition,
      year,
      box: formData.get('box') === 'on' || boxPapers === 'Full set' || boxPapers === 'Box only',
      papers: formData.get('papers') === 'on' || boxPapers === 'Full set' || boxPapers === 'Papers only',
      boxPapersStatus: boxPapers,
      askingPrice,
      desiredOutcome,
      sourcePage,
      formName,
      leadPayload: {
        ...smsConsentEvidence,
        submissionType,
        desiredOutcome,
        boxPapers,
        serviceHistory,
        aftermarketParts,
        timeline,
        targetWatch,
        cashDifference,
        notes
      },
      notes: extendedNotes
    });

    await sendLeadNotification({
      subject: subjectForSubmission(submissionType),
      formName,
      submittedAt: storedLead.createdAt,
      fields: {
        leadId: storedLead.id,
        firstName,
        lastName,
        fullName: customerName,
        email,
        phone,
        smsConsent: smsConsentEvidence.smsConsent,
        smsConsentAt: smsConsentEvidence.smsConsentAt,
        submissionPageUrl: smsConsentEvidence.submissionPageUrl,
        submittedAt: smsConsentEvidence.submittedAt,
        desiredOutcome,
        watchBrand: brand,
        modelReference: [model, referenceNumber].filter(Boolean).join(' / '),
        year: year || '',
        condition,
        boxPapersStatus: boxPapers,
        serviceHistory,
        aftermarketParts,
        timeline,
        targetWatch,
        expectedCashDifference: cashDifference,
        sourcePage,
        notes
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

export async function submitConsignmentSubmissionAction(
  _prevState: SubmissionState,
  formData: FormData
): Promise<SubmissionState> {
  return submitLead('consignment', formData);
}
