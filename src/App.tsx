import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import Layout from 'components/UI/Layout';
import useRequest from 'hooks/useRequest';
import useQueryParamState from 'hooks/useQueryParamState';
import useDebouncedValue from 'hooks/useDebouncedValue';

const API_URL = 'https://libraries.io/api/bower-search?q=';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useQueryParamState('q');
  const debouncedInput = useDebouncedValue(inputValue, 300);
  const searchUrl = debouncedInput ? API_URL + debouncedInput : '';
  const { loading, data, error } = useRequest(searchUrl);

  if (error) {
    return <Flex>something went wrong</Flex>;
  }

  return (
    <Layout>
      <input
        type="text"
        value={inputValue}
        onChange={event => {
          setInputValue(event.target.value);
        }}
      />
      {loading ? (
        <Box>Loading query...</Box>
      ) : data ? (
        <Box>
          {data.map((item: any) => {
            return <Box key={item.repository_url}>{item.name}</Box>;
          })}
        </Box>
      ) : null}
      <Box>Content</Box>
    </Layout>
  );
};

export default App;
