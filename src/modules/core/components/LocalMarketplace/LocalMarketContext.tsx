'use client';
import Farm from '@/modules/core/types/farms';
import { Product } from '@/modules/core/types/product';
import { createContext, ReactNode, useContext, useState } from 'react';

interface LocalMarketContextProps {
  proximityRange: number[];
  setProximityRange: (val: number[]) => void;
  deliveryFilter: string;
  setDeliveryFilter: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedFarm: Farm | null;
  setSelectedFarm: (val: Farm | null) => void;
  farms: Farm[];
  products: Product[];
  userLocation: { x: number; y: number };
}

const LocalMarketContext = createContext<LocalMarketContextProps | undefined>(
  undefined,
);

export const LocalMarketProvider = ({ children }: { children: ReactNode }) => {
  const [proximityRange, setProximityRange] = useState([5]);
  const [deliveryFilter, setDeliveryFilter] = useState('today');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [userLocation] = useState({ x: 45, y: 55 });

  const farms: Farm[] = [
    {
      id: 1,
      name: 'Green Valley Farm',
      rating: 4.8,
      distance: 2.1,
      x: 35,
      y: 45,
      products: [1, 2],
    },
    {
      id: 2,
      name: 'Maple Orchard',
      rating: 4.9,
      distance: 3.2,
      x: 55,
      y: 35,
      products: [3, 4],
    },
    {
      id: 3,
      name: 'Sunrise Gardens',
      rating: 4.7,
      distance: 4.5,
      x: 65,
      y: 65,
      products: [5, 6],
    },
    {
      id: 4,
      name: 'Organic Fields Co.',
      rating: 4.6,
      distance: 1.8,
      x: 25,
      y: 65,
      products: [7, 8],
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Romaine Lettuce',
      price: 3.5,
      unit: 'head',
      farmName: 'Green Valley Farm',
      distance: 2.1,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Vegetables',
      isOrganic: true,
      rating: 4.8,
      reviews: 124,
      farmId: 1,
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      price: 1.15,
      unit: 'kg',
      farmName: 'Green Valley Farm',
      distance: 2.1,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1603462903957-566630607cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Vegetables',
      isOrganic: true,
      rating: 4.7,
      reviews: 89,
      farmId: 1,
    },
    {
      id: 3,
      name: 'Farm Fresh Eggs',
      price: 6.75,
      unit: 'dozen',
      farmName: 'Maple Orchard',
      distance: 3.2,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Dairy & Eggs',
      isOrganic: false,
      rating: 4.9,
      reviews: 156,
      farmId: 2,
    },
    {
      id: 4,
      name: 'Organic Apples',
      price: 4.25,
      unit: 'kg',
      farmName: 'Maple Orchard',
      distance: 3.2,
      deliveryTime: 'Tomorrow',
      image:
        'https://images.unsplash.com/photo-1683688684067-b87a189c7503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Fruits',
      isOrganic: true,
      rating: 4.6,
      reviews: 203,
      farmId: 2,
    },
    {
      id: 5,
      name: 'Fresh Strawberries',
      price: 8.99,
      unit: 'basket',
      farmName: 'Sunrise Gardens',
      distance: 4.5,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Fruits',
      isOrganic: false,
      rating: 4.8,
      reviews: 97,
      farmId: 3,
    },
    {
      id: 6,
      name: 'Fresh Herbs Mix',
      price: 5.5,
      unit: 'bunch',
      farmName: 'Sunrise Gardens',
      distance: 4.5,
      deliveryTime: 'Tomorrow',
      image:
        'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Herbs',
      isOrganic: true,
      rating: 4.9,
      reviews: 67,
      farmId: 3,
    },
    {
      id: 7,
      name: 'Organic Tomatoes',
      price: 4.99,
      unit: 'kg',
      farmName: 'Organic Fields Co.',
      distance: 1.8,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Vegetables',
      isOrganic: true,
      rating: 4.7,
      reviews: 189,
      farmId: 4,
    },
    {
      id: 8,
      name: 'Organic Spinach',
      price: 3.25,
      unit: 'bunch',
      farmName: 'Organic Fields Co.',
      distance: 1.8,
      deliveryTime: 'Today',
      image:
        'https://images.unsplash.com/photo-1602193815349-525071f27564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      category: 'Vegetables',
      isOrganic: true,
      rating: 4.6,
      reviews: 112,
      farmId: 4,
    },
  ];

  return (
    <LocalMarketContext.Provider
      value={{
        proximityRange,
        setProximityRange,
        deliveryFilter,
        setDeliveryFilter,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        selectedFarm,
        setSelectedFarm,
        farms,
        products,
        userLocation,
      }}
    >
      {children}
    </LocalMarketContext.Provider>
  );
};

export const useLocalMarket = () => {
  const context = useContext(LocalMarketContext);
  if (!context)
    throw new Error('useLocalMarket must be used within LocalMarketProvider');
  return context;
};
