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

  const addLeadingZeros = (num: number, totalLength: number) => String(num).padStart(totalLength, '0');

  const firstLetterToUpperCase = (str: string) => {
    const newText = str ? str[0].toLocaleUpperCase() + str.slice(1) : '';
    return newText;
  };

  const catchPokemon = () => {
    const sessionStoragePokedex = sessionStorage.getItem('pokedex');
    if (sessionStoragePokedex) {
      const pokedex = JSON.parse(sessionStoragePokedex);
      pokedex.push(pokemon);
      sessionStorage.setItem('pokedex', JSON.stringify(pokedex));
    }
  };

  const releasePokemon = () => {
    const sessionStoragePokedex = sessionStorage.getItem('pokedex');
    if (sessionStoragePokedex) {
      const parsedPokedex = JSON.parse(sessionStoragePokedex);
      const newPokedex = parsedPokedex.filter((pok: any) => pok.id !== id);
      sessionStorage.setItem('pokedex', JSON.stringify(newPokedex));
    }
  };

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
    } else {
      catchPokemon();
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
            {addLeadingZeros(id, 3)}
          </Text>
          <Heading color="white" as="h3" size={['md', 'md', 'md', 'md', 'lg']}>
            {firstLetterToUpperCase(name)}
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
