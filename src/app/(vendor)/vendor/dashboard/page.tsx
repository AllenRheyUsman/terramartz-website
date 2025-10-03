'use client';
import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Progress } from '@/modules/core/components/ui/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/modules/core/components/ui/tabs';
import { OrderWithSellerData } from '@/modules/core/types/order';
import { Product, ProductWithSellerData } from '@/modules/core/types/product';
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  Eye,
  MessageSquare,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Star,
  Trash2,
  TrendingUp,
  Truck,
  X,
  XCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
interface SellerDashboardProps {
  onBack?: () => void;
  onAddProduct?: () => void;
  onEditProduct?: (product: Product) => void;
}
export default function SellerDashboard({
  onBack,
  onAddProduct,
  onEditProduct,
}: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [viewProduct, setViewProduct] = useState<ProductWithSellerData | null>(
    null,
  );
  const [deleteProduct, setDeleteProduct] =
    useState<ProductWithSellerData | null>(null);

  // Mock data for seller dashboard
  const sellerStats = {
    totalSales: 15420.5,
    monthlyGrowth: 12.5,
    totalProducts: 28,
    activeOrders: 15,
    totalCustomers: 342,
    averageRating: 4.8,
    totalViews: 5234,
    conversionRate: 3.2,
  };
  const recentOrders: OrderWithSellerData[] = [
    {
      id: 'ORD-2024-001',
      customer: 'Sarah Johnson',
      items: ['Organic Tomatoes', 'Fresh Basil'],
      total: 12.99,
      status: 'pending',
      date: '2025-01-20',
      address: '123 Main St, Cityville',
    },
    {
      id: 'ORD-2024-002',
      customer: 'Mike Chen',
      items: ['Avocados', 'Lettuce Mix'],
      total: 18.5,
      status: 'processing',
      date: '2025-01-20',
      address: '456 Oak Ave, Downtown',
    },
    {
      id: 'ORD-2024-003',
      customer: 'Emma Davis',
      items: ['Organic Strawberries'],
      total: 8.99,
      status: 'shipped',
      date: '2025-01-19',
      address: '789 Pine Rd, Suburbs',
    },
    {
      id: 'ORD-2024-004',
      customer: 'David Wilson',
      items: ['Farm Eggs', 'Raw Honey'],
      total: 15.99,
      status: 'delivered',
      date: '2025-01-18',
      address: '321 Elm St, Uptown',
    },
  ];

  const sellerProducts: ProductWithSellerData[] = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 4.99,
      stock: 50,
      category: 'Vegetables',
      status: 'in-stock',
      sales: 234,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB0b21hdG9lc3xlbnwxfHx8fDE3NTg1NDYzNTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
      views: 1234,
    },
    {
      id: 2,
      name: 'Fresh Basil',
      price: 2.99,
      stock: 0,
      category: 'Herbs',
      status: 'out-of-stock',
      sales: 156,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhlcmJzJTIwYmFzaWx8ZW58MXx8fHwxNzU4NTQ2Mzc4fDA&ixlib=rb-4.1.0&q=80&w=400',
      views: 856,
    },
    {
      id: 3,
      name: 'Organic Spinach',
      price: 3.49,
      stock: 30,
      category: 'Vegetables',
      status: 'in-stock',
      sales: 189,
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1602193815349-525071f27564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc3BpbmFjaCUyMGxlYXZlc3xlbnwxfHx8fDE3NTg1NDYzODF8MA&ixlib=rb-4.1.0&q=80&w=400',
      views: 2134,
    },
    {
      id: 4,
      name: 'Fresh Strawberries',
      price: 6.99,
      stock: 25,
      category: 'Fruits',
      status: 'in-stock',
      sales: 298,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllcyUyMGJlcnJpZXN8ZW58MXx8fHwxNzU4NTQ2Mzc0fDA&ixlib=rb-4.1.0&q=80&w=400',
      views: 1789,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

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
              Back to Store
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Seller Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, Green Valley Farm! 🌱
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={onAddProduct}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
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
            <Card className="border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Sales
                  </CardTitle>
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  ${sellerStats.totalSales.toFixed(2)}
                </div>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />+
                  {sellerStats.monthlyGrowth}% this month
                </p>
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
                    Total Products
                  </CardTitle>
                  <Package className="w-4 h-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {sellerStats.totalProducts}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {sellerProducts.filter((p) => p.status === 'in-stock').length}{' '}
                  active
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Active Orders
                  </CardTitle>
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {sellerStats.activeOrders}
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  {recentOrders.filter((o) => o.status === 'pending').length}{' '}
                  pending
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-purple-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Avg Rating
                  </CardTitle>
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {sellerStats.averageRating}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  From {sellerStats.totalCustomers} reviews
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="border-amber-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Performance Overview</CardTitle>
                <BarChart3 className="w-5 h-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Store Views</span>
                    <span className="font-medium">
                      {sellerStats.totalViews.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-green-600">+15% from last month</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium">
                      {sellerStats.conversionRate}%
                    </span>
                  </div>
                  <Progress
                    value={sellerStats.conversionRate * 10}
                    className="h-2"
                  />
                  <p className="text-xs text-green-600">
                    +0.5% from last month
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <span className="font-medium">
                      {((sellerStats.averageRating / 5) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={(sellerStats.averageRating / 5) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-green-600">+2% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-amber-100 p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:text-amber-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-white data-[state=active]:text-amber-700"
            >
              My Products
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-white data-[state=active]:text-amber-700"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white data-[state=active]:text-amber-700"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                            <p className="font-medium text-gray-900">
                              {order.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.customer}
                            </p>
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
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {product.sales} sold
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">
                              ${product.price}
                            </p>
                            <div className="flex items-center text-xs text-gray-600">
                              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                              {product.rating}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="border-amber-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Products ({sellerProducts.length})</CardTitle>
                  <Button
                    onClick={onAddProduct}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sellerProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border border-amber-200 rounded-lg p-4 hover:bg-amber-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {product.category}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-600">
                                Stock: {product.stock}
                              </span>
                              <span className="text-sm text-gray-600">
                                Sales: {product.sales}
                              </span>
                              <span className="text-sm text-gray-600">
                                Views: {product.views}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              ${product.price}
                            </p>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              {product.rating} ({product.sales} reviews)
                            </div>
                            <Badge
                              className={`text-xs mt-1 ${getStatusColor(
                                product.status,
                              )}`}
                            >
                              {product.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:bg-blue-50"
                              onClick={() => setViewProduct(product)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-600 hover:bg-amber-50"
                              onClick={() => onEditProduct?.(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => setDeleteProduct(product)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
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
                            <h3 className="font-medium text-gray-900">
                              {order.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {order.customer}
                            </p>
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <BarChart3 className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Detailed analytics charts would appear here
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Including sales trends, product performance, and
                        customer insights
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Customer Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                      <span className="text-gray-700">Total Customers</span>
                      <span className="font-bold text-gray-900">
                        {sellerStats.totalCustomers}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Repeat Customers</span>
                      <span className="font-bold text-green-600">68%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Average Order Value</span>
                      <span className="font-bold text-blue-600">$23.45</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">
                        Customer Lifetime Value
                      </span>
                      <span className="font-bold text-purple-600">$156.78</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* View Product Modal */}
        {viewProduct && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Product Details
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewProduct(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <ImageWithFallback
                      src={viewProduct.image}
                      alt={viewProduct.name}
                      className="w-full h-64 object-cover rounded-lg border border-amber-200"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Basic Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span>{' '}
                          {viewProduct.name}
                        </p>
                        <p>
                          <span className="font-medium">Category:</span>{' '}
                          {viewProduct.category}
                        </p>
                        <p>
                          <span className="font-medium">Price:</span> $
                          {viewProduct.price}
                        </p>
                        <p>
                          <span className="font-medium">Stock:</span>{' '}
                          {viewProduct.stock} units
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>
                          <Badge
                            className={`ml-2 ${getStatusColor(
                              viewProduct.status,
                            )}`}
                          >
                            {viewProduct.status.replace('_', ' ')}
                          </Badge>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Performance
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">
                            {viewProduct.sales}
                          </div>
                          <div className="text-gray-600">Sales</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">
                            {viewProduct.views}
                          </div>
                          <div className="text-gray-600">Views</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="font-bold text-yellow-600">
                            {viewProduct.rating}
                          </div>
                          <div className="text-gray-600">Rating</div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="font-bold text-purple-600">
                            {(
                              (viewProduct.sales / viewProduct.views) *
                              100
                            ).toFixed(1)}
                            %
                          </div>
                          <div className="text-gray-600">Conversion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Fresh, organically grown {viewProduct.name.toLowerCase()}{' '}
                    from our sustainable farm. Hand-picked at peak ripeness for
                    maximum flavor and nutritional value. Perfect for salads,
                    cooking, or eating fresh.
                  </p>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setViewProduct(null)}
                    className="border-gray-300"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setViewProduct(null);
                      onEditProduct?.(viewProduct);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Product
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Product Modal */}
        {deleteProduct && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg w-full max-w-md shadow-2xl border border-red-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>

                <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
                  Delete Product
                </h3>

                <p className="text-sm text-gray-600 text-center mb-6">
                  &quot;Are you sure you want to delete
                  <strong>{deleteProduct.name}</strong>&quot;? This action
                  cannot be undone and will remove all associated data including
                  sales history and customer reviews.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                  <div className="flex items-center text-sm text-red-800">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>
                      This will permanently delete {deleteProduct.sales} sale
                      records and affect your analytics.
                    </span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteProduct(null)}
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      // Handle delete logic here
                      console.log('Deleting product:', deleteProduct.id);
                      setDeleteProduct(null);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Product
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
