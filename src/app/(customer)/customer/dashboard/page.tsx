'use client';
import { CustomerDashboardSubHeader } from '@/modules/core/components/Customer/CustomerDashboardSubHeader';
import NavigationTabs from '@/modules/core/components/Customer/DashboardFrontTabs/NavigationTabs';
import TabContent from '@/modules/core/components/Customer/DashboardFrontTabs/TabContent';
import LoyaltyProgress from '@/modules/core/components/Customer/LoyaltyProgress';
import StatsCards from '@/modules/core/components/Customer/StatsCards';
import { TabProvider } from '@/modules/core/contexts/customer/TabContext';
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <CustomerDashboardSubHeader customerName="John Doe" />
        {/* Stats Cards */}
        <StatsCards />

        {/* Loyalty Progress */}
        <LoyaltyProgress />
        {/* Content */}
        <TabProvider>
          <div className="p-4">
            <NavigationTabs />
            <TabContent />
          </div>
        </TabProvider>
      </div>
    </div>
  );
}
