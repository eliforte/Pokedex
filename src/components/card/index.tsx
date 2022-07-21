import * as React from 'react';
import {
  Image,
  Heading,
  Button,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';

interface IPokemonProps {
  pokemon: {
    name: string;
    image: string;
    type: string;
    id: number;
  },
}

const Card: React.FC<IPokemonProps> = (props: IPokemonProps) => {
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
        <Text color="white">
          #
          {addLeadingZeros(id, 3)}
        </Text>
        <Heading color="white" as="h3" size={['md', 'md', 'md', 'md', 'lg']}>{firstLetterToUpperCase(name)}</Heading>
        <Button bg="white" mt="24px">Capturar</Button>
      </Box>
      <Flex h="100%" alignItems="center" overflow="hidden">
        <Image
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
