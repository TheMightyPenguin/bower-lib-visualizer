import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';

const Header: React.FC = () => {
  return <Box>Header</Box>;
  return (
    <Flex
      height="60px"
      alignItems="center"
      backgroundColor="accent"
      boxShadow="5px 5px 16px 5px #9FB1BCCE"
      padding="medium"
    >
      <Box onClick={toggleSidebar}>H</Box>
      <Box fontSize="large" fontWeight="bold">
        Bower Lib Browser!
      </Box>
    </Flex>
  );
};

export default Header;
