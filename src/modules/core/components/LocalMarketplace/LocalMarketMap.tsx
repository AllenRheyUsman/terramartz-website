'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocalMarket } from './LocalMarketContext';

export function LocalMarketMap() {
  const { farms, selectedFarm, setSelectedFarm, proximityRange, userLocation } =
    useLocalMarket();
  const visibleFarms = farms.filter((f) => f.distance <= proximityRange[0]);

  return (
    <Card className="border-amber-200 shadow-sm mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <span>Local Farms & Producers</span>
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>≤ {proximityRange[0]} km</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Map Container */}
        <div className="relative bg-gradient-to-br from-green-100 via-green-50 to-amber-50 rounded-lg h-96 overflow-hidden border-2 border-amber-200">
          {/* Map Background Elements */}
          <div className="absolute inset-0">
            {/* River/Water */}
            <div className="absolute top-12 left-8 w-32 h-16 bg-blue-200 rounded-full opacity-60 transform rotate-12"></div>
            <div className="absolute top-20 left-24 w-48 h-12 bg-blue-200 rounded-full opacity-60 transform rotate-12"></div>

            {/* Roads */}
            <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-300 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2"></div>

            {/* City Area */}
            <div className="absolute bottom-12 right-16 w-24 h-24 bg-gray-200 rounded-lg opacity-50"></div>

            {/* Montreal Label */}
            <div className="absolute bottom-8 right-12 text-amber-700 font-medium text-lg">
              Montreal
            </div>
          </div>

          {/* User Location */}
          <motion.div
            className="absolute w-6 h-6 -translate-x-3 -translate-y-3 z-20"
            style={{
              left: `${userLocation.x}%`,
              top: `${userLocation.y}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600 whitespace-nowrap bg-white px-2 py-1 rounded shadow">
              You are here
            </div>
          </motion.div>

          {/* Farm Locations */}
          {visibleFarms.map((farm, index) => (
            <motion.div
              key={farm.id}
              className="absolute w-8 h-8 -translate-x-4 -translate-y-4 z-10 cursor-pointer"
              style={{ left: `${farm.x}%`, top: `${farm.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() =>
                setSelectedFarm(selectedFarm?.id === farm.id ? null : farm)
              }
            >
              <div
                className={`w-8 h-8 bg-amber-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  selectedFarm?.id === farm.id ? 'ring-2 ring-amber-400' : ''
                }`}
              >
                <MapPin className="w-4 h-4 text-white" />
              </div>
              {/* Farm Tooltip */}
              {selectedFarm?.id === farm.id && (
                <motion.div
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border border-amber-200 whitespace-nowrap z-30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="font-medium text-gray-900">{farm.name}</div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span>{farm.rating}</span>
                    <span>•</span>
                    <span>{farm.distance} km</span>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Distance Circles */}
          <div className="absolute inset-0 pointer-events-none">
            {[2, 4, 6].map((radius) => (
              <div
                key={radius}
                className="absolute border border-amber-300 rounded-full opacity-30"
                style={{
                  width: `${radius * 20}%`,
                  height: `${radius * 20}%`,
                  left: `${userLocation.x - radius * 10}%`,
                  top: `${userLocation.y - radius * 10}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Map Legend */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
              <span className="text-gray-600">Your Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full border border-white"></div>
              <span className="text-gray-600">Local Farms</span>
            </div>
          </div>
          <div className="text-gray-500">
            Showing {visibleFarms.length} farms within {proximityRange[0]} km
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
