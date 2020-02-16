import { useEffect, useState } from 'react';
import request from 'utils/request';

type UseRequestState<T> = {
  loading: boolean;
  data?: T;
  error?: Error;
};

function useRequest<T>(url: string): UseRequestState<T> {
  const [state, setState] = useState<UseRequestState<T>>({
    loading: true
  });

  useEffect(() => {
    async function getData() {
      setState({ loading: true });
      try {
        const data = await request<T>(url);
        setState({ loading: false, data });
      } catch (e) {
        setState({ loading: false, error: e });
      }
    }

    getData();
  }, [url]);

  return state;
}

export default useRequest;
