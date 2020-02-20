import styled from 'styles/styled';
import {
  space,
  layout,
  position,
  border,
  typography,
  color,
  flexbox,
  grid,
  TypographyProps,
  PositionProps,
  BorderProps,
  LayoutProps,
  SpaceProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  BorderColorProps,
  BackgroundColorProps,
  system,
  shadow,
  ShadowProps
} from 'styled-system';
import shouldForwardProp from '@styled-system/should-forward-prop';
import * as CSS from 'csstype';

export type BoxProps = SpaceProps &
  LayoutProps &
  PositionProps &
  BorderProps &
  TypographyProps &
  ColorProps &
  BorderColorProps &
  BackgroundColorProps &
  GridProps &
  FlexboxProps &
  ShadowProps & {
    /**
     *
     * `color` is typed explicitly to prevent collision with div element color attribute
     * @see https://github.com/styled-system/styled-system/issues/464
     * @see https://gist.github.com/chiplay/d10435c0962ec62906319e12790104d1
     */
    color?: CSS.ColorProperty;
    as?: keyof JSX.IntrinsicElements;
    textTransform?: CSS.TextTransformProperty;
    transform?: CSS.TransformProperty;
    cursor?: CSS.CursorProperty;
    textDecoration?: CSS.TextDecorationProperty<string>;
  };

const Box = styled<'div', BoxProps>('div', { shouldForwardProp })(
  {
    margin: 0,
    padding: 0,
    border: 0,
    fontFamily: ['Montserrat', 'sans-serif'].reverse(),
    boxSizing: 'border-box'
  },
  space,
  layout,
  position,
  border,
  typography,
  color,
  flexbox,
  grid,
  shadow,
  system({
    textTransform: true,
    transform: true,
    cursor: true,
    textDecoration: true
  })
);

export default Box;
