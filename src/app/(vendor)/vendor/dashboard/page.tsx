/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ImageWithFallback } from '@/modules/core/components/ImageWithFallback';
import LocalMapPage from '@/modules/core/components/LocalMapPage';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Progress } from '@/modules/core/components/ui/progress';
import { Product } from '@/modules/core/types/product';
import {
  ArrowLeft,
  Award,
  CreditCard,
  Heart,
  Map,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface DashboardPageProps {
  onBack?: () => void;
  onNavigateToProducts?: () => void;
  onNavigateToLocalMap?: () => void;
  onAddToCart: (product: Product, sourceElement: HTMLElement) => void;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'shipping' | 'processing' | 'cancelled';
  items: number;
  trackingNumber?: string;
}

interface Favorite {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function DashboardPage({
  onBack,
  onNavigateToProducts,
  onNavigateToLocalMap,
  onAddToCart,
}: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'favorites' | 'reviews' | 'local-map'
  >('overview');

  // Mock user data
  const userStats = {
    totalOrders: 24,
    totalSpent: 3456.78,
    loyaltyPoints: 2850,
    savedItems: 12,
    reviewsGiven: 8,
    memberSince: '2023-03-15',
  };

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

  const favoriteProducts: Favorite[] = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1546470427-e2a323f21d5a?w=400',
      category: 'Vegetables',
    },
    {
      id: 2,
      name: 'Fresh Basil',
      price: 2.99,
      image:
        'https://images.unsplash.com/photo-1462936769611-49bcf3b52f5b?w=400',
      category: 'Herbs',
    },
    {
      id: 3,
      name: 'Avocados',
      price: 6.99,
      image:
        'https://images.unsplash.com/photo-1583408723184-86d52c32de93?w=400',
      category: 'Fruits',
    },
    {
      id: 4,
      name: 'Organic Eggs',
      price: 8.99,
      image:
        'https://images.unsplash.com/photo-1508051123222-b47e25ce7f91?w=400',
      category: 'Dairy',
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

  const loyaltyProgress = (userStats.loyaltyPoints / 5000) * 100; // Assuming 5000 points for next tier

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="hover:bg-amber-100 text-amber-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, John! Here&apos;s your activity overview.&apos;
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={onNavigateToProducts}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-xs text-green-600 mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

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
                <p className="text-xs text-gray-600 mt-1">
                  Awaiting your return
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Loyalty Progress */}
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
                <Progress
                  value={loyaltyProgress}
                  className="h-2 bg-amber-100"
                />
                <p className="text-xs text-gray-600">
                  Earn {5000 - userStats.loyaltyPoints} more points to unlock
                  Platinum benefits!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-amber-100 p-1 rounded-lg w-fit">
          {[
            { key: 'overview', label: 'Overview', icon: TrendingUp },
            { key: 'local-map', label: 'Local Map', icon: Map },
            { key: 'orders', label: 'Recent Orders', icon: Package },
            { key: 'favorites', label: 'Favorites', icon: Heart },
            { key: 'reviews', label: 'Reviews', icon: Star },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={activeTab === key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(key as any)}
              className={
                activeTab === key
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-amber-700 hover:bg-amber-50'
              }
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
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
                          <p className="font-medium text-gray-900">
                            Order Delivered
                          </p>
                          <p className="text-sm text-gray-600">
                            ORD-001 • 2 days ago
                          </p>
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
                          <p className="font-medium text-gray-900">
                            Review Posted
                          </p>
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
                      <Button
                        variant="outline"
                        className="h-20 flex-col border-amber-300 hover:bg-amber-50"
                        onClick={onNavigateToProducts}
                      >
                        <ShoppingBag className="w-6 h-6 mb-2 text-amber-600" />
                        Shop Now
                      </Button>
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
          )}

          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
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
                              <p className="font-medium text-gray-900">
                                {order.id}
                              </p>
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
                              className={`text-xs ${getStatusColor(
                                order.status,
                              )}`}
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
          )}

          {activeTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Your Favorite Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {favoriteProducts.map((product) => (
                      <div
                        key={product.id}
                        className="border border-amber-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white"
                          >
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          </Button>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {product.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-green-600">
                              ${product.price}
                            </span>
                            <Button
                              size="sm"
                              className="bg-amber-500 hover:bg-amber-600 text-white"
                              onClick={(e) => {
                                onAddToCart?.(
                                  product as unknown as Product,
                                  e.currentTarget as HTMLElement,
                                );
                              }}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'local-map' && (
            <LocalMapPage
              onBack={() => setActiveTab('overview')}
              onAddToCart={(product: Product, sourceElement: HTMLElement) => {
                // handle add to cart logic
              }}
            />
          )}

          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Your Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        You&apos;ve written {userStats.reviewsGiven} reviews so
                        far!
                      </p>
                      <Button
                        onClick={onNavigateToProducts}
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                      >
                        Shop & Review More Products
                      </Button>
                    </div>

                    {/* Sample reviews would go here */}
                    <div className="space-y-4">
                      <div className="border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1546470427-e2a323f21d5a?w=100"
                            alt="Product"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">
                              Organic Tomatoes
                            </h4>
                            <div className="flex items-center space-x-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-4 h-4 text-amber-400 fill-current"
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              &ldquo;Amazing quality tomatoes! Fresh, juicy, and
                              perfect for salads. Will definitely order
                              again.&rdquo;
                            </p>

                            <p className="text-xs text-gray-500 mt-2">
                              Reviewed 3 days ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
