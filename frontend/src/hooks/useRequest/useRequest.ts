import { useEffect, useState } from 'react';
import request from 'utils/request';
import { UseRequestState, ResponseWithPagination } from './types';

type TransformDataFn<T, U> = (data: T) => U;

function useRequest<T, U>(
  url: string,
  transformData: TransformDataFn<T, U>
): UseRequestState<U> {
  const [state, setState] = useState<UseRequestState<U>>({
    loading: true
  });

  useEffect(() => {
    async function getData() {
      setState({ loading: true });
      try {
        const data = await request<ResponseWithPagination<T>>(url);

        setState({
          loading: false,
          data: transformData(data.data),
          pagination: data.pagination
        });
      } catch (e) {
        setState({ loading: false, error: e });
      }
    }

    getData();
  }, [transformData, url]);

  return state;
}

export default useRequest;
