import type { GetServerSideProps, NextPage } from 'next';
import { ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Text } from '@chakra-ui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { fetchUniversities } from 'api';
import { defaultPagination } from 'defaults';
import Layout from 'components/Layout';
import UniversityList from 'components/universityIndex/UniversityList';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(['universities'], () =>
    fetchUniversities(defaultPagination)
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      // The stringify + parse is a hack: view https://github.com/TanStack/query/issues/1458
    },
  };
};

const UniversityIndex: NextPage = () => (
  <>
    <Head>
      <title>Wuolah | Universidades</title>
      <meta
        name="description"
        content="Lista de universidades contenidas en este directorio."
      />
    </Head>

    <Layout>
      <Box id="pageTop" />
      <Heading as="h1" marginBottom={['12px', '24px']}>
        Universidades
      </Heading>
      <Text marginBottom={['12px', '24px']}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a
        bibendum eros. Nullam id augue feugiat, lacinia neque ac, fermentum
        elit. In dolor libero, tempus a augue a, placerat ultrices nisi.
      </Text>

      <UniversityList />
    </Layout>

    <Link href="#pageTop">
      <Box position="fixed" bottom="20px" right="20px" zIndex={1}>
        <IconButton
          aria-label="Back to top"
          icon={<ChevronUpIcon boxSize="24px" />}
          isRound
        />
      </Box>
    </Link>
  </>
);

export default UniversityIndex;
