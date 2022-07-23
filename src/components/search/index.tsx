/* eslint-disable react/no-children-prop */
import * as React from 'react';
import {
  Stack,
  Heading,
  InputGroup,
  Input,
  Text,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { SearchIcon } from '@chakra-ui/icons';
import { PokemonContext } from '../../context/pokemonContext';

const Search = () => {
  const {
    setPokemonList,
    pokemonList,
    setError,
    setIsLoading,
    search,
    setSearch,
    firstRenderPokemons,
  } = React.useContext(PokemonContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!search.length) {
        setIsLoading(true);
        firstRenderPokemons();
        setIsLoading(false);
      } else {
        const urlForSearch = `https://pokeapi.co/api/v2/pokemon/${search}`;
        const {
          data: {
            sprites,
            types,
            name,
            id,
          },
        } = await axios.get(urlForSearch);
        const type = types[0].type.name;
        const image = sprites.other['official-artwork'].front_default;
        setPokemonList({
          ...pokemonList,
          results: [{
            name,
            image,
            type,
            id,
          }],
        });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  const onDeleteSearchText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!search.length && e.key === 'Backspace') {
      setIsLoading(true);
      firstRenderPokemons();
      setIsLoading(false);
    }
  };

  return (
    <Stack
      spacing={4}
      display={['flex', 'flex', 'flex', 'flex', 'flex']}
      flexDirection={['column', 'column', 'column', 'row', 'row']}
      justifyContent="space-between"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Flex alignItems="flex-end">
          <Heading
            mr="32px"
            mt="10px"
            color="gray.800"
          >
            Pokédex
          </Heading>
          <InputGroup justifyContent="flex-start">
            <InputLeftElement
              pointerEvents="none"
              fontSize="1.2em"
              children={<SearchIcon color="gray.400" />}
            />
            <Input
              placeholder="Buscar pokemon pelo nome..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              justifyContent="center"
              w={['100%', '100%', '100%', 'md', 'md']}
              bg="gray.100"
              onKeyUp={(e) => onDeleteSearchText(e)}
            />
          </InputGroup>
        </Flex>
      </form>
      <Text
        fontWeight="500"
        color="gray.500"
      >
        {`${pokemonList.results.length} de ${pokemonList.count}`}
      </Text>
    </Stack>
  );
};

export default Search;
