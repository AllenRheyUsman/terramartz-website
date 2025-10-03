import { Button } from '@/modules/core/components/ui/button';
import { useDashboard } from '@/modules/core/contexts/vendor/DashboardContext';
import { AlertCircle, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const DeleteProductModal = () => {
  const { deleteProduct, setDeleteProduct } = useDashboard();

  if (!deleteProduct) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-md shadow-2xl border border-red-200"
      >
        <div className="p-6">
          {/* Icon Header */}
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
            Delete Product
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center mb-6">
            &quot;Are you sure you want to delete{' '}
            <strong>{deleteProduct.name}</strong>&quot;? This action cannot be
            undone and will remove all associated data including sales history
            and customer reviews.
          </p>

          {/* Warning Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <div className="flex items-center text-sm text-red-800">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>
                This will permanently delete {deleteProduct.sales} sale records
                and affect your analytics.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteProduct(null)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Handle delete logic here
                console.log('Deleting product:', deleteProduct.id);
                setDeleteProduct(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Product
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
