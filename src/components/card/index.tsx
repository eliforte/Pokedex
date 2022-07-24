import * as React from 'react';
import {
  Image,
  Heading,
  Flex,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IPokemonProps } from '../../interfaces';
import useFirstLetterToUpperCase from '../../hooks/useFirstLetterToUpperCase';
import useAddLeadingZeros from '../../hooks/useAddLeadingZeros';
import useCatchPokemon from '../../hooks/useCatchPokemon';
import useReleasePokemon from '../../hooks/useReleasePokemon';

const Card: React.FC<IPokemonProps> = (props: IPokemonProps) => {
  const [textButton, setTextButton] = React.useState('Capturar');
  const [catched, setCatched] = React.useState(false);
  const { pokemon } = props;
  const {
    name,
    image,
    type,
    id,
  } = pokemon;
  const releasePokemon = useReleasePokemon(id);

  const pokemonIsCatched = () => {
    const sessionStoragePokedex = sessionStorage.getItem('pokedex');
    if (sessionStoragePokedex) {
      const parsedPokedex = JSON.parse(sessionStoragePokedex);
      const isCatched = parsedPokedex.find((pok: any) => pok.id === id);
      if (isCatched) {
        setTextButton('Soltar');
        setCatched(true);
      }
    }
  };

  const handleClick = () => {
    if (catched) {
      releasePokemon();
      setTextButton('Capturar');
      setCatched(false);
    } else {
      setCatched(true);
      useCatchPokemon(pokemon);
      setTextButton('Soltar');
    }
  };

  React.useEffect(() => {
    pokemonIsCatched();
  }, [pokemonIsCatched, catched]);

  return (
    <Flex
      w="100%"
      h="100%"
      bg={type}
      borderRadius="16px"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
    >
      <Box m="0 16px">
        <Link to={`/${id}`}>
          <Text color="white">
            #
            {useAddLeadingZeros(id, 3)}
          </Text>
          <Heading color="white" as="h3" size={['md', 'md', 'md', 'md', 'lg']}>
            {useFirstLetterToUpperCase(name)}
          </Heading>
        </Link>
        <Button onClick={() => handleClick()} bg="white" mt="24px">{ textButton }</Button>
      </Box>
      <Flex w="100%" h="100%" justifyContent="flex-end" alignItems="flex-start" overflow="hidden">
        <Image
          mt="30px"
          position="absolute"
          zIndex={1}
          h={['100px', '100px', '115px', '130px', '150px']}
          src={image}
          alt={name}
        />
        <Image
          overflow="hidden"
          h="100%"
          src="pokebolacard.svg"
          alt="pokebolacard"
        />
      </Flex>
    </Flex>
  );
};

export default Card;
