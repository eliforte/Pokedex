import React from 'react';
import {
  Flex,
  Image,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { useLocation, Link as ReactLink } from 'react-router-dom';

const EmptyList: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt="70px"
    >
      <Image
        src="emptyfolder.svg"
        alt="nenhum pokemon encontrado"
        h={['100px', '100px', '115px', '130px', '130px']}
        w={['100px', '100px', '115px', '130px', '130px']}
        mb="20px"
      />
      <Heading mb="10px" as="h3" size={['md', 'md', 'md', 'md', 'md']}>
        Nenhum pokemon encontrado
      </Heading>
      {
        pathname === '/pokedex'
          ? (
            <Text color="gray.400" mb="20px">
              Capture pokemons,
              <Link fontWeight="600" as={ReactLink} to="/" color="#3182CE"> clique aqui.</Link>
            </Text>
          )
          : <Text color="gray.400" mb="20px">Verifique se digitou corretamente</Text>
      }
    </Flex>
  );
};

export default EmptyList;
