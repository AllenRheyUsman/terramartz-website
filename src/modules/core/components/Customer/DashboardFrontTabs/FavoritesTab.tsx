/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

const FavoritesTab = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-amber-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Your Favorite Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Example product cards */}
            {[
              {
                id: 1,
                name: 'Organic Tomatoes',
                price: 4.99,
                image:
                  'https://images.unsplash.com/photo-1546470427-e2a323f21d5a?w=400',
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
            ].map((product) => (
              <div
                key={product.id}
                className="border border-amber-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <button className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white">
                    <Heart className="w-4 h-4 text-red-500" />
                  </button>
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
                    <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded">
                      Add to Cart
                    </button>
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

export default FavoritesTab;
