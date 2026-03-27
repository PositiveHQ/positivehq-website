import { WatchCondition } from './watch';

export type LeadStatus = 'new' | 'contacted' | 'closed';
export type SubmissionType = 'sell' | 'trade';

export interface WatchInquiry {
  id: string;
  createdAt: string;
  watchId?: string;
  watchSlug?: string;
  watchReference?: string;
  customerName: string;
  email: string;
  phone?: string;
  message?: string;
  sourcePage: string;
  status: LeadStatus;
}

export interface SellSubmission {
  id: string;
  createdAt: string;
  submissionType: SubmissionType;
  customerName: string;
  email: string;
  phone?: string;
  brand: string;
  model: string;
  referenceNumber?: string;
  condition: WatchCondition;
  year?: number;
  box: boolean;
  papers: boolean;
  askingPrice?: number;
  notes?: string;
  status: LeadStatus;
}

export interface WatchInquiryInput {
  watchId?: string;
  watchSlug?: string;
  watchReference?: string;
  customerName: string;
  email: string;
  phone?: string;
  message?: string;
  sourcePage: string;
}

export interface SellSubmissionInput {
  submissionType: SubmissionType;
  customerName: string;
  email: string;
  phone?: string;
  brand: string;
  model: string;
  referenceNumber?: string;
  condition: WatchCondition;
  year?: number;
  box: boolean;
  papers: boolean;
  askingPrice?: number;
  notes?: string;
}
