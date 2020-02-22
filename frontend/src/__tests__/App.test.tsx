import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import HistoryProvider from '../providers/HistoryProvider';
import SidebarProvider from '../providers/SidebarProvider';
import { ThemeProvider } from 'emotion-theming';
import theme from '../styles/themes/default';
import mockProjects from '../__mocks__/mockProjects';

function mockFetch<T extends {}>(mockData: T, status = 200) {
  global.fetch = jest.fn(() => {
    const data = new Blob([JSON.stringify(mockData)], {
      type: 'application/json'
    });
    const response = new Response(data, { status });
    return Promise.resolve(response);
  });
}

function renderComponent() {
  return render(
    <ThemeProvider theme={theme}>
      <HistoryProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </HistoryProvider>
    </ThemeProvider>
  );
}

test('shows a list of projects', async () => {
  mockFetch({ data: [...mockProjects], pagination: null });
  const { findByText } = renderComponent();

  for (const project of mockProjects) {
    const element = await findByText(project.name);
    expect(element).toBeInTheDocument();
  }
});
