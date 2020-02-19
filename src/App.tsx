import React, { useMemo } from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import Input from 'components/UI/Input';
import Select from 'components/UI/Select';
import Layout from 'components/UI/Layout';
import ProjectItem from 'components/UI/ProjectItem';
import useRequest from 'hooks/useRequest';
import useQueryParamState from 'hooks/useQueryParamState';
import useDebouncedValue from 'hooks/useDebouncedValue';
import { useSidebarState } from 'providers/SidebarProvider';
import { Project } from 'types/apiTypes';

const API_URL = 'https://libraries.io/api/bower-search?q=';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useQueryParamState('q');
  const [page, setPage] = useQueryParamState('page');
  const [itemsPerPage, setItemsPerPage] = useQueryParamState('per_page');
  const [sortField, setSortField] = useQueryParamState('sort_by');
  const [sortMode, setSortMode] = useQueryParamState('sort_mode');
  const [, toggleSidebar] = useSidebarState();

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
        <Box padding={['none', 'large']}>
          <Box marginBottom="large">
            <Input
              type="text"
              value={inputValue}
              placeholder="Search for projects"
              borderRadius={['0px', '6px']}
              onChange={event => {
                setInputValue(event.target.value);
              }}
            />
          </Box>
          <Box
            onClick={toggleSidebar}
            paddingX={['small', 'none']}
            paddingBottom="small"
          >
            Show filter/sort options
          </Box>
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
                return <ProjectItem key={item.name} project={item} />;
              })}
            </Box>
          ) : null}
          <Box>Content</Box>
        </Box>
      }
      sidebarContent={
        <Box padding="small">
          <Box>
            <Box>
              Items per page:{' '}
              <Select
                value={itemsPerPage}
                onChange={event => {
                  setItemsPerPage(event.target.value);
                }}
                options={[
                  { value: '5', label: '5' },
                  { value: '10', label: '10' },
                  { value: '20', label: '20' },
                  { value: '50', label: '50' }
                ]}
              />
            </Box>
          </Box>
          <Box>
            <Box>
              Page:{' '}
              <Select
                value={page}
                onChange={event => {
                  setPage(event.target.value);
                }}
                options={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' }
                ]}
              />
            </Box>
          </Box>
          <Box>
            <Box>
              Sort by:
              <Select
                value={sortField}
                onChange={event => {
                  setSortField(event.target.value);
                }}
                options={[
                  { value: '', label: 'None' },
                  { value: 'name', label: 'Name' },
                  { value: 'stars', label: 'Stars' },
                  { value: 'owner', label: 'Owner' }
                ]}
              />
            </Box>
          </Box>
          <Box>
            <Box>
              Sort mode:
              <Select
                value={sortField}
                onChange={event => {
                  setSortField(event.target.value);
                }}
                options={[
                  { value: 'ASC', label: 'asc' },
                  { value: 'DESC', label: 'desc' }
                ]}
              />
            </Box>
          </Box>
        </Box>
      }
    />
  );
};

export default App;
