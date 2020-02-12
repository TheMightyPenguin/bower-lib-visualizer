import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryProvider from 'providers/HistoryProvider';
import useQueryParamState from 'hooks/useQueryParamState';

const Component: React.FC<{ paramName: string; defaultValue?: string }> = ({
  paramName,
  defaultValue
}) => {
  const [value, setValue] = useQueryParamState(paramName, defaultValue);
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
  const { getByText } = renderComponent('/?query=React', {
    paramName: 'query'
  });
  expect(getByText('React')).toBeInTheDocument();
});

test('uses default value if query parameter does not exist', () => {
  const { getByText } = renderComponent('/', {
    paramName: 'query',
    defaultValue: 'Awesome'
  });
  expect(getByText('Awesome')).toBeInTheDocument();
});

test.only('when the value changes, both state and url get updated', async () => {
  const { getByText } = renderComponent('/?query=React', {
    paramName: 'query'
  });

  const textElement = getByText('React');
  expect(textElement).toBeInTheDocument();

  const button = getByText('Change value');
  fireEvent.click(button);

  await wait(() => {
    expect(textElement).toHaveTextContent('React Material UI');
    const queryParams = new window.URLSearchParams(history.location.search);
    expect(queryParams.has('query')).toBeTruthy();
    expect(queryParams.get('query')).toBe('React Material UI');
  });
});
