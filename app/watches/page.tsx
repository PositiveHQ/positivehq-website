import { Metadata } from 'next';
import { Container } from '@/components/container';
import { WatchesCatalog } from '@/components/watches-catalog';
import { getAllWatches } from '@/lib/repositories/watches';

export const metadata: Metadata = {
  title: 'Shop Watches',
  description: 'Browse authenticated luxury watch inventory with transparent condition details.',
  alternates: { canonical: '/watches' }
};

export default async function WatchesPage() {
  const watches = await getAllWatches();

  return (
    <Container className="space-y-10 py-16">
      <header className="space-y-3">
        <p className="eyebrow">Inventory</p>
        <h1 className="section-title">Shop watches</h1>
        <p className="max-w-2xl text-sm text-slate-300">Curated dealer inventory with clear condition grading, authenticated details, and insured delivery.</p>
      </header>
      <WatchesCatalog watches={watches} />
    </Container>
  );
}
