import type { University } from 'types';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import {
  EmailIcon,
  ExternalLinkIcon,
  PhoneIcon,
  TimeIcon,
} from '@chakra-ui/icons';
import Image from 'next/image';

interface ContactSectionProps {
  university: University;
}

const ContactSection = ({ university }: ContactSectionProps) => {
  const shortname = university.shortName
    ? university.shortName.toLowerCase()
    : 'universidad';
  const website = `www.${shortname}.es`;
  const email = `contacto@${shortname}.es`;

  return (
    <>
      <Heading as="h2" marginBottom="12px" fontSize="3xl">
        Contacto
      </Heading>
      <Grid
        templateColumns={['1fr', '1fr 400px']}
        rowGap={['16px', '0']}
        marginBottom="16px"
      >
        <GridItem>
          <List spacing="8px">
            <ListItem>
              <ListIcon as={ExternalLinkIcon} />{' '}
              <Link
                isExternal
                href={`https://${website}`}
                target="_blank"
                rel="noreferrer"
              >
                {website}
              </Link>
            </ListItem>
            <ListItem>
              <ListIcon as={EmailIcon} />{' '}
              <Link href={`mailto:${email}`} isExternal>
                {email}
              </Link>
            </ListItem>
            <ListItem>
              <ListIcon as={PhoneIcon} /> +34 123 456 789
            </ListItem>
            <ListItem>
              <ListIcon as={PhoneIcon} /> +34 987 654 321
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} /> 09:00 - 15:00
            </ListItem>
          </List>
        </GridItem>
        <GridItem>
          <Box position="relative" width="100%" height="300px">
            <Image
              src="/map-placeholder.jpg"
              layout="fill"
              objectFit="cover"
              alt="Mapa"
            />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default ContactSection;
