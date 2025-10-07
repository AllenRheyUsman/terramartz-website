'use client';
import { Shield, Truck, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function LocalMarketFeaturesBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 text-white mb-6"
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <Truck className="w-6 h-6" />
          <div>
            <div className="font-medium">Fast Delivery</div>
            <div className="text-sm opacity-90">Same day available</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6" />
          <div>
            <div className="font-medium">Secure Payments</div>
            <div className="text-sm opacity-90">100% protected</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6" />
          <div>
            <div className="font-medium">Support Producers</div>
            <div className="text-sm opacity-90">Direct from farm</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
