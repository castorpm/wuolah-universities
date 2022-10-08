import type { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <Flex justify="center" paddingTop="48px">
    <Box>{children}</Box>
  </Flex>
)

export default Layout
