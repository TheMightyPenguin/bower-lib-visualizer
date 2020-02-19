import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import Sidebar from 'components/UI/Sidebar';
import { useSidebarState } from 'providers/SidebarProvider';

type LayoutProps = {
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ mainContent, sidebarContent }) => {
  const [showSidebar] = useSidebarState();

  return (
    <Flex
      width="100%"
      minHeight="100vh"
      flexDirection="column"
      backgroundColor="background"
    >
      <Flex flex="1">
        {showSidebar ? (
          <Box flexGrow={0.3}>
            <Sidebar>{sidebarContent}</Sidebar>
          </Box>
        ) : null}
        <Box flexGrow={showSidebar ? 0.7 : 1} overflowY="auto">
          <Header />
          {mainContent}
          <Footer />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
