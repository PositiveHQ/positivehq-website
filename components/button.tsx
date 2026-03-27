import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit';
};

const baseClass =
  'inline-flex items-center justify-center rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300';

const variantClass = {
  primary:
    'border border-amber-100/20 bg-gradient-to-r from-amber-100/90 via-amber-200 to-amber-100/90 text-slate-950 shadow-[0_10px_26px_rgba(194,166,110,0.35)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(194,166,110,0.45)]',
  secondary:
    'border border-white/25 bg-white/5 text-slate-100 backdrop-blur hover:-translate-y-0.5 hover:border-amber-100/45 hover:bg-white/10'
};

export function Button({ children, href, variant = 'primary', className = '', type = 'button' }: ButtonProps) {
  const classes = `${baseClass} ${variantClass[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
