export type SpaceScaleUnit =
  | 'none'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';

export type FontSizeScaleUnit =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';

export type ColorUnit =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'background'
  | 'shadow'
  | 'white'
  | 'black';

type Theme = {
  space: Record<SpaceScaleUnit, number>;
  fontSizes: Record<FontSizeScaleUnit, number>;
  colors: Record<ColorUnit, string>;
};
