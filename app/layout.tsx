import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getSiteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Positive Watch Co.',
    template: '%s | Positive Watch Co.'
  },
  description: siteConfig.description,
  openGraph: {
    title: 'Positive Watch Co.',
    description: siteConfig.description,
    url: getSiteUrl(),
    siteName: siteConfig.name,
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
