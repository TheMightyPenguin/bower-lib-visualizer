import { useState, useEffect } from 'react';

function useDebouncedValue<T>(value: T, timeout: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
}

export default useDebouncedValue;
