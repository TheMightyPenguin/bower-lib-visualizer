import React from 'react';
import { Global, css } from '@emotion/core';

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

        html,
        body,
        body > div#root {
          height: 100%;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
  );
};

export default GlobalStyles;
