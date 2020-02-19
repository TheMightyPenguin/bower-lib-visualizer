import { Theme } from './types';

const theme: Theme = {
  space: {
    none: 0,
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 32,
    xlarge: 64
  },
  fontSizes: {
    xsmall: 12,
    small: 14,
    medium: 16,
    large: 20,
    xlarge: 32
  },
  /**
   * Color Palette:
   * @see https://coolors.co/2e5266-6e8898-9fb1bc-d3d0cb-e2c044
   */
  colors: {
    primary: '#2E5266',
    secondary: '#6E8898',
    accent: '#E2C044',
    shadow: '#9FB1BC',
    background: '#D3D0CB',
    white: '#FFFFFF'
  }
};

export default theme;
