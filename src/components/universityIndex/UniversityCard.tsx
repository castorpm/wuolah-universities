import type { University } from 'types';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';

interface UniversityCardProps {
  university: University;
}

const UniversityCard = ({ university }: UniversityCardProps) => (
  <Grid
    templateColumns="100px 1fr"
    columnGap="16px"
    boxShadow="base"
    rounded="md"
    bg="white"
    _hover={{
      cursor: 'pointer',
      boxShadow: 'xl',
    }}
  >
    <GridItem padding="8px">
      <Box position="relative" height="60px" padding="8px">
        <Image
          src={university.logoUrl}
          alt="Logo"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </GridItem>
    <GridItem display="flex" alignItems="center" padding="8px">
      <Text fontSize="lg" noOfLines={2}>
        {university.name}
      </Text>
    </GridItem>
  </Grid>
);

export default UniversityCard;
