/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, Leaf, ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: any;
  index?: number;
  type?: 'animated' | 'featured' | 'bestseller';
  onProductClick?: (product: any) => void;
  onAddToCart?: (product: any, source: HTMLElement) => void;
}

// Helper to map label → icon
const getBadgeIcon = (label: string) => {
  switch (label) {
    case 'Best Seller':
      return Star;
    case 'Top Rated':
      return ShoppingCart;
    case "Farmer's Choice":
      return Leaf;
    case 'Organic':
      return Heart;
    default:
      return Heart;
  }
};

export default function ProductCard({
  product,
  index = 0,
  type = 'featured',
  onProductClick,
  onAddToCart,
}: ProductCardProps) {
  const isAnimated = type === 'animated';
  const isBestSeller = type === 'bestseller';
  const isFeatured = type === 'featured';

  return (
    <motion.div
      key={product.id}
      initial={isAnimated ? { opacity: 0, y: 30 } : false}
      animate={isAnimated ? { opacity: 1, y: 0 } : false}
      transition={
        isAnimated ? { duration: 0.5, delay: index * 0.1 } : undefined
      }
      whileHover={
        isAnimated
          ? {
              y: -8,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }
          : undefined
      }
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
      onClick={() => onProductClick?.(product)}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className={`w-full ${
            isBestSeller ? 'h-56' : 'h-48'
          } object-cover transition-transform duration-300 group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

        {/* --- BADGES --- */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* 🟡 Support both multiple badges and single badge */}
          {(product.badges?.length || product.badge) && (
            <>
              {/* Multi-badge array */}
              {product.badges?.map((b: any, i: number) => {
                const Icon = getBadgeIcon(b.label);
                return (
                  <Badge
                    key={i}
                    className={`${
                      b.color || 'bg-amber-500'
                    } text-white border-0 text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{b.label}</span>
                  </Badge>
                );
              })}

              {/* Single badge fallback */}
              {product.badge && (
                <Badge
                  className={`${
                    product.badgeColor || 'bg-amber-500'
                  } text-white border-0 text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1`}
                >
                  {(() => {
                    const Icon = getBadgeIcon(product.badge);
                    return <Icon className="w-3 h-3" />;
                  })()}
                  <span>{product.badge}</span>
                </Badge>
              )}
            </>
          )}

          {/* 🔴 Best seller specific badges */}
          {isBestSeller && (
            <>
              {product.discount && (
                <Badge className="bg-green-500 text-white border-0 font-semibold text-xs px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                  💰 {product.discount}% OFF
                </Badge>
              )}
            </>
          )}
        </div>

        {/* 💖 Wishlist Button (animated or featured only) */}
        {(isFeatured || isAnimated) && (
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-all duration-200 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-4 h-4" />
          </button>
        )}

        {/* 🛒 Sold Count (Best Seller only) */}
        {isBestSeller && (
          <div className="absolute top-4 right-4 bg-white/95 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
            {product.sold}+ sold
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* ⭐ Rating */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating ?? 0)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* 💰 Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-amber-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* 🛍️ Add to Cart */}
        <Button
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product, e.currentTarget as HTMLElement);
          }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
        </Button>
      </div>

      {/* 📦 Stock Progress Bar (Best Seller only) */}
      {isBestSeller && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Available Stock</span>
            <span className="font-semibold text-orange-600">
              Only {product.stockLeft} left!
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full"
              style={{ width: `${product.stockPercent ?? 75}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
