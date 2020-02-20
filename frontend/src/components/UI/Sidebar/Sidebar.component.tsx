import React from 'react';
import Box from 'components/UI/Box';
import { useSidebarState } from 'providers/SidebarProvider';

const Sidebar: React.FC = ({ children }) => {
  const [showSidebar, toggleSidebar] = useSidebarState();

  if (!showSidebar) {
    return null;
  }

  return (
    <Box>
      <Box
        flexGrow={1}
        backgroundColor="white"
        boxShadow="0px 5px 16px 5px #9FB1BCCE"
        position={['fixed', 'relative']}
        top={[0, 'auto']}
        left={[0, 'auto']}
        bottom={[0, 'auto']}
        zIndex={1}
        width={['70vw', '35vw', '25vw']}
        height="100%"
        padding="medium"
      >
        <Box textAlign="right" onClick={toggleSidebar}>
          X
        </Box>
        {children}
      </Box>
      <Box
        display={['block', 'none']}
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        right={0}
        backgroundColor="rgba(0,0,0,0.25)"
        onClick={toggleSidebar}
      />
    </Box>
  );
};

export default Sidebar;
