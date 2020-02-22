import { useState, useEffect } from 'react';

function useOffline() {
  const [isOffline, setIsOffline] = useState(!window.navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOffline(false);
    }

    function offlineHandler() {
      setIsOffline(true);
    }

    window.addEventListener('online', onlineHandler);
    window.removeEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', onlineHandler);
    };
  }, [setIsOffline]);

  return isOffline;
}

export default useOffline;
