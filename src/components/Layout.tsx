import type { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <Box
    as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: '1s',
    }}
  >
    <Container maxWidth="2xl" paddingTop={['24px', '48px']}>
      <Box>{children}</Box>
    </Container>
  </Box>
);

export default Layout;
