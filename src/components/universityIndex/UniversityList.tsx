import type { University } from 'types';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchUniversities } from 'api';
import { defaultPagination } from 'defaults';
import UniversityCard from './UniversityCard';

const UniversityList = () => {
  const { ref, inView } = useInView({
    rootMargin: '250px',
  });

  const fetchUniversitiesPaginated = ({ pageParam = 0 }) =>
    fetchUniversities({
      ...defaultPagination,
      page: pageParam || defaultPagination.page,
    });

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(['universities'], fetchUniversitiesPaginated, {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length === 0) return undefined;
        return lastPage.meta.pagination.page + 1;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Box>
      <Box>
        {data ? (
          data.pages.map((page, index) => (
            <Fragment key={`page-${index}`}>
              {page.data.map((university: University) => (
                <Link
                  key={university.slug}
                  href={`/universidades/${university.slug}`}
                >
                  <a>
                    <Box marginBottom={['16px', '24px']}>
                      <UniversityCard university={university} />
                    </Box>
                  </a>
                </Link>
              ))}
            </Fragment>
          ))
        ) : (
          <Spinner />
        )}
        <div ref={ref} />
      </Box>
      {hasNextPage && (
        <Flex justify="center" height="60px" paddingTop="12px">
          {isFetchingNextPage && <Spinner />}
        </Flex>
      )}
    </Box>
  );
};

export default UniversityList;
