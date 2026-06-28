import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NewsletterSignupInput, SellSubmissionInput, WatchInquiryInput } from '@/types/submissions';

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured yet. Please complete environment setup.');
  }
}

export async function createWatchInquiry(input: WatchInquiryInput): Promise<void> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('watch_inquiries').insert({
    watch_id: input.watchId || null,
    watch_slug: input.watchSlug || null,
    watch_reference: input.watchReference || null,
    customer_name: input.customerName,
    email: input.email,
    phone: input.phone || null,
    message: input.message || null,
    source_page: input.sourcePage,
    status: 'new'
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function createSellSubmission(input: SellSubmissionInput): Promise<void> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('sell_submissions').insert({
    submission_type: input.submissionType,
    customer_name: input.customerName,
    email: input.email,
    phone: input.phone || null,
    brand: input.brand,
    model: input.model,
    reference_number: input.referenceNumber || null,
    condition: input.condition,
    year: input.year || null,
    box: input.box,
    papers: input.papers,
    asking_price: input.askingPrice || null,
    notes: input.notes || null,
    status: 'new'
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function createNewsletterSignup(input: NewsletterSignupInput): Promise<void> {
  assertSupabaseConfigured();

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('newsletter_signups').upsert(
    {
      email: input.email,
      source_page: input.sourcePage,
      status: 'new'
    },
    { onConflict: 'email' }
  );

  if (error) {
    throw new Error(error.message);
  }
}
