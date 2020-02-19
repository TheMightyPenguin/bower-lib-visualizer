import React from 'react';
import { Global, css } from '@emotion/core';
import { Theme } from 'styles/themes/types';

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={(theme: Theme) => css`
        @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

        html,
        body,
        body > div#root {
          height: 100%;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: ${theme.colors.background};
        }
      `}
    />
  );
};

export default GlobalStyles;
