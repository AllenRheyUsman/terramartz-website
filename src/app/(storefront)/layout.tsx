import '@/styles/themes/storefront.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TerraMartz | Shop the Marketplace',
  description: 'Multi-vendor storefront powered by Next.js 15',
};

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
