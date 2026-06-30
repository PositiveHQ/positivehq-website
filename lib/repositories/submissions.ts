import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewsletterSignupInput, SellSubmissionInput, StoredLead, WatchInquiryInput } from '@/types/submissions';
import { getLeadFallbackMessage } from '@/lib/lead-notifications';

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error(getLeadFallbackMessage());
  }
}

function normalizeStoredLead(row: { id: string; created_at: string }): StoredLead {
  return { id: row.id, createdAt: row.created_at };
}

export async function createWatchInquiry(input: WatchInquiryInput): Promise<StoredLead> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('watch_inquiries')
    .insert({
      watch_id: input.watchId || null,
      watch_slug: input.watchSlug || null,
      watch_reference: input.watchReference || null,
      customer_name: input.customerName,
      first_name: input.firstName || null,
      last_name: input.lastName || null,
      email: input.email,
      phone: input.phone || null,
      desired_brand: input.desiredBrand || null,
      desired_model_reference: input.desiredModelReference || null,
      budget_range: input.budgetRange || null,
      timeline: input.timeline || null,
      message: input.message || null,
      source_page: input.sourcePage,
      form_name: input.formName || 'Request a Watch',
      lead_payload: input.leadPayload || {},
      status: 'new'
    })
    .select('id, created_at')
    .single();

  if (error) {
    throw new Error(getLeadFallbackMessage());
  }

  return normalizeStoredLead(data);
}

export async function createSellSubmission(input: SellSubmissionInput): Promise<StoredLead> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('sell_submissions')
    .insert({
      submission_type: input.submissionType,
      customer_name: input.customerName,
      first_name: input.firstName || null,
      last_name: input.lastName || null,
      email: input.email,
      phone: input.phone || null,
      brand: input.brand,
      model: input.model,
      reference_number: input.referenceNumber || null,
      condition: input.condition,
      year: input.year || null,
      box: input.box,
      papers: input.papers,
      box_papers_status: input.boxPapersStatus || null,
      asking_price: input.askingPrice || null,
      desired_outcome: input.desiredOutcome || input.submissionType,
      source_page: input.sourcePage || `/${input.submissionType}`,
      form_name: input.formName || 'Watch Review',
      lead_payload: input.leadPayload || {},
      notes: input.notes || null,
      status: 'new'
    })
    .select('id, created_at')
    .single();

  if (error) {
    throw new Error(getLeadFallbackMessage());
  }

  return normalizeStoredLead(data);
}

export async function createNewsletterSignup(input: NewsletterSignupInput): Promise<StoredLead> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('newsletter_signups')
    .upsert(
      {
        email: input.email,
        source_page: input.sourcePage,
        status: 'new'
      },
      { onConflict: 'email' }
    )
    .select('id, created_at')
    .single();

  if (error) {
    throw new Error(getLeadFallbackMessage());
  }

  return normalizeStoredLead(data);
}
