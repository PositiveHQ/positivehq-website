'use client';

import { PortableText } from '@portabletext/react';

type Props = {
  value: unknown;
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

export function RichText({ value }: Props) {
  if (isStringArray(value)) {
    return (
      <div className="space-y-6 text-base leading-7 text-slate-700">
        {value.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="prose prose-slate max-w-none">
        <PortableText value={value} />
      </div>
    );
  }

  return <p className="text-base text-slate-700">Content unavailable.</p>;
}
