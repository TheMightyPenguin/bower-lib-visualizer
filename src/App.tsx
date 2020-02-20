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
  const [showSidebar, toggleSidebar] = useSidebarState();

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
        <Box width="100%" padding={['none', 'large']}>
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
          {loading ? (
            <Box paddingX={['small', 'none']}>
              {debouncedInput
                ? `Searching for ${debouncedInput}`
                : 'Loading popular projects'}
            </Box>
          ) : projects ? (
            <React.Fragment>
              <Box
                onClick={toggleSidebar}
                paddingX={['small', 'none']}
                paddingBottom="medium"
                cursor="pointer"
                textDecoration="underline"
              >
                {showSidebar ? 'Hide' : 'Show'} filter/sort options
              </Box>
              <Box
                backgroundColor="white"
                borderRadius={['0px', '6px']}
                boxShadow="5px 5px 16px 5px #9FB1BCCE"
              >
                {projects.map((item: any, index) => {
                  return (
                    <React.Fragment key={item.name}>
                      <ProjectItem project={item} />
                      {index !== projects.length - 1 ? (
                        <Box borderTop="1px solid" borderTopColor="accent" />
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </Box>
            </React.Fragment>
          ) : null}
        </Box>
      }
      sidebarContent={
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
          <Box>
            Sort mode:
            <Select
              value={sortMode}
              onChange={event => {
                setSortMode(event.target.value);
              }}
              options={[
                { value: 'ASC', label: 'asc' },
                { value: 'DESC', label: 'desc' }
              ]}
            />
          </Box>
        </Box>
      }
    />
  );
};

export default App;
