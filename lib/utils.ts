import { WatchStatus } from '@/types/watch';

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));

export const formatWatchStatus = (status: WatchStatus) => {
  if (status === 'in_stock') return 'In Stock';
  if (status === 'reserved') return 'Reserved';
  return 'Sold';
};

export const formatBoxAndPapers = (box: boolean, papers: boolean) => {
  if (box && papers) return 'Full Set';
  if (!box && !papers) return 'Watch Only';
  return 'Partial Set';
};
