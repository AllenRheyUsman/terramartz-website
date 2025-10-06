import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import ProductInteraction from '@/modules/core/components/product-detail/ProductInteraction';
import ReviewSection from '@/modules/core/components/product-detail/ReviewSection';
import SellerSection from '@/modules/core/components/product-detail/SellerSection';
import { Badge } from '@/modules/core/components/ui/badge';
import { ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

export default async function ProductPageServer({
  params,
}: {
  params?: { id?: string };
}) {
  // Simulated data fetch — replace with real API/DB call
  const product = {
    id: 1,
    name: 'Organic Bananas',
    price: 3.99,
    originalPrice: 4.99,
    rating: 4.8,
    reviews: 124,
    image:
      'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'Fruits',
    description:
      'Sweet, nutritious, and perfectly ripe organic bananas sourced from local farms.',
    badge: 'Organic',
    badgeColor: 'bg-green-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-6">
        {/* 🟠 Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        {/* 🟡 Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link
            href="/categories"
            className="hover:text-amber-600 transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* 🟢 Product Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Product Image */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.badge && (
                <Badge
                  className={`absolute top-4 left-4 ${product.badgeColor} text-white border-0`}
                >
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Right: Product Info (Server-rendered) */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-amber-600">
                  ${product.price.toFixed(2)} each
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* 🔸 Client-Side Interactive Component */}
            <ProductInteraction product={product} />
          </div>
        </div>

        {/* 🟢 Seller and Reviews (Hydrated Client Components) */}
        <SellerSection />
        <ReviewSection productId={product.id} />
      </div>
    </div>
  );
}
