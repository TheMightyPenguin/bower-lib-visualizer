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

const Component: React.FC<{ url: string }> = ({ url }) => {
  const { loading, data, error } = useRequest(url);

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

test('if the url is empty, shows empty data message', () => {
  const { getByText } = render(<Component url="" />);
  expect(getByText('No data to show yet')).toBeInTheDocument();
});

test('shows a loading message on initial render', () => {
  const { getByText } = render(<Component url="https://example.com" />);
  expect(getByText('Loading...')).toBeInTheDocument();
});

test('shows a loading message and eventually the data', async () => {
  mockFetch({ message: 'hello world' });
  const { getByText, findByText } = render(
    <Component url="https://example.com" />
  );
  expect(getByText('Loading...')).toBeInTheDocument();
  expect(await findByText('hello world')).toBeInTheDocument();
});

test('shows a loading message and eventually the error', async () => {
  mockFetch({ message: 'hello world' }, 401);
  const { getByText, findByText } = render(
    <Component url="https://example.com" />
  );
  expect(getByText('Loading...')).toBeInTheDocument();
  expect(await findByText('Oops, something went wrong')).toBeInTheDocument();
});
