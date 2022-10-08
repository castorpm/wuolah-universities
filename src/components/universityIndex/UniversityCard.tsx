import type { University } from 'types'
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'

interface UniversityCardProps {
  university: University
}

const UniversityCard = ({ university }: UniversityCardProps) => (
  <Flex
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
    <Box>
      <Image src={university.logoUrl} alt="Logo" width="40px" height="40px" />
    </Box>
    <Box>{university.name}</Box>
  </Flex>
)

export default UniversityCard
