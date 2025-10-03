'use client';
import { Button } from '@/modules/core/components/ui/button';
import DashboardTabs from '@/modules/core/components/vendor/DashboardFrontTabs/DashboardTabs';
import PerformanceOverview from '@/modules/core/components/vendor/PerformanceOverview';
import StatsCards from '@/modules/core/components/vendor/StatsCards';
import VendorDashboardSubHeaderHeader from '@/modules/core/components/vendor/VendorDashboardSubHeader';

import { Product } from '@/modules/core/types/product';
import { Plus, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
interface SellerDashboardProps {
  onBack?: () => void;
  onAddProduct?: () => void;
  onEditProduct?: (product: Product) => void;
}
export default function SellerDashboard({
  onEditProduct,
}: SellerDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <VendorDashboardSubHeaderHeader
          title="Seller Dashboard"
          subtitle="Welcome back, Green Valley Farm! 🌱"
          backLabel="Back to Store"
          backHref="/"
          actions={
            <>
              <Link href="/vendor/product/new">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  <Plus className="w-4 h-4 mr-2" /> Add Product
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Button>
            </>
          }
        />

        {/* Stats Cards */}
        <StatsCards />
        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <PerformanceOverview />
        </motion.div>

        {/* Tabs */}
        <DashboardTabs onEditProduct={onEditProduct} />
      </div>
    </div>
  );
}
