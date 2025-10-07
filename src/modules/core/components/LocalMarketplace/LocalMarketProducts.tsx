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
import { Product } from '@/modules/core/types/product';
import { Clock, MapPin, Plus, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocalMarket } from './LocalMarketContext';

interface LocalMarketProductsProps {
  onAddToCart?: (
    product: Product,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export function LocalMarketProducts({ onAddToCart }: LocalMarketProductsProps) {
  const {
    products,
    searchQuery,
    proximityRange,
    deliveryFilter,
    categoryFilter,
  } = useLocalMarket();

  const filteredProducts = products.filter((p) => {
    const name = p.name?.toLowerCase() ?? '';
    const farmName = p.farmName?.toLowerCase() ?? '';
    const search = searchQuery.toLowerCase();

    const matchesSearch = name.includes(search) || farmName.includes(search);
    const matchesProximity = (p.distance ?? Infinity) <= proximityRange[0];
    const matchesDelivery =
      deliveryFilter === 'all' ||
      (deliveryFilter === 'today' && p.deliveryTime === 'Today') ||
      (deliveryFilter === 'tomorrow' && p.deliveryTime === 'Tomorrow');
    const matchesCategory =
      categoryFilter === 'all' || p.category === categoryFilter;

    return (
      matchesSearch && matchesProximity && matchesDelivery && matchesCategory
    );
  });

  const handleAddToCart = (
    product: Product,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (onAddToCart) onAddToCart(product, e);
  };

  return (
    <Card className="border-amber-200 shadow-sm">
      <CardHeader>
        <CardTitle>Local Products ({filteredProducts.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
                      <span className="text-gray-600">{product.rating}</span>
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
            ))
          ) : (
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
  );
}
