import type { University } from 'types';
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

interface InfoSectionProps {
  university: University;
}

const InfoSection = ({ university }: InfoSectionProps) => (
  <>
    <Heading as="h2" marginBottom="12px" fontSize="3xl">
      Información
    </Heading>
    <Grid
      gridTemplateColumns={['1fr', '2fr 1fr']}
      rowGap={['16px', '0']}
      alignItems="center"
    >
      <GridItem>
        <Text>
          Ut eu orci iaculis, vulputate mauris vitae, suscipit nisl. In sem leo,
          dignissim ut nisl ac, molestie malesuada nisi. Maecenas ultrices
          lobortis tellus, cursus suscipit ex faucibus quis. Nunc vestibulum mi
          sit amet nunc aliquam pretium.
        </Text>
      </GridItem>
      <GridItem>
        <Flex justify="center">
          <Box position="relative" width="100px" height="100px">
            <Image
              src={university.logoUrl}
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  </>
);

export default InfoSection;
