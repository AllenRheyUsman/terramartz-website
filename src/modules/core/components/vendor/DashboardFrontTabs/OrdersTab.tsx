import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { OrderWithSellerData } from '@/modules/core/types/order';
import { MessageSquare } from 'lucide-react';
import { JSX } from 'react';

export const OrdersTab = ({
  recentOrders,
  getStatusColor,
  getStatusIcon,
}: {
  recentOrders: OrderWithSellerData[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
}) => {
  return (
    <Card className="border-amber-200 shadow-sm">
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="border border-amber-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{order.id}</h3>
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
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Products:</strong> {order.items.join(', ')}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                {order.status === 'pending' && (
                  <Button
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Accept Order
                  </Button>
                )}
                {order.status === 'processing' && (
                  <Button
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Mark as Shipped
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Customer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
