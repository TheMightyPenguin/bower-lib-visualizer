import React, { createContext, useContext, useState, useCallback } from 'react';

type SidebarContextValue = [boolean, () => void];

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

function useSidebarState() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarState should be used inside SidebarProvider');
  }
  return context;
}

const SidebarProvider: React.FC = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(currentValue => !currentValue);
  }, [setShowSidebar]);

  return (
    <SidebarContext.Provider value={[showSidebar, toggleSidebar]}>
      {children}
    </SidebarContext.Provider>
  );
};

export { useSidebarState };
export default SidebarProvider;
