/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import FeaturedProductCard from '@/modules/core/components/common/FeaturedProductStyleCard';
import { motion } from 'motion/react';

const featuredProducts = [
  {
    id: 1,
    name: 'Organic Bananas',
    price: 3.99,
    originalPrice: 4.99,
    rating: 4.8,
    reviews: 124,
    image:
      'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXMlMjB5ZWxsb3d8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badges: [
      {
        label: 'Best Seller',
        color: 'bg-gradient-to-r from-orange-400 to-orange-500',
      },
      {
        label: "Farmer's Choice",
        color: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
      },
    ],
    category: 'Fruits',
    description:
      'Sweet, nutritious, and perfectly ripe organic bananas. Great for smoothies, baking, or healthy snacking.',
  },
  {
    id: 2,
    name: 'Fresh Orange',
    price: 2.5,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    image:
      'https://images.unsplash.com/photo-1663002976076-de02deea5fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2VzJTIwY2l0cnVzJTIwZnJ1aXR8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badges: [
      {
        label: "Farmer's Choice",
        color: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
      },
    ],
    category: 'Fruits',
    description:
      'Juicy, vitamin C-rich oranges picked at peak freshness. Perfect for fresh juice or healthy snacking.',
  },
  {
    id: 3,
    name: 'Vine Tomatoes',
    price: 4.25,
    originalPrice: 5.0,
    rating: 4.9,
    reviews: 156,
    image:
      'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc1ODA3MzcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badges: [
      {
        label: 'Top Rated',
        color: 'bg-gradient-to-r from-amber-400 to-yellow-500',
      },
      {
        label: 'Best Seller',
        color: 'bg-gradient-to-r from-orange-400 to-orange-500',
      },
    ],
    category: 'Vegetables',
    description:
      'Premium vine-ripened tomatoes with exceptional flavor and texture. Perfect for salads, cooking, or sandwiches.',
  },
  {
    id: 4,
    name: 'Green Vegetables Mix',
    price: 6.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 203,
    image:
      'https://images.unsplash.com/photo-1757332334626-8dadb145540d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHZlZ2V0YWJsZXMlMjBicm9jY29saXxlbnwxfHx8fDE3NTgwNzM3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badges: [
      {
        label: "Farmer's Choice",
        color: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
      },
      {
        label: 'Top Rated',
        color: 'bg-gradient-to-r from-amber-400 to-yellow-500',
      },
    ],
    category: 'Vegetables',
    description:
      'A nutritious mix of fresh green vegetables including broccoli, spinach, and kale. Perfect for healthy meals.',
  },
];

interface FeaturedProductsProps {
  onProductClick?: (product: any) => void;
  onAddToCart?: (product: any, sourceElement: HTMLElement) => void;
  onViewAllProducts?: () => void;
}

export default function FeaturedProductsSection({
  onProductClick,
  onAddToCart,
  onViewAllProducts,
}: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured <span className="text-amber-600">Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked selections of our finest and freshest products, loved by
            our customers
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }}
            >
              <FeaturedProductCard
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAllProducts}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
