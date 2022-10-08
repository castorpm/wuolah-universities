import type { GetServerSideProps } from 'next'
import type { University } from '../../types'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { fetchUniversities } from '../../api'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['universities'], fetchUniversities)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const UniversitiesIndex = () => {
  const { data, isError, isLoading } = useQuery(
    ['universities'],
    fetchUniversities
  )

  if (isError) return <>ERROR!</>
  if (isLoading) return <>LOADING...</>

  const universities: University[] = data.data

  return (
    <Flex justify="center" paddingTop="48px">
      <Box>
        <Heading as="h1" marginBottom="32px">
          Universidades
        </Heading>
        <Flex direction="column" rowGap="16px">
          {universities.map((university) => (
            <Flex
              key={university.slug}
              height="65px"
              align="center"
              columnGap="8px"
              padding="8px"
              border="1px solid black"
              borderRadius="8px"
              _hover={{
                cursor: 'pointer',
              }}
            >
              <div>
                <Image src={university.logoUrl} alt="" width={40} height={40} />
              </div>
              <div>{university.name}</div>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  )
}

export default UniversitiesIndex
