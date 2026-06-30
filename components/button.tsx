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
    'border border-amber-100/25 bg-gradient-to-r from-[#F7E2A6] via-[#D9B76B] to-[#F7E2A6] text-[#020814] shadow-[0_10px_28px_rgba(217,183,107,0.34)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(217,183,107,0.46)]',
  secondary:
    'border border-white/25 bg-[#123A6F]/18 text-slate-100 backdrop-blur hover:-translate-y-0.5 hover:border-amber-100/45 hover:bg-[#123A6F]/28'
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
