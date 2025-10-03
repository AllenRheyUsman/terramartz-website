/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/modules/core/components/ui/tabs';
import {
  DashboardProvider,
  useDashboard,
} from '@/modules/core/contexts/vendor/DashboardContext';
import { ProductWithSellerData } from '@/modules/core/types/product';
import { AnalyticsTab } from './AnalyticsTab';
import { DeleteProductModal } from './DeleteProductModal';
import { OrdersTab } from './OrdersTab';
import { OverviewTab } from './OverviewTab';
import { ProductsTab } from './ProductsTab';
import { ViewProductModal } from './ViewProductModal';

const VendorDashboardTabsInner = ({
  onAddProduct,
  onEditProduct,
}: {
  onAddProduct?: () => void;
  onEditProduct?: (product: ProductWithSellerData) => void;
}) => {
  const {
    activeTab,
    setActiveTab,
    sellerProducts,
    recentOrders,
    getStatusColor,
    getStatusIcon,
  } = useDashboard();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-amber-100 p-1 rounded-lg">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="products">My Products</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab
          recentOrders={recentOrders}
          sellerProducts={sellerProducts}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      </TabsContent>

      <TabsContent value="products">
        <ProductsTab
          sellerProducts={sellerProducts}
          onAddProduct={onAddProduct}
          onEditProduct={onEditProduct}
          getStatusColor={getStatusColor}
        />
      </TabsContent>

      <TabsContent value="orders">
        <OrdersTab
          recentOrders={recentOrders}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      </TabsContent>

      <TabsContent value="analytics">
        <AnalyticsTab />
      </TabsContent>

      {/* Modals */}
      <ViewProductModal onEditProduct={onEditProduct} />
      <DeleteProductModal />
    </Tabs>
  );
};

const DashboardTabs = (props: any) => (
  <DashboardProvider>
    <VendorDashboardTabsInner {...props} />
  </DashboardProvider>
);

export default DashboardTabs;
