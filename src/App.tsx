import React from 'react'
import Box from 'components/UI/Box'
import Flex from 'components/UI/Flex'
import GlobalStyles from 'styles/GlobalStyles'

const App = () => {
  return (
    <Flex
      backgroundColor="black"
      color="white"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <GlobalStyles />
      <Box>Hello!</Box>
    </Flex>
  )
}

export default App
