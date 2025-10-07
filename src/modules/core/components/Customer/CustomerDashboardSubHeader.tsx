'use client';

import { Button } from '@/modules/core/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface CustomerDashboardSubHeaderProps {
  customerName?: string;
}

export function CustomerDashboardSubHeader({
  customerName = 'John',
}: CustomerDashboardSubHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-amber-100 text-amber-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {customerName}! Here&apos;s your activity overview.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Link href="/products">
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
