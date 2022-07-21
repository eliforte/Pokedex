/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { PokemonContext } from '../../context/pokemonContext';
import Sidebar from '../../components/sidebar';
import DrawerMenu from '../../components/drawer';
import Search from '../../components/search';
import Card from '../../components/card';

const Home: React.FC = () => {
  const { pokemonList } = React.useContext(PokemonContext);
  const newID = React.useId();

  return (
    <Flex bg="gray.100" h="100vh" flexDirection="column">
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
            '30px 50px',
            '30px 100px',
            '50px 30px',
            '0 80px',
            '25px 200px',
          ]
        }
      >
        <GridItem
          colSpan={[1, 1, 2, 3, 3]}
          w={['100%', '100%', '100%', '100%', '100%']}
          margin="auto auto"
        >
          <Search />
        </GridItem>
        {
          pokemonList.results.map((pokemon) => (
            <GridItem
              key={`${newID}${pokemon.name}`}
              justifyItems="center"
              w={['100%', '100%', '100%', '100%', '100%']}
            >
              <Card pokemon={pokemon} />
            </GridItem>
          ))
        }
      </Grid>
    </Flex>

  );
};

export default Home;
