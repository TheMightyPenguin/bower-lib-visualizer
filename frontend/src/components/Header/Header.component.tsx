import React from 'react';
import Box from 'components/Box';
import Flex from 'components/Flex';
import { useSidebarState } from 'providers/SidebarProvider';
import MenuIcon from './MenuIcon';

const Header: React.FC = () => {
  const [showSidebar, toggleSidebar] = useSidebarState();
  return (
    <Flex
      height="60px"
      alignItems="center"
      backgroundColor="accent"
      boxShadow="5px 5px 16px 5px #9FB1BCCE"
      padding={['medium', 'large']}
    >
      <MenuIcon onClick={toggleSidebar} open={showSidebar} />
      <Box margin="auto" />
      <Box fontSize="large" fontWeight="bold">
        Bower Lib Browser!
      </Box>
    </Flex>
  );
};

export default Header;
