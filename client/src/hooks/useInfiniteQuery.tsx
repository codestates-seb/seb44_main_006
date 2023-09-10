import { useInfiniteQuery } from '@tanstack/react-query';

import { InfiniteScrollT } from '../types/apitype';

const useInfiniteScrollQuery = ({
  keyArr,
  queryFunc,
}: {
  keyArr: string[];
  queryFunc: ({
    pageParam,
  }: {
    pageParam?: number;
  }) => Promise<InfiniteScrollT>;
}) => {
  const {
    data,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery(keyArr, queryFunc, {
    getNextPageParam: (lastPage) => {
      return !lastPage.isLast ? lastPage.current_page + 1 : undefined;
    },
  });
  return {
    data,
    fetchNextPage,
    isSuccess,
    hasNextPage,
    error,
    isFetchingNextPage,
  };
};

export default useInfiniteScrollQuery;
