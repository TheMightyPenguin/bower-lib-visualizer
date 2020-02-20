import React from 'react';
import styled from 'styles/styled';

type SelectProps = React.ComponentPropsWithRef<'select'> & {
  options: { value: string; label: string }[];
};

const Select: React.FC<SelectProps> = props => {
  return (
    <select {...props}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
  );
};

export default Select;
