import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryProvider from 'providers/HistoryProvider';
import useQueryParamState, { defaultValues } from 'hooks/useQueryParamState';

const Component: React.FC<any> = ({ paramName }) => {
  const [value, setValue] = useQueryParamState(paramName);
  return (
    <div>
      <div>{value}</div>
      <button
        onClick={() => {
          setValue('React Material UI');
        }}
      >
        Change value
      </button>
    </div>
  );
};

const history = createMemoryHistory({
  initialEntries: ['/']
});

function renderComponent(
  initialPath: string,
  props: React.ComponentProps<typeof Component>
) {
  history.push(initialPath);
  return render(
    <HistoryProvider history={history}>
      <Component {...props} />
    </HistoryProvider>
  );
}

test('gets the value from url on initial render', () => {
  const { getByText } = renderComponent('/?q=React', {
    paramName: 'q'
  });
  expect(getByText('React')).toBeInTheDocument();
});

test('uses default value if query parameter does not exist', () => {
  const { getByText } = renderComponent('/', {
    paramName: 'page'
  });
  expect(getByText(defaultValues.page)).toBeInTheDocument();
});

test('sets the default value on url', async () => {
  renderComponent('/', {
    paramName: 'page'
  });
  await wait(() => {
    const queryParams = new window.URLSearchParams(history.location.search);
    expect(queryParams.has('page')).toBeTruthy();
    expect(queryParams.get('page')).toBe(defaultValues.page);
  });
});

test('when the value changes, both state and url get updated', async () => {
  const { getByText } = renderComponent('/?q=React', {
    paramName: 'q'
  });

  const textElement = getByText('React');
  expect(textElement).toBeInTheDocument();

  const button = getByText('Change value');
  fireEvent.click(button);

  await wait(() => {
    expect(textElement).toHaveTextContent('React Material UI');
    const queryParams = new window.URLSearchParams(history.location.search);
    expect(queryParams.has('q')).toBeTruthy();
    expect(queryParams.get('q')).toBe('React Material UI');
  });
});

test('can use multiple queryParams', async () => {
  const history = createMemoryHistory({
    initialEntries: ['/?q=React']
  });
  const Component: React.FC = () => {
    const [query, setQuery] = useQueryParamState('q');
    const [page, setPage] = useQueryParamState('page');
    return (
      <div>
        <div>Query: {query}</div>
        <div>Page: {page}</div>
        <button
          onClick={() => {
            setQuery('React Material UI');
          }}
        >
          Change query
        </button>
        <button
          onClick={() => {
            setPage('42');
          }}
        >
          Change page
        </button>
      </div>
    );
  };
  const { getByText } = render(
    <HistoryProvider history={history}>
      <Component />
    </HistoryProvider>
  );

  const textElement = getByText('Query: React');
  expect(textElement).toBeInTheDocument();

  const button = getByText('Change page');
  fireEvent.click(button);

  await wait(() => {
    expect(textElement).toHaveTextContent('Query: React');
    expect(getByText('Page: 42')).toBeInTheDocument();
    const queryParams = new window.URLSearchParams(history.location.search);
    expect(queryParams.has('q')).toBeTruthy();
    expect(queryParams.get('q')).toBe('React');
    expect(queryParams.has('page')).toBeTruthy();
    expect(queryParams.get('page')).toBe('42');
  });
});
