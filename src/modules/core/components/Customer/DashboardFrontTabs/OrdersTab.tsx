import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Order } from '@/modules/core/types/order';
import { Badge, Package } from 'lucide-react';
import { motion } from 'motion/react';
const OrdersTab = () => {
  const recentOrders: Order[] = [
    {
      id: 'ORD-001',
      date: '2025-01-18',
      total: 89.99,
      status: 'delivered',
      items: 5,
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-002',
      date: '2025-01-15',
      total: 45.5,
      status: 'shipping',
      items: 3,
      trackingNumber: 'TRK987654321',
    },
    {
      id: 'ORD-003',
      date: '2025-01-12',
      total: 156.25,
      status: 'processing',
      items: 8,
    },
    {
      id: 'ORD-004',
      date: '2025-01-10',
      total: 67.8,
      status: 'delivered',
      items: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipping':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-amber-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="border border-amber-200 rounded-lg p-4 hover:bg-amber-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString()} •{' '}
                        {order.items} items
                      </p>
                      {order.trackingNumber && (
                        <p className="text-xs text-blue-600">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <Badge
                      className={`text-xs ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrdersTab;
