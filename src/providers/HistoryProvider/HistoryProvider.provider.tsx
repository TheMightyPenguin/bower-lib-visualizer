import React, { createContext, useContext } from 'react';
import { createBrowserHistory, History } from 'history';

type HistoryProviderProps = {
  history?: History;
};

const HistoryContext = createContext<History | undefined>(undefined);

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory should be used inside HistoryProvider');
  }
  return context;
}

const HistoryProvider: React.FC<HistoryProviderProps> = ({
  children,
  history = createBrowserHistory()
}) => {
  return (
    <HistoryContext.Provider value={history}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
