import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { GetCommunityList } from '../apis/api';

const useInfiniteScrollQuery = ({
  limit,
  sort,
  tagName,
}: {
  limit: number;
  sort?: string | undefined;
  tagName?: string | undefined;
}) => {
  const { data, fetchNextPage, isSuccess, hasNextPage } = useInfiniteQuery(
    ['community', tagName, sort],
    ({ pageParam = 1 }) =>
      GetCommunityList({ pageParam, limit, sort, tagName }),
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.isLast ? lastPage.current_page + 1 : undefined;
      },
    }
  );
  return { data, fetchNextPage, isSuccess, hasNextPage };
};

export default useInfiniteScrollQuery;
