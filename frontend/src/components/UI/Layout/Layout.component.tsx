import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import Sidebar from 'components/UI/Sidebar';

type LayoutProps = {
  mainContent: React.ReactNode;
  sidebarContent?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ mainContent, sidebarContent }) => {
  return (
    <Flex width="100%" minHeight="100vh" backgroundColor="background">
      <Sidebar>{sidebarContent}</Sidebar>
      <Flex width="100%" flexDirection="column">
        <Header />
        <Box width="100%" maxWidth="900px" margin="0 auto" flex={1}>
          {mainContent}
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default Layout;
