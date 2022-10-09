import type { University } from 'types';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface UniversityCardProps {
  university: University;
}

const styleProps = {
  templateColumns: '80px 1fr 50px',
  columnGap: '16px',
  padding: '16px',
  rounded: 'md',
  bg: 'white',
  border: '1px',
  borderColor: 'gray.200',
  boxShadow: 'base',
  _hover: {
    cursor: 'pointer',
  },
};
const animationProps = {
  as: motion.div,
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: '0.5s' },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

const UniversityCard = ({ university }: UniversityCardProps) => (
  <Grid {...styleProps} {...animationProps}>
    <GridItem>
      <Box position="relative" height="80px">
        <Image
          src={university.logoUrl}
          alt="Logo"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </GridItem>
    <GridItem
      display="flex"
      alignItems="center"
      paddingLeft="16px"
      borderLeft="1px"
      borderLeftColor="gray.200"
    >
      <Box>
        <Text fontSize="lg" noOfLines={2} fontWeight="semibold">
          {university.name}
        </Text>
        <Text fontSize="sm" noOfLines={1} color="gray.700">
          {university.name}
        </Text>
      </Box>
    </GridItem>
    <GridItem display="flex" alignItems="center">
      <ChevronRightIcon width="30px" height="30px" color="blue.700" />
    </GridItem>
  </Grid>
);

export default UniversityCard;
