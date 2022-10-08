import type { University } from 'types';
import { Box } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import UniversityCard from './UniversityCard';
import { fetchUniversities } from 'api';
import { pagination } from 'defaults';

const UniversityList = () => {
  const { ref, inView } = useInView({
    rootMargin: '50px',
  });

  const fetchUniversitiesPaginated = ({ pageParam = pagination }) =>
    fetchUniversities(pageParam || pagination);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(['universities'], fetchUniversitiesPaginated, {
      getNextPageParam: (lastPage) => ({
        ...pagination,
        page: lastPage.meta.pagination.page + 1,
      }),
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Box marginBottom="50px">
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
                    <Box marginBottom="16px">
                      <UniversityCard university={university} />
                    </Box>
                  </a>
                </Link>
              ))}
            </Fragment>
          ))
        ) : (
          <>Cargando...</>
        )}
      </Box>
      {isFetchingNextPage && hasNextPage && <>Cargando...</>}
      <div ref={ref} />
    </Box>
  );
};

export default UniversityList;
