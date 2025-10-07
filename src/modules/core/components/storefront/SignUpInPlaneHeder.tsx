'use client';

import { Button } from '@/modules/core/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SignUpInPlaneHeder() {
  const pathname = usePathname();

  // Determine which portal to show
  let portalLabel = 'Customer Portal';

  if (pathname.includes('/became-a-seller')) {
    portalLabel = 'Seller Portal';
  } else if (
    pathname.includes('/login') ||
    pathname.includes('/register') ||
    pathname.includes('/sign-in')
  ) {
    portalLabel = 'Customer Portal';
  } else if (pathname.includes('/forget-password')) {
    portalLabel = 'Password Recovery';
  }

  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-amber-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <Link href={'/'}>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </Link>

          {/* Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🌱</span>
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Terramartz
              </h1>
              <span className="text-xs text-gray-600 font-medium -mt-1">
                {portalLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
