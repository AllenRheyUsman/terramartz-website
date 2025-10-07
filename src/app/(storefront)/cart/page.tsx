'use client';
import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/core/components/ui/breadcrumb';
import { Button } from '@/modules/core/components/ui/button';
import { Separator } from '@/modules/core/components/ui/separator';
import { FeaturedProduct } from '@/modules/core/types/product';
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

interface CartItem {
  product: FeaturedProduct;
  quantity: number;
}

interface CartPageProps {
  cartItems?: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onBack: () => void;
  onCheckout: () => void;
  totalPrice?: number;
}

/* ✅ Reusable breadcrumb component */
function CartBreadcrumb({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="cursor-pointer hover:text-amber-600 transition-colors flex items-center"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="w-4 h-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-amber-600 font-medium">
              Cart
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
}

export default function CartPage({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onCheckout,
  totalPrice = 0,
}: CartPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const savings = cartItems.reduce((total, item) => {
    if (item.product.originalPrice) {
      return (
        total +
        (item.product.originalPrice - item.product.price) * item.quantity
      );
    }
    return total;
  }, 0);
  const promoDiscount = appliedPromo === 'SAVE10' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') setAppliedPromo('SAVE10');
  };
  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  /* 🧺 Empty Cart */
  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <CartBreadcrumb onBack={onBack} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-amber-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet.
              Start shopping to fill it up!
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  /* 🛒 Cart with Items */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <CartBreadcrumb onBack={onBack} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shopping Cart
            </h1>
            <p className="text-gray-600 mt-1">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in
              your cart
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onBack}
            className="border-amber-200 text-amber-600 hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Cart Items
                </h2>

                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 border border-gray-100 rounded-xl hover:border-amber-200 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0">
                        <ImageWithFallback
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.product.category}
                            </p>
                            {item.product.badges && (
                              <Badge
                                className={`mt-2 ${item.product.badges[0]?.color} text-white border-0 text-xs`}
                              >
                                {item.product.badges[0]?.label}
                              </Badge>
                            )}
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity + Price */}
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  Math.max(0, item.quantity - 1),
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-800">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            {item.product.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                $
                                {(
                                  item.product.originalPrice * item.quantity
                                ).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-4"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    disabled={!!appliedPromo}
                  />
                  {appliedPromo ? (
                    <Button
                      variant="outline"
                      onClick={removePromoCode}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePromoCode}
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      Apply
                    </Button>
                  )}
                </div>
                {appliedPromo && (
                  <div className="mt-2 flex items-center text-green-600 text-sm">
                    <Tag className="w-4 h-4 mr-1" />
                    Promo code &quot;{appliedPromo}&quot; applied!
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount (10%)</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    Shipping
                    {shipping === 0 && (
                      <Badge className="ml-2 bg-green-100 text-green-600 text-xs">
                        FREE
                      </Badge>
                    )}
                  </span>
                  <span>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Notice */}
              {shipping > 0 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center text-amber-700 text-sm">
                    <Truck className="w-4 h-4 mr-2" />
                    Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center text-gray-500 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Secure checkout with SSL encryption
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6"
              >
                <Button
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </motion.div>

              <Button
                variant="outline"
                onClick={onBack}
                className="w-full mt-3 border-amber-200 text-amber-600 hover:bg-amber-50"
              >
                Continue Shopping
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Suggested Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Complete Your Order
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
              Add a few more items to reach free shipping and make the most of
              your order!
            </p>
            <div className="text-center">
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Browse More Products
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
