import FavoritesTab from '@/modules/core/components/Customer/DashboardFrontTabs/FavoritesTab';
import OrdersTab from '@/modules/core/components/Customer/DashboardFrontTabs/OrdersTab';
import OverviewTab from '@/modules/core/components/Customer/DashboardFrontTabs/OverviewTab';
import ReviewsTab from '@/modules/core/components/Customer/DashboardFrontTabs/ReviewsTab';
import { LocalMarketProvider } from '@/modules/core/components/LocalMarketplace/LocalMarketContext';
import { LocalMarketFeaturesBanner } from '@/modules/core/components/LocalMarketplace/LocalMarketFeaturesBanner';
import { LocalMarketFilters } from '@/modules/core/components/LocalMarketplace/LocalMarketFilters';
import { LocalMarketMap } from '@/modules/core/components/LocalMarketplace/LocalMarketMap';
import { LocalMarketProducts } from '@/modules/core/components/LocalMarketplace/LocalMarketProducts';
import { useTabContext } from '@/modules/core/contexts/customer/TabContext';
import { MapPin } from 'lucide-react';

const TabContent = () => {
  const { activeTab } = useTabContext();

  return (
    <div className="space-y-6">
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'orders' && <OrdersTab />}
      {activeTab === 'favorites' && <FavoritesTab />}
      {activeTab === 'local-map' && (
        <LocalMarketProvider>
          <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
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
      )}
      {activeTab === 'reviews' && <ReviewsTab />}
    </div>
  );
};

export default TabContent;
