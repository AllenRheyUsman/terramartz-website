import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { useTabContext } from '@/modules/core/contexts/customer/TabContext';
import { Heart, Map, Package, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const OverviewTab = () => {
  const { setActiveTab } = useTabContext(); // Get setActiveTab from context

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-amber-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Delivered</p>
                  <p className="text-sm text-gray-600">ORD-001 • 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Added to Favorites
                  </p>
                  <p className="text-sm text-gray-600">
                    Organic Strawberries • 4 days ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Review Posted</p>
                  <p className="text-sm text-gray-600">
                    Fresh Basil Pack • 5 days ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-amber-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col border-amber-300 hover:bg-amber-50"
                onClick={() => setActiveTab('orders')}
              >
                <Package className="w-6 h-6 mb-2 text-amber-600" />
                View Orders
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col border-amber-300 hover:bg-amber-50"
                onClick={() => setActiveTab('favorites')}
              >
                <Heart className="w-6 h-6 mb-2 text-amber-600" />
                My Favorites
              </Button>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="h-20 flex-col border-amber-300 hover:bg-amber-50"
                >
                  <ShoppingBag className="w-6 h-6 mb-2 text-amber-600" />
                  Shop Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className="h-20 flex-col border-amber-300 hover:bg-amber-50"
                onClick={() => setActiveTab('local-map')}
              >
                <Map className="w-6 h-6 mb-2 text-amber-600" />
                Local Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OverviewTab;
