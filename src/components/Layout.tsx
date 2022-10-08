import type { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <Box>
    <Container maxWidth="2xl" paddingTop={['24px', '48px']}>
      <Box>{children}</Box>
    </Container>
  </Box>
);

export default Layout;
