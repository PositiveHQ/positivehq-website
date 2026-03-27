import Link from 'next/link';
import { Container } from '@/components/container';

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-sm text-slate-600">The page you requested is unavailable.</p>
      <Link href="/" className="mt-6 inline-flex text-sm font-medium text-slate-900 underline">Return home</Link>
    </Container>
  );
}
