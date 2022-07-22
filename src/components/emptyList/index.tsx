import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { useLocation, Link as ReactLink } from 'react-router-dom';

const EmptyList: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Box>
      <Image
        src="emptyfolder.svg"
        alt="nenhum pokemon encontrado"
        h={['100px', '100px', '115px', '130px', '150px']}
        w={['100px', '100px', '115px', '130px', '150px']}
      />
      <Heading as="h3" size="lg">
        Nenhum pokemon encontrado
      </Heading>
      {
        pathname === '/pokedex'
          ? (
            <Text>
              Capture pokemons,
              <Link fontStyle="bold" as={ReactLink} to="/" color="blue.400"> clique aqui.</Link>
            </Text>
          )
          : <Text>Verifique se digitou corretamente</Text>
      }
    </Box>
  );
};

export default EmptyList;
