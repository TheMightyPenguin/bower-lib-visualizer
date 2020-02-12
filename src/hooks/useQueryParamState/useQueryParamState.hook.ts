import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'providers/HistoryProvider';

type UseQueryParamStateReturn = [string, (value: string) => void];

function useQueryParamState(
  name: string,
  defaultValue = ''
): UseQueryParamStateReturn {
  const history = useHistory();

  const [value, setValue] = useState<string>(() => {
    const queryParams = new URLSearchParams(history.location.search);
    return queryParams.get(name) ?? defaultValue;
  });

  const setParam = useCallback(
    (value: string) => {
      const queryParams = new URLSearchParams(history.location.search);
      queryParams.set(name, value);
      history.push({
        pathname: history.location.pathname,
        search: `?${queryParams.toString()}`
      });
    },
    [history, name]
  );

  useEffect(() => {
    const unsubscribe = history.listen(location => {
      const queryParams = new URLSearchParams(location.search);
      setValue(queryParams.get(name) ?? '');
    });
    return unsubscribe;
  }, [name]);

  return [value, setParam];
}

export default useQueryParamState;
