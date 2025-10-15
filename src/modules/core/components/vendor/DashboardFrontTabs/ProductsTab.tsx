import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { useDashboard } from '@/modules/core/contexts/vendor/DashboardContext';
import { ProductWithSellerData } from '@/modules/core/types/product';
import { Edit, Eye, Plus, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const ProductsTab = ({
  sellerProducts,
  onEditProduct,
  getStatusColor,
}: {
  sellerProducts: ProductWithSellerData[];
  onAddProduct?: () => void;
  onEditProduct?: (product: ProductWithSellerData) => void;
  getStatusColor: (status: string) => string;
}) => {
  const { setViewProduct, setDeleteProduct, loadingProducts } = useDashboard();

  return (
    <Card className="border-amber-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Products ({sellerProducts.length})</CardTitle>
          <Link href="/vendor/product/new">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {loadingProducts ? (
          <div className="flex justify-center py-10 text-gray-500 text-sm">
            Loading products...
          </div>
        ) : sellerProducts.length === 0 ? (
          <div className="flex justify-center py-10 text-gray-500 text-sm">
            No products found.
          </div>
        ) : (
          <div className="space-y-4">
            {sellerProducts.map((product) => (
              <div
                key={product.id}
                className="border border-amber-200 rounded-lg p-4 hover:bg-amber-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          Stock: {product.stock}
                        </span>
                        <span className="text-sm text-gray-600">
                          Sales: {product.sales}
                        </span>
                        <span className="text-sm text-gray-600">
                          Views: {product.views}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${product.price}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {product.rating} ({product.sales} reviews)
                      </div>
                      <Badge
                        className={`text-xs mt-1 ${getStatusColor(product.status)}`}
                      >
                        {product.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:bg-blue-50"
                        onClick={() => setViewProduct(product)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Link
                        href={`/vendor/product/new/${product.id}`}
                        onClick={(e) => {
                          onEditProduct?.(product);
                        }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-600 hover:bg-amber-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteProduct(product)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
