import type { GetServerSideProps, NextPage } from 'next'
import type { University } from 'types'
import { Flex, Heading } from '@chakra-ui/react'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchUniversities } from 'api'
import Layout from 'components/Layout'
import UniversityCard from 'components/universityIndex/UniversityCard'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['universities'], fetchUniversities)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const UniversityIndex: NextPage = () => {
  const router = useRouter()

  const { data } = useQuery(['universities'], fetchUniversities)

  const universities: University[] = data.data

  return (
    <Layout>
      <Heading as="h1" marginBottom="32px">
        Universidades
      </Heading>
      <Flex direction="column" rowGap="16px">
        {universities.map((university) => (
          <Link
            key={university.slug}
            href={`${router.route}/${university.slug}`}
          >
            <a>
              <UniversityCard university={university} />
            </a>
          </Link>
        ))}
      </Flex>
    </Layout>
  )
}

export default UniversityIndex
