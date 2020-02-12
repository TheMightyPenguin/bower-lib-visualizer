import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import Sidebar from 'components/UI/Sidebar';

const Layout: React.FC = ({ children }) => {
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
          <Sidebar />
        </Box>
        <Box padding="small" flexGrow={0.7}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
