import { ImageWithFallback } from '@/modules/core/components/ImageWithFallback';
import Farm from '@/modules/core/types/farms';
import { Product } from '@/modules/core/types/product';
import {
  ArrowLeft,
  Clock,
  Filter,
  MapPin,
  Plus,
  Search,
  Shield,
  Star,
  Truck,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';

interface LocalMapPageProps {
  onBack?: () => void;
  onAddToCart?: (product: Product, sourceElement: HTMLElement) => void;
}

export default function LocalMapPage({
  onBack,
  onAddToCart,
}: LocalMapPageProps) {
  const [proximityRange, setProximityRange] = useState([5]);
  const [deliveryFilter, setDeliveryFilter] = useState('today');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [userLocation] = useState({ x: 45, y: 55 }); // User's location on the map

  // Mock local farms data
  const farms: Farm[] = [
    {
      id: 1,
      name: 'Green Valley Farm',
      rating: 4.8,
      distance: 2.1,
      x: 35,
      y: 45,
      products: [1, 2],
    },
    {
      id: 2,
      name: 'Maple Orchard',
      rating: 4.9,
      distance: 3.2,
      x: 55,
      y: 35,
      products: [3, 4],
    },
    {
      id: 3,
      name: 'Sunrise Gardens',
      rating: 4.7,
      distance: 4.5,
      x: 65,
      y: 65,
      products: [5, 6],
    },
    {
      id: 4,
      name: 'Organic Fields Co.',
      rating: 4.6,
      distance: 1.8,
      x: 25,
      y: 65,
      products: [7, 8],
    },
  ];

  // Mock local products data
  const localProducts: Product[] = [
    {
      id: 1,
      name: 'Romaine Lettuce',
      price: 3.5,
      unit: 'head',
      farmName: 'Green Valley Farm',
      distance: 2.1,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwbGV0dHVjZSUyMGdyZWVuc3xlbnwxfHx8fDE3NTg1NDYzNjN8MA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'Vegetables',
      isOrganic: true,
      rating: 4.8,
      reviews: 124,
      farmId: 1,
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      price: 1.15,
      unit: 'kg',
      farmName: 'Green Valley Farm',
      distance: 2.1,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1603462903957-566630607cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdHMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU0NjM1OXww&ixlib=rb-4.1.0&q=80&w=400',
      category: 'Vegetables',
      isOrganic: true,
      rating: 4.7,
      reviews: 89,
      farmId: 1,
    },
    {
      id: 3,
      name: 'Farm Fresh Eggs',
      price: 6.75,
      unit: 'dozen',
      farmName: 'Maple Orchard',
      distance: 3.2,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Dairy & Eggs',
      isOrganic: false,
      rating: 4.9,
      reviews: 156,
      farmId: 2,
    },
    {
      id: 4,
      name: 'Organic Apples',
      price: 4.25,
      unit: 'kg',
      farmName: 'Maple Orchard',
      distance: 3.2,
      deliveryTime: 'Tomorrow',
      image:
        'https://images.unsplash.com/photo-1683688684067-b87a189c7503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYXBwbGVzJTIwZnJ1aXR8ZW58MXx8fHwxNzU4NTQ2MzY5fDA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'Fruits',
      isOrganic: true,
      rating: 4.6,
      reviews: 203,
      farmId: 2,
    },
    {
      id: 5,
      name: 'Fresh Strawberries',
      price: 8.99,
      unit: 'basket',
      farmName: 'Sunrise Gardens',
      distance: 4.5,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllcyUyMGJlcnJpZXN8ZW58MXx8fHwxNzU4NTQ2Mzc0fDA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'Fruits',
      isOrganic: false,
      rating: 4.8,
      reviews: 97,
      farmId: 3,
    },
    {
      id: 6,
      name: 'Fresh Herbs Mix',
      price: 5.5,
      unit: 'bunch',
      farmName: 'Sunrise Gardens',
      distance: 4.5,
      deliveryTime: 'Tomorrow',
      image:
        'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhlcmJzJTIwYmFzaWx8ZW58MXx8fHwxNzU4NTQ2Mzc4fDA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'Herbs',
      isOrganic: true,
      rating: 4.9,
      reviews: 67,
      farmId: 3,
    },
    {
      id: 7,
      name: 'Organic Tomatoes',
      price: 4.99,
      unit: 'kg',
      farmName: 'Organic Fields Co.',
      distance: 1.8,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB0b21hdG9lc3xlbnwxfHx8fDE3NTg1NDYzNTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'Vegetables',
      isOrganic: true,
      rating: 4.7,
      reviews: 189,
      farmId: 4,
    },
    {
      id: 8,
      name: 'Organic Spinach',
      price: 3.25,
      unit: 'bunch',
      farmName: 'Organic Fields Co.',
      distance: 1.8,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1602193815349-525071f27564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc3BpbmFjaCUyMGxlYXZlc3xlbnwxfHx8fDE3NTg1NDYzODF8MA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'Vegetables',
      isOrganic: true,
      rating: 4.6,
      reviews: 112,
      farmId: 4,
    },
  ];

  // Filter products based on current filters
  const filteredProducts = localProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.farmName?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false);

    const matchesProximity =
      (product.distance ?? Infinity) <= proximityRange[0];

    const matchesDelivery =
      deliveryFilter === 'all' ||
      (deliveryFilter === 'today' && product.deliveryTime === 'Today') ||
      (deliveryFilter === 'tomorrow' && product.deliveryTime === 'Tomorrow');

    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;

    return (
      matchesSearch && matchesProximity && matchesDelivery && matchesCategory
    );
  });

  // Filter farms based on proximity
  const visibleFarms = farms.filter(
    (farm) => farm.distance <= proximityRange[0],
  );

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    if (onAddToCart) {
      onAddToCart(product, event.currentTarget as HTMLElement);
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
              Back
            </Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="border-amber-200 shadow-sm mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <span>Local Farms & Producers</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>≤ {proximityRange[0]} km</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Map Container */}
                <div className="relative bg-gradient-to-br from-green-100 via-green-50 to-amber-50 rounded-lg h-96 overflow-hidden border-2 border-amber-200">
                  {/* Map Background Elements */}
                  <div className="absolute inset-0">
                    {/* River/Water */}
                    <div className="absolute top-12 left-8 w-32 h-16 bg-blue-200 rounded-full opacity-60 transform rotate-12"></div>
                    <div className="absolute top-20 left-24 w-48 h-12 bg-blue-200 rounded-full opacity-60 transform rotate-12"></div>

                    {/* Roads */}
                    <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-300 transform -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2"></div>

                    {/* City Area */}
                    <div className="absolute bottom-12 right-16 w-24 h-24 bg-gray-200 rounded-lg opacity-50"></div>

                    {/* Montreal Label */}
                    <div className="absolute bottom-8 right-12 text-amber-700 font-medium text-lg">
                      Montreal
                    </div>
                  </div>

                  {/* User Location */}
                  <motion.div
                    className="absolute w-6 h-6 -translate-x-3 -translate-y-3 z-20"
                    style={{
                      left: `${userLocation.x}%`,
                      top: `${userLocation.y}%`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600 whitespace-nowrap bg-white px-2 py-1 rounded shadow">
                      You are here
                    </div>
                  </motion.div>

                  {/* Farm Locations */}
                  {visibleFarms.map((farm, index) => (
                    <motion.div
                      key={farm.id}
                      className="absolute w-8 h-8 -translate-x-4 -translate-y-4 z-10 cursor-pointer"
                      style={{ left: `${farm.x}%`, top: `${farm.y}%` }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() =>
                        setSelectedFarm(
                          selectedFarm?.id === farm.id ? null : farm,
                        )
                      }
                    >
                      <div
                        className={`w-8 h-8 bg-amber-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                          selectedFarm?.id === farm.id
                            ? 'ring-2 ring-amber-400'
                            : ''
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      {/* Farm Tooltip */}
                      {selectedFarm?.id === farm.id && (
                        <motion.div
                          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border border-amber-200 whitespace-nowrap z-30"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="font-medium text-gray-900">
                            {farm.name}
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                            <span>{farm.rating}</span>
                            <span>•</span>
                            <span>{farm.distance} km</span>
                          </div>
                          {/* Tooltip Arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Distance Circles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[2, 4, 6].map((radius) => (
                      <div
                        key={radius}
                        className="absolute border border-amber-300 rounded-full opacity-30"
                        style={{
                          width: `${radius * 20}%`,
                          height: `${radius * 20}%`,
                          left: `${userLocation.x - radius * 10}%`,
                          top: `${userLocation.y - radius * 10}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Map Legend */}
                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
                      <span className="text-gray-600">Your Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-amber-500 rounded-full border border-white"></div>
                      <span className="text-gray-600">Local Farms</span>
                    </div>
                  </div>
                  <div className="text-gray-500">
                    Showing {visibleFarms.length} farms within{' '}
                    {proximityRange[0]} km
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 text-white mb-6"
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6" />
                  <div>
                    <div className="font-medium">Fast Delivery</div>
                    <div className="text-sm opacity-90">Same day available</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6" />
                  <div>
                    <div className="font-medium">Secure Payments</div>
                    <div className="text-sm opacity-90">100% protected</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6" />
                  <div>
                    <div className="font-medium">Support Producers</div>
                    <div className="text-sm opacity-90">Direct from farm</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters & Products */}
          <div className="space-y-6">
            {/* Filters */}
            <Card className="border-amber-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-amber-600" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search products or farms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-amber-300 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Proximity */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Proximity: ≤ {proximityRange[0]} km
                  </label>
                  <Slider
                    value={proximityRange}
                    onValueChange={setProximityRange}
                    max={10}
                    min={1}
                    step={0.5}
                    className="py-2"
                  />
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Delivery
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={
                        deliveryFilter === 'today' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setDeliveryFilter('today')}
                      className={
                        deliveryFilter === 'today'
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                      }
                    >
                      Today
                    </Button>
                    <Button
                      variant={
                        deliveryFilter === 'tomorrow' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setDeliveryFilter('tomorrow')}
                      className={
                        deliveryFilter === 'tomorrow'
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                      }
                    >
                      Tomorrow
                    </Button>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="border-amber-300 focus:border-amber-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                      <SelectItem value="Fruits">Fruits</SelectItem>
                      <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
                      <SelectItem value="Herbs">Herbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Local Products */}
            <Card className="border-amber-200 shadow-sm">
              <CardHeader>
                <CardTitle>
                  Local Products ({filteredProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-3 p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-medium text-gray-900 text-sm truncate">
                            {product.name}
                          </h3>
                          <Button
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-600 text-white ml-2 px-2 py-1 h-6"
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {product.farmName}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                product.isOrganic
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-orange-100 text-orange-800'
                              }
                            >
                              {product.isOrganic ? 'Organic' : 'Local'}
                            </Badge>
                            <span className="text-gray-500">
                              {product.distance} km
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                            <span className="text-gray-600">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="font-bold text-green-600">
                              ${product.price}
                            </span>
                            {product.unit && (
                              <span className="text-xs text-gray-500 ml-1">
                                /{product.unit}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-blue-600">
                            <Clock className="w-3 h-3" />
                            <span>{product.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No products found matching your criteria.
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Try adjusting your filters.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
