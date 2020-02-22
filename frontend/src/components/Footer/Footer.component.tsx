import React from 'react';
import Box from 'components/Box';

const Footer: React.FC = () => {
  return (
    <Box textAlign="center" paddingY="medium">
      Made with{' '}
      <span role="img" aria-label="pizza">
        🍕
      </span>{' '}
      by{' '}
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
