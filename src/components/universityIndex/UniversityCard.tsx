import type { University } from 'types';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface UniversityCardProps {
  university: University;
}

const cardStyleProps = {
  templateColumns: ['80px 1fr', '80px 1fr 50px'],
  columnGap: ['8px', '16px'],
  padding: ['8px', '16px'],
  rounded: 'md',
  bg: 'white',
  border: '1px',
  borderColor: 'gray.200',
  boxShadow: 'base',
  _hover: {
    cursor: 'pointer',
  },
};
const cardAnimationProps = {
  as: motion.div,
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: '0.5s' },
};

const cardVariants = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};
const chevronVariants = {
  rest: {
    opacity: 0,
    transition: {
      duration: '0.5s',
    },
  },
  hover: {
    opacity: 1,
  },
};

const UniversityCard = ({ university }: UniversityCardProps) => (
  <Grid
    {...cardStyleProps}
    {...cardAnimationProps}
    variants={cardVariants}
    initial="rest"
    whileHover="hover"
    whileTap="tap"
  >
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
      paddingLeft={['8px', '16px']}
      borderLeft="1px"
      borderLeftColor="gray.200"
    >
      <Box>
        <Text fontSize={['sm', 'lg']} noOfLines={2} fontWeight="semibold">
          {university.name}
        </Text>
        <Text fontSize={['xs', 'sm']} noOfLines={[2, 1]} color="gray.700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </Box>
    </GridItem>

    <GridItem display={['none', 'flex']} alignItems="center">
      <Box as={motion.div} variants={chevronVariants}>
        <ChevronRightIcon width="30px" height="30px" color="blue.700" />
      </Box>
    </GridItem>
  </Grid>
);

export default UniversityCard;
