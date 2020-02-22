import React from 'react';
import { render } from '@testing-library/react';
import useRequest from 'hooks/useRequest';

function mockFetch<T extends {}>(mockData: T, status = 200) {
  global.fetch = jest.fn(() => {
    const data = new Blob([JSON.stringify(mockData)], {
      type: 'application/json'
    });
    const response = new Response(data, { status });
    return Promise.resolve(response);
  });
}

const transformFn = (x: any) => x;

const Component: React.FC<{ url: string }> = ({ url }) => {
  const { loading, data, error } = useRequest(url, transformFn);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops, something went wrong</div>;
  }

  if (!data) {
    return <div>No data to show yet</div>;
  }

  return <div>{data.message}</div>;
};

test('shows a loading message on initial render', () => {
  const { getByText } = render(<Component url="https://example.com" />);
  expect(getByText('Loading...')).toBeInTheDocument();
});

test('shows a loading message and eventually the data', async () => {
  mockFetch({ data: { message: 'hello world' }, pagination: null });
  const { getByText, findByText } = render(
    <Component url="https://example.com" />
  );
  expect(getByText('Loading...')).toBeInTheDocument();
  expect(await findByText('hello world')).toBeInTheDocument();
});

test('shows a loading message and eventually the error', async () => {
  mockFetch({ data: { message: 'hello world' }, pagination: null }, 401);
  const { getByText, findByText } = render(
    <Component url="https://example.com" />
  );
  expect(getByText('Loading...')).toBeInTheDocument();
  expect(await findByText('Oops, something went wrong')).toBeInTheDocument();
});
