import React, { useMemo } from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import Layout from 'components/UI/Layout';
import ProjectItem from 'components/UI/ProjectItem';
import useRequest from 'hooks/useRequest';
import useQueryParamState from 'hooks/useQueryParamState';
import useDebouncedValue from 'hooks/useDebouncedValue';
import { Project } from 'types/apiTypes';

const API_URL = 'https://libraries.io/api/bower-search?q=';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useQueryParamState('q');
  const [page, setPage] = useQueryParamState('page');
  const [itemsPerPage, setItemsPerPage] = useQueryParamState('per_page');
  const [sortField, setSortField] = useQueryParamState('sort_by');
  const [sortMode, setSortMode] = useQueryParamState('sort_mode');

  const debouncedInput = useDebouncedValue(inputValue, 300);
  const searchUrl =
    API_URL + debouncedInput + `&page=${page}&per_page=${itemsPerPage}`;

  const { loading, data, error } = useRequest<Project[]>(searchUrl);

  const projects = useMemo(() => {
    if (!data) {
      return;
    }

    if (!sortField) {
      return data;
    }

    const sign = sortMode === 'ASC' ? 1 : -1;

    return data.sort((projectA, projectB) => {
      // @ts-ignore
      if (projectA[sortField] > projectB[sortField]) {
        return 1 * sign;
        // @ts-ignore
      } else if (projectA[sortField] < projectB[sortField]) {
        return -1 * sign;
      } else {
        return 0;
      }
    });
  }, [data, sortField, sortMode]);

  if (error) {
    return <Flex>something went wrong</Flex>;
  }

  return (
    <Layout
      mainContent={
        <Box>
          <input
            type="text"
            value={inputValue}
            onChange={event => {
              setInputValue(event.target.value);
            }}
          />
          {loading ? (
            <Box>
              {debouncedInput
                ? `Searching for ${debouncedInput}`
                : 'Loading popular projects'}
            </Box>
          ) : projects ? (
            <Box>
              <Flex>
                <Box padding="small">Name</Box>
                <Box padding="small">Stars</Box>
                <Box padding="small">Owner</Box>
              </Flex>
              {projects.map((item: any) => {
                return <ProjectItem key={item.repository_url} project={item} />;
              })}
            </Box>
          ) : null}
          <Box>Content</Box>
        </Box>
      }
      sidebarContent={
        <Box>
          <Box>
            <Box>
              Items per page:{' '}
              <select
                value={itemsPerPage}
                onChange={event => {
                  setItemsPerPage(event.target.value);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </Box>
          </Box>
          <Box>
            <Box>
              Page:{' '}
              <select
                value={page}
                onChange={event => {
                  setPage(event.target.value);
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </Box>
          </Box>
          <Box>
            <Box>
              Sort by:
              <select
                value={sortField}
                onChange={event => {
                  setSortField(event.target.value);
                }}
              >
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="stars">Stars</option>
                <option value="owner">Owner</option>
              </select>
            </Box>
          </Box>
          <Box>
            <Box>
              Sort mode:
              <select
                value={sortMode}
                onChange={event => {
                  setSortMode(event.target.value);
                }}
              >
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </Box>
          </Box>
        </Box>
      }
    />
  );
};

export default App;
