import React, { useMemo } from 'react';
import Box from 'components/Box';
import Flex from 'components/Flex';
import Input from 'components/Input';
import Select from 'components/Select';
import Layout from 'components/Layout';
import Paginator from 'components/Paginator';
import ProjectItem from 'components/ProjectItem';
import useRequest from 'hooks/useRequest';
import useQueryParamState from 'hooks/useQueryParamState';
import useDebouncedValue from 'hooks/useDebouncedValue';
import useOffline from 'hooks/useOffline';
import { useSidebarState } from 'providers/SidebarProvider';
import { Project, ProjectWithOwner } from 'types/apiTypes';
import { isDOMComponent } from 'react-dom/test-utils';

const API_URL = 'https://rmru2tqyjl.execute-api.us-west-2.amazonaws.com/prod/';

function transformData(originalData: Project[]) {
  const transformedData: ProjectWithOwner[] = originalData.map(item => {
    const urlParts = item.repository_url.split('/');
    const owner = urlParts[urlParts.length - 2] ?? '';
    return { ...item, owner };
  });

  return transformedData;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useQueryParamState('q');
  const [page, setPage] = useQueryParamState('page');
  const [itemsPerPage, setItemsPerPage] = useQueryParamState('per_page');
  const [sortField, setSortField] = useQueryParamState('sort_by');
  const [sortMode, setSortMode] = useQueryParamState('sort_mode');
  const [showSidebar, toggleSidebar] = useSidebarState();
  const isOffline = useOffline();

  const debouncedInput = useDebouncedValue(inputValue, 300);
  const searchUrl =
    API_URL + `?q=${debouncedInput}&page=${page}&per_page=${itemsPerPage}`;

  const { loading, data, error, pagination } = useRequest<
    Project[],
    ProjectWithOwner[]
  >(searchUrl, transformData);

  const projects = useMemo(() => {
    if (!data) {
      return;
    }

    if (!sortField) {
      return data;
    }

    const sign = sortMode === 'ASC' ? 1 : -1;

    return data.sort((projectA, projectB) => {
      const sortKey = sortField as 'name' | 'owner' | 'stars';
      if (projectA[sortKey] > projectB[sortKey]) {
        return 1 * sign;
      } else if (projectA[sortKey] < projectB[sortKey]) {
        return -1 * sign;
      } else {
        return 0;
      }
    });
  }, [data, sortField, sortMode]);

  console.log('isOffline', isOffline);

  if (error && !isOffline) {
    return (
      <Layout
        mainContent={
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box fontSize="xlarge" fontWeight="bold" marginBottom="small">
              Ooops, something went wrong!
            </Box>
            <Box fontSize="medium" fontWeight="bold">
              <a href="/">Click here to reload and try again.</a>
            </Box>
          </Flex>
        }
      />
    );
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
          {isOffline && !loading && !projects ? (
            <Box fontSize="large" fontWeight="bold" marginBottom="small">
              You have no internet connection, but you can try again with a
              search you&apos;ve done before! (We store search results for
              offline usage).
            </Box>
          ) : null}
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
                {projects.map((item, index) => {
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
          {pagination ? (
            <Box paddingTop="large">
              <Paginator
                pagination={pagination}
                currentPage={page}
                onPageChange={setPage}
              />
            </Box>
          ) : null}
        </Box>
      }
      sidebarContent={
        <Box>
          <Box marginBottom="medium">
            <Box marginBottom="xsmall" fontSize="large" fontWeight="bold">
              Items per page:
            </Box>
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
          <Box marginBottom="medium">
            <Box marginBottom="xsmall" fontSize="large" fontWeight="bold">
              Sort by:
            </Box>
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
          <Box marginBottom="medium">
            <Box marginBottom="xsmall" fontSize="large" fontWeight="bold">
              Sort mode:
            </Box>
            <Select
              value={sortMode}
              onChange={event => {
                setSortMode(event.target.value);
              }}
              options={[
                { value: 'ASC', label: 'Ascending' },
                { value: 'DESC', label: 'Descending' }
              ]}
            />
          </Box>
        </Box>
      }
    />
  );
};

export default App;
