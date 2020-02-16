import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GlobalStyles from 'styles/GlobalStyles';
import HistoryProvider from 'providers/HistoryProvider';
import { ThemeProvider } from 'emotion-theming';
import theme from 'styles/themes/default';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HistoryProvider>
      <GlobalStyles />
      <App />
    </HistoryProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
