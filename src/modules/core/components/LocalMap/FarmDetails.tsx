import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import { Card, CardContent } from '@/modules/core/components/ui/card';
import { useLocalMap } from '@/modules/core/contexts/LocalMapContext';
import { Product } from '@/modules/core/types/product';
import { MapPin, ShoppingCart, Star } from 'lucide-react';
export function FarmDetails({
  onAddToCart,
}: {
  onAddToCart: (product: Product, button: HTMLElement) => void;
}) {
  const { selectedFarm } = useLocalMap();

  if (!selectedFarm) {
    return (
      <Card className="border-amber-200 border-dashed">
        <CardContent className="p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a Farm
          </h3>
          <p className="text-gray-600">
            Click on any green marker on the map to see farm details and
            available products.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {selectedFarm.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {selectedFarm.rating}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-green-600">
                {selectedFarm.distance} away
              </span>
            </div>
          </div>
          <Badge variant="outline" className="border-green-300 text-green-700">
            Organic Certified
          </Badge>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Available Products</h4>
          <div className="grid gap-3">
            {selectedFarm.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{product.name}</h5>
                  <p className="text-lg font-semibold text-green-600">
                    ${product.price}
                  </p>
                </div>
                <Button
                  id={`add-to-cart-${product.id}`}
                  onClick={() =>
                    onAddToCart(
                      {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: 'Local',
                        farmName: selectedFarm.name,
                        inStock: true,
                      },
                      document.getElementById(`add-to-cart-${product.id}`)!,
                    )
                  }
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600 text-white"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
