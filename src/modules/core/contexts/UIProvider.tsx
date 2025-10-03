'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, createContext, useContext, useState } from 'react';

// 👇 Extend this type with whatever global UI state you need
type UIContextType = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange
    >
      <UIContext.Provider value={{ sidebarOpen, toggleSidebar }}>
        <UIProvider>{children}</UIProvider>
      </UIContext.Provider>
    </ThemeProvider>
  );
}

// Hook for consuming UI state
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
