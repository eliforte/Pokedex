import React from 'react';
import {
  Grid,
  GridItem,
  Heading,
  Flex,
  Box,
} from '@chakra-ui/react';
import Sidebar from '../../components/sidebar';
import DrawerMenu from '../../components/drawer';
import Card from '../../components/card';
import EmptyList from '../../components/emptyList';

const PokedexPage: React.FC = () => {
  const newID = React.useId();
  const [pokedex, setPokedex] = React.useState([{
    name: '',
    image: '',
    type: '',
    id: 0,
  }]);

  const readSessionStorage = () => {
    const sessionStoragePokedex = sessionStorage.getItem('pokedex');
    if (sessionStoragePokedex) {
      setPokedex(JSON.parse(sessionStoragePokedex));
    }
  };

  React.useEffect(() => {
    readSessionStorage();
  }, []);

  return (
    <Flex h="100vh" flexDirection="column">
      <Box>
        <Sidebar />
        <DrawerMenu />
      </Box>
      <Grid
        templateColumns={['1fr', '1fr', '1fr', '1fr', '1fr']}
        gridTemplateColumns={
          [
            '1fr',
            '1fr',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
          ]
        }
        gridTemplateRows="repeat(3, 1fr)"
        justifyItems="center"
        maxW={['100%', '100%', '100%']}
        gridGap="16px"
        m={
          [
            '30px 30px',
            '30px 100px',
            '50px 30px',
            '25px 80px',
            '25px 200px',
          ]
        }
      >
        <GridItem
          colSpan={[1, 1, 2, 3, 3]}
          w={['100%', '100%', '100%', '100%', '100%']}
          margin="auto auto"
        >
          <Heading as="h1" size="xl">Pokemons capturados</Heading>
        </GridItem>
        {
          pokedex[0].name !== ''
            ? pokedex.map((pokemon) => (
              <GridItem
                key={`${newID}${pokemon.name}`}
                justifyItems="center"
                w={['100%', '100%', '100%', '100%', '100%']}
              >
                <Card pokemon={pokemon} />
              </GridItem>
            ))
            : <EmptyList />
        }
      </Grid>
    </Flex>
  );
};

export default PokedexPage;
