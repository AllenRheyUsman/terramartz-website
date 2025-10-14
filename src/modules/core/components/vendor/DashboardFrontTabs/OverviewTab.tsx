import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { useDashboard } from '@/modules/core/contexts/vendor/DashboardContext';
import { OrderWithSellerData } from '@/modules/core/types/order';
import { ProductWithSellerData } from '@/modules/core/types/product';
import { Star } from 'lucide-react';
import { JSX } from 'react';

export const OverviewTab = ({
  recentOrders,
  sellerProducts,
  getStatusColor,
  getStatusIcon,
}: {
  recentOrders: OrderWithSellerData[];
  sellerProducts: ProductWithSellerData[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
}) => {
  const { setActiveTab, loadingProducts } = useDashboard();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Orders */}
      <Card className="border-amber-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('orders')}
              className="text-amber-700 hover:bg-amber-50"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-amber-200">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card className="border-amber-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Top Selling Products</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('products')}
              className="text-amber-700 hover:bg-amber-50"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loadingProducts ? (
            <div className="flex justify-center py-8 text-gray-500 text-sm">
              Loading top products...
            </div>
          ) : sellerProducts.length === 0 ? (
            <div className="flex justify-center py-8 text-gray-500 text-sm">
              No products available.
            </div>
          ) : (
            <div className="space-y-4">
              {sellerProducts
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 4)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg"
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">${product.price}</p>
                      <div className="flex items-center text-xs text-gray-600">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        {product.rating}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>

      </Card>
    </div>
  );
};
