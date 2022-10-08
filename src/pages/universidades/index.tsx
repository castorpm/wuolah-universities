import type { GetServerSideProps, NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { fetchUniversities } from 'api';
import Layout from 'components/Layout';
import UniversityList from 'components/universityIndex/UniversityList';
import { defaultPagination } from 'defaults';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(['universities'], () =>
    fetchUniversities(defaultPagination)
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      // This is a hack: view https://github.com/TanStack/query/issues/1458
    },
  };
};

const UniversityIndex: NextPage = () => (
  <>
    <Head>
      <title>Wuolah | Universidades</title>
      <meta
        name="description"
        content="Lista de universidades soportadas por Wuolah."
      />
    </Head>

    <Layout>
      <Heading as="h1" marginBottom={['24px', '48px']}>
        Universidades
      </Heading>
      <UniversityList />
    </Layout>
  </>
);

export default UniversityIndex;
