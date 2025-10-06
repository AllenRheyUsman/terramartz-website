'use client';

import { OfferBanner } from '@/modules/core/types/offerBanners';
import { motion } from 'motion/react';
export default function OfferBannerHolder({
  title,
  subtitle,
  buttonText = 'Shop Now',
  onClick,
  fromColor = 'amber-500',
  toColor = 'orange-500',
  delay = 0.4,
}: OfferBanner) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`mt-16 bg-gradient-to-r from-${fromColor} to-${toColor} rounded-2xl p-8 text-center text-white relative overflow-hidden`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>

        {subtitle && <p className="text-lg mb-6 opacity-90">{subtitle}</p>}

        {buttonText && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="px-8 py-3 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            {buttonText}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
