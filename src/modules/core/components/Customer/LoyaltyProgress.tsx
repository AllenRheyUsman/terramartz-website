import { Badge } from '@/modules/core/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Progress } from '@/modules/core/components/ui/progress';
import { motion } from 'motion/react';
const LoyaltyProgress = () => {
  const userStats = {
    totalOrders: 24,
    totalSpent: 3456.78,
    loyaltyPoints: 2850,
    savedItems: 12,
    reviewsGiven: 8,
    memberSince: '2023-03-15',
  };
  const loyaltyProgress = (userStats.loyaltyPoints / 5000) * 100; // Assuming 5000 points for next tier

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-8"
    >
      <Card className="border-amber-200 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-gray-900">
                Loyalty Status
              </CardTitle>
              <p className="text-sm text-gray-600">
                Gold Member since{' '}
                {new Date(userStats.memberSince).toLocaleDateString()}
              </p>
            </div>
            <Badge className="bg-amber-500 text-white">Gold Tier</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress to Platinum</span>
              <span className="font-medium">
                {userStats.loyaltyPoints} / 5,000 points
              </span>
            </div>
            <Progress value={loyaltyProgress} className="h-2 bg-amber-100" />
            <p className="text-xs text-gray-600">
              Earn {5000 - userStats.loyaltyPoints} more points to unlock
              Platinum benefits!
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoyaltyProgress;
