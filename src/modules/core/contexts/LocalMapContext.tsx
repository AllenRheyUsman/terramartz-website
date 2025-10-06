'use client';
import { mockFarms } from '@/modules/core/components/LocalMap/mockData';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Farm = (typeof mockFarms)[0];

interface LocalMapContextType {
  selectedFarm: Farm | null;
  setSelectedFarm: (farm: Farm | null) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  mapLoaded: boolean;
  setMapLoaded: (value: boolean) => void;
}

const LocalMapContext = createContext<LocalMapContextType | undefined>(
  undefined,
);

export const LocalMapProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LocalMapContext.Provider
      value={{
        selectedFarm,
        setSelectedFarm,
        searchQuery,
        setSearchQuery,
        mapLoaded,
        setMapLoaded,
      }}
    >
      {children}
    </LocalMapContext.Provider>
  );
};

// Custom hook
export const useLocalMap = () => {
  const context = useContext(LocalMapContext);
  if (!context) {
    throw new Error('useLocalMap must be used within a LocalMapProvider');
  }
  return context;
};
