import React from 'react';
import Box from 'components/UI/Box';
import Flex from 'components/UI/Flex';
import { Pagination } from 'hooks/useRequest/types';
import PageButton from './PageButton.component';

type PaginatorProps = {
  pagination: Pagination;
  currentPage: string;
  onPageChange: (page: string) => void;
};

const Paginator: React.FC<PaginatorProps> = ({
  pagination,
  onPageChange,
  currentPage
}) => {
  return (
    <Flex
      backgroundColor="white"
      borderRadius={['0px', '6px']}
      boxShadow="5px 5px 16px 5px #9FB1BCCE"
      padding="medium"
      justifyContent="center"
      alignItems="center"
    >
      {pagination.prev ? (
        <PageButton
          onClick={() => {
            onPageChange(pagination.prev?.page as string);
          }}
          content="<"
        />
      ) : null}
      <Box paddingX="small">{currentPage}</Box>
      {pagination.prev ? (
        <PageButton
          onClick={() => {
            onPageChange(pagination.next?.page as string);
          }}
          content=">"
        />
      ) : null}
    </Flex>
  );
};

export default Paginator;
