'use client';

import { useEffect, useState } from 'react';

type StudioModule = {
  NextStudio: (props: { config: unknown }) => JSX.Element;
};

export default function StudioPage() {
  const [studioModule, setStudioModule] = useState<StudioModule | null>(null);
  const [studioConfig, setStudioConfig] = useState<unknown>(null);

  const configured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) && Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET);

  useEffect(() => {
    if (!configured) return;

    let active = true;

    Promise.all([import('next-sanity/studio'), import('@/sanity.config')])
      .then(([studio, config]) => {
        if (!active) return;
        setStudioModule(studio as StudioModule);
        setStudioConfig(config.default);
      })
      .catch(() => {
        if (!active) return;
        setStudioModule(null);
        setStudioConfig(null);
      });

    return () => {
      active = false;
    };
  }, [configured]);

  if (!configured) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-white">Sanity Studio unavailable</h1>
        <p className="mt-3 text-sm text-slate-300">Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to enable Studio.</p>
      </main>
    );
  }

  if (!studioModule || !studioConfig) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-slate-300">Loading Studio…</p>
      </main>
    );
  }

  const NextStudio = studioModule.NextStudio;
  return <NextStudio config={studioConfig} />;
}
