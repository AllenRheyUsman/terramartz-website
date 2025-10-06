import { mockFarms } from '@/modules/core/components/LocalMap/mockData';
import { Card, CardContent } from '@/modules/core/components/ui/card';
import { useLocalMap } from '@/modules/core/contexts/LocalMapContext';
export function StatsGrid() {
  const { searchQuery } = useLocalMap();

  // Optionally filter by search query (for real search logic, integrate later)
  const filteredFarms = mockFarms.filter((farm) =>
    farm.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalFarms = filteredFarms.length;

  const totalProducts = filteredFarms.reduce(
    (sum, farm) => sum + farm.products.length,
    0,
  );

  // Parse numeric value from "2.3 km"
  const avgDistance =
    filteredFarms.length > 0
      ? (
          filteredFarms.reduce(
            (sum, farm) =>
              sum + parseFloat(farm.distance.replace('km', '').trim()),
            0,
          ) / filteredFarms.length
        ).toFixed(1)
      : 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">{totalFarms}+</div>
          <div className="text-sm text-gray-600">Local Farms</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-amber-600">
            {totalProducts}+
          </div>
          <div className="text-sm text-gray-600">Fresh Products</div>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-orange-600">
            {avgDistance}km
          </div>
          <div className="text-sm text-gray-600">Avg Distance</div>
        </CardContent>
      </Card>
    </div>
  );
}
