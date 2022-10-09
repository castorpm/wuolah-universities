import type { GetServerSideProps, NextPage } from 'next';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import { fetchUniversity } from 'api';
import Layout from 'components/Layout';
import ContactSection from 'components/universityDetail/ContactSection';
import InfoSection from 'components/universityDetail/InfoSection';

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

const UniversityDetail: NextPage = () => {
  const router = useRouter();

  const { data: university } = useQuery(
    ['university', { slug: router.query.slugUniversity!.toString() }],
    fetchUniversity
  );

  if (!university) return <Error statusCode={404} />;

  return (
    <>
      <Head>
        <title>Wuolah | Universidades | {university.name}</title>
        <meta
          name="description"
          content={`Página de directorio para ${university.name}`}
        />
      </Head>

      <Layout>
        <Box marginBottom="32px">
          <NextLink href="/universidades" passHref>
            <Link>
              <ChevronLeftIcon /> Volver a la lista
            </Link>
          </NextLink>
        </Box>

        <Box marginBottom="32px">
          <Heading as="h1" marginBottom="12px">
            {university.name}
          </Heading>
          <Text fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a
            bibendum eros. Nullam id augue feugiat, lacinia neque ac, fermentum
            elit. In dolor libero, tempus a augue a, placerat ultrices nisi.
          </Text>
        </Box>

        <Box as="section" marginBottom="32px">
          <InfoSection university={university} />
        </Box>

        <Box as="section">
          <ContactSection university={university} />
        </Box>
      </Layout>
    </>
  );
};

export default UniversityDetail;
