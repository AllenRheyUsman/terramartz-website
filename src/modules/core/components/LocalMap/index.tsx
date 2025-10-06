'use client';
import { LocalMapProps } from '@/modules/core/types/mixed';
import { Product } from '@/modules/core/types/product';
import { motion } from 'motion/react';
import { FarmDetails } from './FarmDetails';

import { LocalMapProvider } from '@/modules/core/contexts/LocalMapContext';
import { MapSection } from './MapSection';
import { StatsGrid } from './StatsGrid';
import { mockFarms } from './mockData';

export default function LocalMap({
  onAddToCart,
  onNavigateToLocalMap,
}: LocalMapProps) {
  const handleAddToCart = (product: Product) => {
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button && onAddToCart) {
      onAddToCart(product, button);
    }
  };

  return (
    <LocalMapProvider>
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
              Find Local Farms Near You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              Discover fresh, locally sourced products from farms in your area.
              Support local farmers and get the freshest ingredients delivered
              right to your door.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <MapSection
              farms={mockFarms}
              onNavigateToLocalMap={onNavigateToLocalMap}
            />
            <div className="space-y-6">
              <FarmDetails onAddToCart={handleAddToCart} />
              <StatsGrid />
            </div>
          </div>
        </div>
      </section>
    </LocalMapProvider>
  );
}
