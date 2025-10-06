/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/modules/core/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
export default function ProductInteraction({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <span className="font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </motion.button>
          <span className="px-4 py-2 font-medium">{quantity}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add {quantity} to Cart – ${(product.price * quantity).toFixed(2)}
      </Button>
    </div>
  );
}
