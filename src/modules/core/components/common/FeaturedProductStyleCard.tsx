import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import { FeaturedProduct } from '@/modules/core/types/product';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface FeaturedProductCardProps {
  product: FeaturedProduct;
  onProductClick?: (product: FeaturedProduct) => void;
  onAddToCart?: (product: FeaturedProduct, sourceElement: HTMLElement) => void;
}

const getBadgeIcon = (label: string) => {
  switch (label) {
    case 'Best Seller':
      return Star;
    case 'Top Rated':
      return ShoppingCart;
    case "Farmer's Choice":
      return Heart;
    default:
      return Heart;
  }
};

export default function FeaturedProductCard({
  product,
  onProductClick,
  onAddToCart,
}: FeaturedProductCardProps) {
  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onProductClick?.(product)}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300"></div>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
          {product.badges.map((badge, index) => {
            const Icon = getBadgeIcon(badge.label);
            return (
              <Badge
                key={index}
                className={`${badge.color} text-white border-0 text-xs px-2 py-1 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 flex items-center gap-1`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{badge.label}</span>
                <span className="sm:hidden">{badge.label.split(' ')[0]}</span>
              </Badge>
            );
          })}
        </div>

        {/* Wishlist Button */}
        <button
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200 shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product?.rating ?? 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
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

        {/* Add to Cart */}
        <Button
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product, e.currentTarget as HTMLElement);
          }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
