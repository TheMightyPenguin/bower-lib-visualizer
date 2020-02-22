import React from 'react';
import styled from 'styles/styled';

type SelectProps = React.ComponentPropsWithRef<'select'> & {
  options: { value: string; label: string }[];
};

/**
 * Picked up styles from:
 * @see https://www.filamentgroup.com/lab/select-css.html
 */
const StyledSelect = styled.select(props => ({
  display: 'block',
  fontSize: props.theme.fontSizes.medium + 'px',
  color: props.theme.colors.black,
  width: '100%',
  maxWidth: '100%',
  padding: props.theme.space.medium + 'px',
  appearance: 'none',
  backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`,
  backgroundRepeat: 'no-repeat, repeat',
  backgroundSize: '0.65em auto, 100%;',
  backgroundPosition: 'right 0.7em top 50%, 0 0;',
  margin: 0,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  boxShadow: '5px 5px 16px 5px #9FB1BCCE'
}));

const Select: React.FC<SelectProps> = ({ options, ...selectProps }) => {
  return (
    <StyledSelect {...selectProps}>
      {options.map(options => (
        <option key={options.value} value={options.value}>
          {options.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
