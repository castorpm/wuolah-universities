import type { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const animationProps = {
  as: motion.div,
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: '1s',
  },
};

const Layout = ({ children }: LayoutProps) => (
  <Container {...animationProps} maxWidth="2xl" paddingTop={['32px', '48px']}>
    <Box>{children}</Box>
  </Container>
);

export default Layout;
