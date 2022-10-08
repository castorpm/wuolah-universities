import type { GetServerSideProps, NextPage } from 'next'
import type { University } from 'types'
import { Flex, Heading, Skeleton } from '@chakra-ui/react'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchUniversities } from 'api'
import Layout from 'components/Layout'
import UniversityCard from 'components/universityIndex/UniversityCard'

const pagination = {
  page: 0,
  pageSize: 3,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['universities'], () =>
    fetchUniversities(pagination)
  )
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const UniversityIndex: NextPage = () => {
  const router = useRouter()

  const { data } = useQuery(['universities'], () =>
    fetchUniversities(pagination)
  )

  let content
  if (!data) {
    content = [0, 1, 2].map((item) => <Skeleton key={item} height="65px" />)
  } else {
    const universities: University[] = data.data
    content = universities.map((university) => (
      <Link key={university.slug} href={`${router.route}/${university.slug}`}>
        <a>
          <UniversityCard university={university} />
        </a>
      </Link>
    ))
  }

  return (
    <>
      <Head>
        <title>Wuolah | Universidades</title>
        <meta
          name="description"
          content="Lista de universidades soportadas por Wuolah."
        />
      </Head>

      <Layout>
        <Heading as="h1" marginBottom="32px">
          Universidades
        </Heading>
        <Flex direction="column" rowGap="16px">
          {content}
        </Flex>
      </Layout>
    </>
  )
}

export default UniversityIndex
