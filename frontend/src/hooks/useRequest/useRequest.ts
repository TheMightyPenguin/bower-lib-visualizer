import { useEffect, useState } from 'react';
import request from 'utils/request';
import { UseRequestState, ResponseWithPagination } from './types';

function useRequest<T>(url: string): UseRequestState<T> {
  const [state, setState] = useState<UseRequestState<T>>({
    loading: true
  });

  useEffect(() => {
    async function getData() {
      setState({ loading: true });
      try {
        const data = await request<ResponseWithPagination<T>>(url);
        setState({
          loading: false,
          data: data.data,
          pagination: data.pagination
        });
      } catch (e) {
        setState({ loading: false, error: e });
      }
    }

    getData();
  }, [url]);

  return state;
}

export default useRequest;
