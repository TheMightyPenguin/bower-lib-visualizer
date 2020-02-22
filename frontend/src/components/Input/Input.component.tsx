import styled from 'styles/styled';
import { borderRadius, BorderRadiusProps } from 'styled-system';

type InputProps = BorderRadiusProps;

const Input = styled<'input', InputProps>('input')(props => {
  return {
    margin: 0,
    background: 'transparent',
    outline: 'none',
    border: 'none',
    fontFamily: ['Montserrat', 'sans-serif'].reverse(),
    fontSize: 'large',
    padding: props.theme.space.medium + 'px',
    backgroundColor: props.theme.colors.white,
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '5px 5px 16px 5px #9FB1BCCE'
  };
}, borderRadius);

export default Input;
