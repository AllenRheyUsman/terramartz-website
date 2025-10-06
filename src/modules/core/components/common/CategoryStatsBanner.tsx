'use client';

import { motion } from 'motion/react';

interface Stat {
  number: string;
  label: string;
  desc: string;
}

interface CategoryStatsProps {
  title?: string;
  highlight?: string;
  stats?: Stat[];
}

export default function CategoryStatsBanner({
  title = 'Why Choose Our',
  highlight = 'Categories',
  stats = [
    {
      number: '200+',
      label: 'Premium Products',
      desc: 'Carefully selected items',
    },
    {
      number: '50+',
      label: 'Local Farmers',
      desc: 'Supporting community farms',
    },
    { number: '24hrs', label: 'Fresh Delivery', desc: 'Farm to your doorstep' },
  ],
}: CategoryStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8"
    >
      {/* Heading */}
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
        {title} <span className="text-amber-600">{highlight}</span>
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">
              {stat.number}
            </div>
            <div className="font-semibold text-gray-800 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.desc}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
