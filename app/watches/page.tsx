import { Container } from '@/components/container';
import { WatchesCatalog } from '@/components/watches-catalog';
import { watches } from '@/data/watches';

export default function WatchesPage() {
  return (
    <Container className="space-y-10 py-16">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Inventory</p>
        <h1 className="text-4xl font-semibold text-slate-900">Shop watches</h1>
        <p className="max-w-2xl text-sm text-slate-600">Curated dealer inventory with clear condition grading, authenticated details, and insured delivery.</p>
      </header>
      <WatchesCatalog watches={watches} />
    </Container>
  );
}
