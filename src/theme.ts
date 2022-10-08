import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        color: 'blue.700',
      },
    },
    Spinner: {
      baseStyle: {
        color: 'blue.700',
      },
    },
  },
});

export default theme;
