import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'providers/HistoryProvider';
import { QueryParams } from './types';
import defaultValues from './defaultValues';

type UseQueryParamStateReturn = [string, (value: string) => void];

function useQueryParamState(name: keyof QueryParams): UseQueryParamStateReturn {
  const history = useHistory();

  const [value, setValue] = useState<string>(() => {
    const queryParams = new URLSearchParams(history.location.search);
    return queryParams.get(name) ?? defaultValues[name];
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
    const queryParams = new URLSearchParams(history.location.search);

    if (queryParams.has(name)) {
      return;
    }

    queryParams.set(name, defaultValues[name]);
    history.replace({
      pathname: history.location.pathname,
      search: `?${queryParams.toString()}`
    });
  }, [history, name]);

  useEffect(() => {
    const unsubscribe = history.listen(location => {
      const queryParams = new URLSearchParams(location.search);
      setValue(queryParams.get(name) ?? '');
    });
    return unsubscribe;
  }, [history, name]);

  return [value, setParam];
}

export default useQueryParamState;
