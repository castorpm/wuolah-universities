import type { GetServerSideProps, NextPage } from 'next';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import Image from 'next/image';
import { fetchUniversity } from 'api';
import Layout from 'components/Layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['university', { slug: context.params!.slugUniversity!.toString() }],
    fetchUniversity
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const UniversityDetail: NextPage = (props) => {
  const router = useRouter();

  const { data: university } = useQuery(
    ['university', { slug: router.query.slugUniversity!.toString() }],
    fetchUniversity
  );

  return (
    <>
      <Head>
        <title>Wuolah | {university.name}</title>
        <meta name="description" content={university.name} />
      </Head>

      <Layout>
        <Box marginBottom="32px">
          <NextLink href="/universidades">
            <Link>
              <ChevronLeftIcon /> Volver a la lista
            </Link>
          </NextLink>
        </Box>
        <Flex justify="center" marginBottom="24px">
          <Image
            src={university.logoUrl}
            alt="Logo"
            width="80px"
            height="80px"
          />
        </Flex>
        <Heading as="h1" marginBottom="32px">
          {university.name}
        </Heading>
      </Layout>
    </>
  );
};

export default UniversityDetail;
