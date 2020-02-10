import React from 'react';
import { render } from '@testing-library/react';
import useDebouncedValue from 'hooks/useDebouncedValue';

const Component: React.FC<{ value: string }> = ({ value }) => {
  const debouncedValue = useDebouncedValue(value, 300);
  return <div>{debouncedValue}</div>;
};

test('shows initial value on first render', () => {
  const { getByText } = render(<Component value="hello" />);
  expect(getByText('hello')).toBeInTheDocument();
});

test('shows initial value and eventually the updated value', async () => {
  const { getByText, findByText, rerender } = render(
    <Component value="hello" />
  );
  expect(getByText('hello')).toBeInTheDocument();

  rerender(<Component value="penguins" />);

  expect(getByText('hello')).toBeInTheDocument();

  const element = await findByText('penguins');
  expect(element).toBeInTheDocument();
});
