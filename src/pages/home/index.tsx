import * as React from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { PokemonContext } from '../../context/pokemonContext';
import Sidebar from '../../components/sidebar';
import DrawerMenu from '../../components/drawer';
import Search from '../../components/search';
import Card from '../../components/card';
import EmptyList from '../../components/emptyList';

const Home: React.FC = () => {
  const {
    pokemonList,
    isLoading,
    getPokemons,
    error,
  } = React.useContext(PokemonContext);
  const newID = React.useId();

  const handleScroll = (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1
      > e.target.documentElement.scrollHeight && !isLoading && pokemonList.next
    ) {
      getPokemons(pokemonList.next);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', (e: any) => handleScroll(e));
    sessionStorage.setItem('pokedex', JSON.stringify([]));
  }, [pokemonList]);

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
          <Search />
        </GridItem>
        {
          !error ? pokemonList.results.map((pokemon) => (
            <GridItem
              key={`${newID}${pokemon.name}`}
              justifyItems="center"
              w={['100%', '100%', '100%', '100%', '100%']}
            >
              <Card pokemon={pokemon} id={pokemon.id} />
            </GridItem>
          )) : (
            <GridItem
              colSpan={[2, 2, 3, 3, 3]}
            >
              <EmptyList />
            </GridItem>
          )
        }
      </Grid>
    </Flex>
  );
};

export default Home;
