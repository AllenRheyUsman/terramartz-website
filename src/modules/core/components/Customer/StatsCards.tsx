'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Award, CreditCard, Heart, Package } from 'lucide-react';
import { motion } from 'motion/react';

const StatsCards = () => {
  const userStats = {
    totalOrders: 24,
    totalSpent: 1298.75,
    loyaltyPoints: 3250,
    savedItems: 12,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-amber-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Orders
              </CardTitle>
              <Package className="w-4 h-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {userStats.totalOrders}
            </div>
            <p className="text-xs text-green-600 mt-1">+3 this month</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Spent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-amber-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Spent
              </CardTitle>
              <CreditCard className="w-4 h-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${userStats.totalSpent.toFixed(2)}
            </div>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Loyalty Points */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-amber-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                Loyalty Points
              </CardTitle>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {userStats.loyaltyPoints.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {5000 - userStats.loyaltyPoints} points to next tier
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Saved Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-amber-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                Saved Items
              </CardTitle>
              <Heart className="w-4 h-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {userStats.savedItems}
            </div>
            <p className="text-xs text-gray-600 mt-1">Awaiting your return</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatsCards;
