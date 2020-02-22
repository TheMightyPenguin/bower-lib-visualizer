import React from 'react';
import Box from 'components/UI/Box';

type PageButtonProps = {
  onClick: () => void;
  content: string;
};

const PageButton: React.FC<PageButtonProps> = ({ onClick, content }) => {
  return (
    <Box
      onClick={onClick}
      textDecoration="underline"
      cursor="pointer"
      paddingX="small"
      fontSize="large"
    >
      {content}
    </Box>
  );
};

export default PageButton;
