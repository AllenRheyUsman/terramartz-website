'use client';
import CategoryCard from '@/modules/core/components/common/CategoryStyleCard.';
import { motion } from 'motion/react';
import Link from 'next/link';

const categories = [
  {
    name: 'Fruits',
    image:
      'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXMlMjB5ZWxsb3d8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: '#FDCF60',
    icon: '🍌',
  },
  {
    name: 'Vegetables',
    image:
      'https://images.unsplash.com/photo-1757332334626-8dadb145540d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHZlZ2V0YWJsZXMlMjBicm9jY29saXxlbnwxfHx8fDE3NTgwNzM3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: '#82DBA1',
    icon: '🥬',
  },
  {
    name: 'Meats',
    image:
      'https://images.unsplash.com/photo-1704081628926-d64845e7ca93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwc3RlYWslMjBmcmVzaHxlbnwxfHx8fDE3NTgwNzM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: '#AAD261',
    icon: '🥩',
  },
  {
    name: 'Caribbean Products',
    image:
      'https://images.unsplash.com/photo-1677599082447-6549af4c5454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJpYmJlYW4lMjBzcGljZXMlMjBoZXJic3xlbnwxfHx8fDE3NTgwNzM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: '#8DD8D4',
    icon: '🌶️',
  },
  {
    name: 'Dairy',
    image:
      'https://images.unsplash.com/photo-1663566869071-6c926e373515?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMHByb2R1Y3RzJTIwbWlsayUyMGNoZWVzZXxlbnwxfHx8fDE3NTgwNDI1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: '#82DBA1',
    icon: '🥛',
  },
];

export default function CategoriesSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by <span className="text-amber-600">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our carefully curated selection of fresh, organic,
            and locally sourced products
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }}
              className="group cursor-pointer"
            >
              {/* SSR-rendered card */}
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/categories">
            <motion.button
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Categories
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
