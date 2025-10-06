'use client';
import { mockFarms } from '@/modules/core/components/LocalMap/mockData';
import { Button } from '@/modules/core/components/ui/button';
import { Card, CardContent } from '@/modules/core/components/ui/card';
import { Input } from '@/modules/core/components/ui/input';
import { useLocalMap } from '@/modules/core/contexts/LocalMapContext';
import { Filter, MapPin, Search } from 'lucide-react';
import { motion } from 'motion/react';
export function MapSection({
  farms,
  onNavigateToLocalMap,
}: {
  farms: typeof mockFarms;
  onNavigateToLocalMap?: () => void;
}) {
  const {
    selectedFarm,
    setSelectedFarm,
    mapLoaded,
    searchQuery,
    setSearchQuery,
  } = useLocalMap();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      <Card className="overflow-hidden shadow-lg border-amber-200">
        <CardContent className="p-0">
          {/* Search Bar */}
          <div className="p-3 sm:p-4 bg-white border-b border-amber-100">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-amber-200 focus:border-amber-400"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-700"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-64 sm:h-80 bg-gradient-to-br from-green-100 to-blue-100">
            {!mapLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading map...</span>
                </div>
              </div>
            ) : (
              <>
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20 grid grid-cols-8 grid-rows-6">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>

                {/* Markers */}
                {farms.map((farm, index) => (
                  <motion.div
                    key={farm.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                    }}
                    onClick={() => setSelectedFarm(farm)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                        selectedFarm?.id === farm.id
                          ? 'bg-amber-500 scale-110'
                          : 'bg-green-500 hover:bg-green-600 hover:scale-105'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>

          <div className="p-4 bg-white border-t border-amber-100">
            <Button
              onClick={onNavigateToLocalMap}
              className="w-full bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600 text-white"
            >
              View Full Map & More Farms
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
