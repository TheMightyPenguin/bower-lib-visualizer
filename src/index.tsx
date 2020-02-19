import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import GlobalStyles from 'styles/GlobalStyles';
import HistoryProvider from 'providers/HistoryProvider';
import SidebarProvider from 'providers/SidebarProvider';
import { ThemeProvider } from 'emotion-theming';
import theme from 'styles/themes/default';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HistoryProvider>
      <SidebarProvider>
        <GlobalStyles />
        <App />
      </SidebarProvider>
    </HistoryProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
