import React from 'react';
import Box from 'components/UI/Box';

const Footer: React.FC = () => {
  return (
    <Box textAlign="center" paddingY="medium">
      Made with 🍕 by{' '}
      <a
        href="https://twitter.com/MightyPenguinV"
        target="_blank"
        rel="noopener noreferrer"
      >
        @MightyPenguinV
      </a>
    </Box>
  );
};

export default Footer;
