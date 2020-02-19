import React from 'react';
import Box from 'components/UI/Box';

const Sidebar: React.FC = ({ children }) => {
  return (
    <Box
      flexGrow={1}
      backgroundColor="white"
      boxShadow="0px 5px 16px 5px #9FB1BCCE"
      position="relative"
      zIndex={1}
      height="100%"
    >
      {children}
    </Box>
  );
};

export default Sidebar;
