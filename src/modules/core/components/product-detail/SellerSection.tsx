'use client';

import { Button } from '@/modules/core/components/ui/button';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
export default function SellerSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-12"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://images.unsplash.com/photo-1719154718540-8ef3d94e7712" />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              Harvest Hill Orchards
            </h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">120 reviews</span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-amber-300 text-amber-600 hover:bg-amber-50"
        >
          View Store
        </Button>
      </div>
    </motion.div>
  );
}
