'use client';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Input } from '@/modules/core/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/core/components/ui/select';
import { Slider } from '@/modules/core/components/ui/slider';
import { Filter, Search } from 'lucide-react';
import { useLocalMarket } from './LocalMarketContext';

export function LocalMarketFilters() {
  const {
    searchQuery,
    setSearchQuery,
    proximityRange,
    setProximityRange,
    deliveryFilter,
    setDeliveryFilter,
    categoryFilter,
    setCategoryFilter,
  } = useLocalMarket();

  return (
    <Card className="border-amber-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-amber-600" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search products or farms..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="pl-10 border-amber-300 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Proximity */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Proximity: ≤ {proximityRange[0]} km
          </label>
          <Slider
            value={proximityRange}
            onValueChange={setProximityRange}
            max={10}
            min={1}
            step={0.5}
            className="py-2"
          />
        </div>

        {/* Delivery Time */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Delivery
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={deliveryFilter === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDeliveryFilter('today')}
              className={
                deliveryFilter === 'today'
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'border-amber-300 text-amber-700 hover:bg-amber-50'
              }
            >
              Today
            </Button>
            <Button
              variant={deliveryFilter === 'tomorrow' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDeliveryFilter('tomorrow')}
              className={
                deliveryFilter === 'tomorrow'
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'border-amber-300 text-amber-700 hover:bg-amber-50'
              }
            >
              Tomorrow
            </Button>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Category
          </label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="border-amber-300 focus:border-amber-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Fruits">Fruits</SelectItem>
              <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
              <SelectItem value="Herbs">Herbs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
