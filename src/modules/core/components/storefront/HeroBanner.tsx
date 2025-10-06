'use client';
import { Button } from '@/modules/core/components/ui/button';
import { motion } from 'motion/react';
interface StorefrontProps {
  onShopNow?: () => void;
  onSellWithUs?: () => void;
}

export default function Storefront({
  onShopNow,
  onSellWithUs,
}: StorefrontProps) {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: '#FED15E' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-300 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-orange-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-300 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                <span className="text-amber-600">Fresh from</span>
                <br />
                <span className="text-green-600">Farm to Table</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg">
                Discover the freshest produce, organic fruits, and premium
                quality foods delivered straight to your doorstep.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={onShopNow}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onSellWithUs}
                className="border-green-400 text-green-700 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 bg-white"
              >
                🌱 Are you a farmer? Sell with us
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8"
            >
              {[
                { number: '500+', label: 'Fresh Products' },
                { number: '50+', label: 'Local Farmers' },
                { number: '10k+', label: 'Happy Customers' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-orange-200 rounded-3xl blur-3xl opacity-30 transform rotate-6"></div>
              <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="./images/basket.png"
                  alt="Fresh fruits and vegetables basket"
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain translate-y-6 sm:translate-y-8 md:translate-y-12"
                />

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 max-w-24 sm:max-w-32"
                >
                  <div className="text-green-600 font-semibold text-xs sm:text-sm">
                    ✓ Organic
                  </div>
                  <div className="text-gray-600 text-xs">Farm Fresh</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 max-w-28 sm:max-w-36"
                >
                  <div className="text-orange-600 font-semibold text-xs sm:text-sm">
                    Free Delivery
                  </div>
                  <div className="text-gray-600 text-xs">Within 24hrs</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
