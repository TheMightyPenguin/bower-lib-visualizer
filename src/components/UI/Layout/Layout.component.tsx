import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import Sidebar from 'components/UI/Sidebar';

type LayoutProps = {
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ mainContent, sidebarContent }) => {
  return (
    <Flex
      backgroundColor="black"
      color="white"
      width="100%"
      minHeight="100vh"
      flexDirection="column"
    >
      <Header />
      <Flex flex="1">
        <Box padding="small" flexGrow={0.3}>
          <Sidebar>{sidebarContent}</Sidebar>
        </Box>
        <Box padding="small" flexGrow={0.7}>
          {mainContent}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
