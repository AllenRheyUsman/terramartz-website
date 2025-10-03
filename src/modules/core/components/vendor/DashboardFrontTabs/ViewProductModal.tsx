import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import { useDashboard } from '@/modules/core/contexts/vendor/DashboardContext';
import { ProductWithSellerData } from '@/modules/core/types/product';
import { Edit, X } from 'lucide-react';
import { motion } from 'motion/react';

export const ViewProductModal = ({
  onEditProduct,
}: {
  onEditProduct?: (product: ProductWithSellerData) => void;
}) => {
  const { viewProduct, setViewProduct, getStatusColor } = useDashboard();

  if (!viewProduct) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Product Details
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewProduct(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div>
              <ImageWithFallback
                src={viewProduct.image}
                alt={viewProduct.name}
                className="w-full h-64 object-cover rounded-lg border border-amber-200"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              {/* Basic Information */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Basic Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Name:</span>{' '}
                    {viewProduct.name}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span>{' '}
                    {viewProduct.category}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> $
                    {viewProduct.price}
                  </p>
                  <p>
                    <span className="font-medium">Stock:</span>{' '}
                    {viewProduct.stock} units
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <Badge
                      className={`ml-2 ${getStatusColor(viewProduct.status)}`}
                    >
                      {viewProduct.status.replace('_', ' ')}
                    </Badge>
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Performance
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-600">
                      {viewProduct.sales}
                    </div>
                    <div className="text-gray-600">Sales</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-bold text-blue-600">
                      {viewProduct.views}
                    </div>
                    <div className="text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="font-bold text-yellow-600">
                      {viewProduct.rating}
                    </div>
                    <div className="text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-bold text-purple-600">
                      {((viewProduct.sales / viewProduct.views) * 100).toFixed(
                        1,
                      )}
                      %
                    </div>
                    <div className="text-gray-600">Conversion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 text-sm">
              Fresh, organically grown {viewProduct.name.toLowerCase()} from our
              sustainable farm. Hand-picked at peak ripeness for maximum flavor
              and nutritional value. Perfect for salads, cooking, or eating
              fresh.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setViewProduct(null)}
              className="border-gray-300"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setViewProduct(null);
                onEditProduct?.(viewProduct);
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Edit className="w-4 h-4 mr-2" /> Edit Product
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
