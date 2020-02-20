export type RequestParameters = Parameters<typeof window.fetch>;

async function request<R = any>(...args: RequestParameters) {
  const response = await window.fetch(...args);

  if (response.status >= 300) {
    throw new Error(`Response with status code: ${response.status}`);
  }

  const result = (await response.json()) as R;
  return result;
}

export default request;
