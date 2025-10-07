'use client';
import { LocalMarketProvider } from '@/modules/core/components/LocalMarketplace/LocalMarketContext';
import { LocalMarketFeaturesBanner } from '@/modules/core/components/LocalMarketplace/LocalMarketFeaturesBanner';
import { LocalMarketFilters } from '@/modules/core/components/LocalMarketplace/LocalMarketFilters';
import { LocalMarketMap } from '@/modules/core/components/LocalMarketplace/LocalMarketMap';
import { LocalMarketProducts } from '@/modules/core/components/LocalMarketplace/LocalMarketProducts';
import { Button } from '@/modules/core/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
export default function LocalMapPage() {
  return (
    <LocalMarketProvider>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
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
                <h1 className="text-3xl font-bold text-gray-900">
                  Local Marketplace
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover fresh produce from nearby farms 🌱
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Montreal, QC</span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LocalMarketMap />
              <LocalMarketFeaturesBanner />
            </div>
            <div className="space-y-6">
              <LocalMarketFilters />
              <LocalMarketProducts />
            </div>
          </div>
        </div>
      </div>
    </LocalMarketProvider>
  );
}
