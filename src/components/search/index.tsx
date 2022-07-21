/* eslint-disable react/no-children-prop */
import * as React from 'react';
import {
  Stack,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { PokemonContext } from '../../context/pokemonContext';

const Search = () => {
  const { searchPokemon } = React.useContext(PokemonContext);
  const [search, setSearch] = React.useState('');
  console.log(search, setSearch, searchPokemon);

  return (
    <Stack
      spacing={4}
      display={['flex', 'flex', 'flex', 'flex', 'flex']}
      flexDirection={['column', 'column', 'column', 'row', 'row']}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
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
        />
      </InputGroup>
    </Stack>
  );
};

export default Search;
