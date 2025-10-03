import Footer from '@/modules/core/components/storefront/Footer';
import SignUpInPlaneHeder from '@/modules/core/components/storefront/components/SignUpInPlaneHeder';
import '@/styles/themes/storefront.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TerraMartz | Auth',
  description: 'Authentication pages',
};

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-green-50">
      <SignUpInPlaneHeder />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
