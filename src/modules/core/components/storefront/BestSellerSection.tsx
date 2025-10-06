/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import BestSellerStyleCard from '@/modules/core/components/common/BestSellerStyleCard';
import OfferBannerHolder from '@/modules/core/components/common/OfferBannerHolder';

import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
const bestSellers = [
  {
    id: 5,
    name: 'Fresh Farm Vegetables',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.9,
    reviews: 342,
    sold: 1250,
    image:
      'https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMHZlZ2V0YWJsZXMlMjBiYXNrZXR8ZW58MXx8fHwxNzU4MDczNzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    discount: 20,
    category: 'Vegetables',
    description:
      'A premium assortment of fresh farm vegetables including tomatoes, lettuce, carrots, and more. Perfect for healthy cooking and meal prep.',
    badge: 'Best Seller',
    badgeColor: 'bg-red-500',
  },
  {
    id: 6,
    name: 'Organic Fruit Bundle',
    price: 18.5,
    originalPrice: 22.0,
    rating: 4.8,
    reviews: 268,
    sold: 980,
    image:
      'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXMlMjB5ZWxsb3d8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    discount: 16,
    category: 'Fruits',
    description:
      'An organic selection of seasonal fruits including bananas, apples, oranges, and berries. All certified organic and sustainably grown.',
    badge: 'Organic',
    badgeColor: 'bg-green-500',
  },
  {
    id: 7,
    name: 'Premium Tomato Pack',
    price: 8.75,
    originalPrice: 10.5,
    rating: 4.7,
    reviews: 189,
    sold: 756,
    image:
      'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZWQlMjB0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc1ODA3MzcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    discount: 17,
    category: 'Vegetables',
    description:
      'Premium vine-ripened tomatoes with exceptional flavor and perfect texture. Ideal for salads, sauces, or fresh cooking.',
    badge: 'Premium',
    badgeColor: 'bg-amber-500',
  },
];
interface BestSellersProps {
  onProductClick?: (product: any) => void;
  onAddToCart?: (product: any, sourceElement: HTMLElement) => void;
}

export default function BestSellers({
  onProductClick,
  onAddToCart,
}: BestSellersProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-amber-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Best <span className="text-amber-600">Sellers</span>
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular products that customers can&apos;t get enough of
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }}
            >
              <BestSellerStyleCard
                product={product}
                index={index}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            </motion.div>
          ))}
        </div>

        {/* Offer Banner */}
        <OfferBannerHolder
          title="Limited Time Offer!"
          subtitle="Get 25% off on all best sellers when you spend over $50"
          buttonText="Shop Best Sellers"
          fromColor="amber-500"
          toColor="orange-500"
          onClick={() => console.log('Banner clicked!')}
        />
      </div>
    </section>
  );
}
