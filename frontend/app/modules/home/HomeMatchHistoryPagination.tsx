'use client';
import {alpha, Pagination, PaginationItem} from '@mui/material';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';

import React from 'react';

const HomeMatchHistoryPagination = ({meta}: {meta: Meta | undefined}) => {
  const searchParams = useSearchParams();

  const {total_pages} = meta || {};
  const page = Number(searchParams.get('offset')) || 0;

  return (
    <Pagination
      page={page + 1}
      count={total_pages}
      color="primary"
      variant="outlined"
      renderItem={(item) => {
        return (
          <PaginationItem
            component={Link}
            href={item.page ? `/?offset=${item.page - 1}` : ''}
            {...item}
          />
        );
      }}
      sx={{
        '& .MuiPaginationItem-root': {
          color: '#fff',
          borderColor: '#fff',
          '&:hover': {
            bgcolor: alpha('#fff', 0.6), // Background color on hover
            color: alpha('#fff', 0.6),
          },
          '& .MuiPagination-outlined': {
            color: '#fff',
          },
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: '#000',
            '&:hover': {
              bgcolor: 'primary.main',
            },
          },
        },
      }}
    />
  );
};

export default HomeMatchHistoryPagination;
