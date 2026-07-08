import { WatchCondition } from './watch';

export type LeadStatus = 'new' | 'contacted' | 'closed';
export type SubmissionType = 'sell' | 'trade' | 'consignment';

export interface WatchInquiry {
  id: string;
  createdAt: string;
  watchId?: string;
  watchSlug?: string;
  watchReference?: string;
  customerName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  desiredBrand?: string;
  desiredModelReference?: string;
  budgetRange?: string;
  timeline?: string;
  message?: string;
  sourcePage: string;
  formName?: string;
  leadPayload?: Record<string, unknown>;
  status: LeadStatus;
}

export interface SellSubmission {
  id: string;
  createdAt: string;
  submissionType: SubmissionType;
  customerName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  brand: string;
  model: string;
  referenceNumber?: string;
  condition: WatchCondition;
  year?: number;
  box: boolean;
  papers: boolean;
  boxPapersStatus?: string;
  askingPrice?: number;
  desiredOutcome?: SubmissionType | 'not sure';
  sourcePage?: string;
  formName?: string;
  leadPayload?: Record<string, unknown>;
  notes?: string;
  status: LeadStatus;
}

export type StoredLead = {
  id: string;
  createdAt: string;
};

export interface WatchInquiryInput {
  watchId?: string;
  watchSlug?: string;
  watchReference?: string;
  customerName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  desiredBrand?: string;
  desiredModelReference?: string;
  budgetRange?: string;
  timeline?: string;
  message?: string;
  sourcePage: string;
  formName?: string;
  leadPayload?: Record<string, unknown>;
}

export interface SellSubmissionInput {
  submissionType: SubmissionType;
  customerName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  brand: string;
  model: string;
  referenceNumber?: string;
  condition: WatchCondition;
  year?: number;
  box: boolean;
  papers: boolean;
  boxPapersStatus?: string;
  askingPrice?: number;
  desiredOutcome?: SubmissionType | 'not sure';
  sourcePage?: string;
  formName?: string;
  leadPayload?: Record<string, unknown>;
  notes?: string;
}

export interface NewsletterSignupInput {
  email: string;
  sourcePage: string;
}
