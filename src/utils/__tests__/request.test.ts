import request from 'utils/request';

test('throws an error if response status code is >= 300', async () => {
  global.fetch = jest.fn(() => {
    const response = new Response('response', { status: 300 });
    return Promise.resolve(response);
  });

  await expect(request('/api/example')).rejects.toThrowError(
    'Response with status code: 300'
  );
});

test('returns the response if status code is >= 200', async () => {
  global.fetch = jest.fn(() => {
    const data = new Blob([JSON.stringify({ data: 'hello' })], {
      type: 'application/json'
    });
    const response = new Response(data, { status: 200 });
    return Promise.resolve(response);
  });

  await expect(request('/api/example')).resolves.toEqual({ data: 'hello' });
});
