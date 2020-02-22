import React from 'react';
import Box from 'components/Box';

type MenuIconProps = {
  open: boolean;
  onClick: () => void;
};

const MenuIcon: React.FC<MenuIconProps> = ({ open, onClick }) => {
  return (
    <Box
      onClick={onClick}
      position="relative"
      width="30px"
      height="14px"
      cursor="pointer"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="4px"
        backgroundColor="black"
        transition="transform .3s ease"
        transform={open ? 'translateY(4px) rotateZ(45deg)' : ''}
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        height="4px"
        backgroundColor="black"
        transition="transform .3s ease"
        transform={open ? 'translateY(-6px) rotateZ(-45deg)' : ''}
      />
    </Box>
  );
};

export default MenuIcon;
