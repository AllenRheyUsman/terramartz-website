import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import { BestSellerProduct } from '@/modules/core/types/product';
import { ShoppingCart, Star } from 'lucide-react';
interface BestSellerCardProps {
  product: BestSellerProduct;
  index: number;
  onProductClick?: (product: BestSellerProduct) => void;
  onAddToCart?: (
    product: BestSellerProduct,
    sourceElement: HTMLElement,
  ) => void;
}

export default function BestSellerStyleCard({
  product,
  index,
  onProductClick,
  onAddToCart,
}: BestSellerCardProps) {
  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
      onClick={() => onProductClick?.(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge
            className={`${product.badgeColor} text-white border-0 font-semibold`}
          >
            #{index + 1} {product.badge}
          </Badge>
          <Badge className="bg-green-500 text-white border-0">
            {product.discount}% OFF
          </Badge>
        </div>

        {/* Sales Count */}
        <div className="absolute top-4 right-4 bg-white/95 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
          {product.sold}+ sold
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-amber-600">
              ${product.price}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          </div>
          <div className="text-sm text-green-600 font-semibold">
            Save ${(product.originalPrice - product.price).toFixed(2)}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product, e.currentTarget as HTMLElement);
          }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>

      {/* Progress Bar (static for SSR) */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Available Stock</span>
          <span className="font-semibold text-orange-600">Only 12 left!</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full w-[75%]" />
        </div>
      </div>
    </div>
  );
}
