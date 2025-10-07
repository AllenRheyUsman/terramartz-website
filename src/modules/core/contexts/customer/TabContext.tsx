import { createContext, ReactNode, useContext, useState } from 'react';

// TypeScript type for the context value
interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Create context
const TabContext = createContext<TabContextType | undefined>(undefined);

// Provider component
export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

// Custom hook to use the context
export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};
