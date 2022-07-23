import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  Button,
  SimpleGrid,
  Image,
  Progress,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import DrawerMenu from '../../components/drawer';
import { PokemonContext } from '../../context/pokemonContext';

const Details: React.FC = () => {
  const { getPokemonDetails, pokemon } = React.useContext(PokemonContext);
  const [statsOrAbout, setStatsOrAbout] = React.useState('about');
  const tableLines = [
    'HP',
    'Ataque',
    'Defensa',
    'Velocidade',
    'Ata. especial',
    'Def. especial',
    'Velocidade',
    'Total',
  ];
  const {
    name,
    image,
    type,
    description,
    height,
    weight,
    abilities,
    stats,
    total,
    // evolutions,
  } = pokemon;
  const { id } = useParams();

  const firstLetterToUpperCase = (str: string) => {
    const newText = str ? str[0].toLocaleUpperCase() + str.slice(1) : '';
    return newText;
  };

  const calculateMax = (stat: number, index: number): number => {
    if (index === 0) {
      return Math.floor(((2 * stat + 31 + 63) * 100) / 100 + 100 + 10);
    }
    return Math.floor(
      Math.floor(
        ((2 * stat + 31 + 63) * 100) / 100 + 5,
      ) * 1.1,
    );
  };

  const calculateMin = (stat: number, index: number): number => {
    if (index === 0) {
      return Math.floor(((2 * stat) * 100) / 100 + (100 + 10));
    }

    return Math.floor(
      Math.floor(
        ((2 * stat) * 100) / 100 + 5,
      ) * 0.9,
    );
  };

  const calculateProgressBar = (stat: number, index: number): number => {
    const max = calculateMax(stat, index);
    return Math.floor((stat * 100) / max);
  };

  const addLeadingZeros = (num: number | undefined, totalLength: number) => String(num).padStart(totalLength, '0');

  const tableAbout = () => (
    <SimpleGrid
      p="20px"
      m="auto auto"
      ml="30px"
      columns={2}
      spacing={['10px', '10px', '10px', '10px']}
      w={['90%', '100%']}
    >
      <Box fontWeight="600">Altura</Box>
      <Box color="gray.600">{ height }</Box>
      <Box fontWeight="600">Peso</Box>
      <Box color="gray.600">{ weight }</Box>
      <Box fontWeight="600">Categoria</Box>
      <Box color="gray.600">{ type }</Box>
      <Box fontWeight="600">Habilidades</Box>
      <Box color="gray.600">{ abilities }</Box>
    </SimpleGrid>
  );

  const tableStats = () => (
    <Grid
      templateColumns="1fr 1fr 1fr 1fr 1fr"
      alignItems="center"
      gap={[1, 3]}
      p="20px"
    >
      {
        stats.map((stat: any, index) => (
          <>
            <GridItem fontWeight="600" w="150px">
              <Text>{tableLines[index]}</Text>
            </GridItem>
            <GridItem color="gray.600">
              <Text>{stat.base_stat}</Text>
            </GridItem>
            <GridItem>
              <Progress border="1px solid #CBD5E0" backgroundColor="white" colorScheme="green" value={calculateProgressBar(stat.base_stat, index)} />
            </GridItem>
            <GridItem color="gray.600">
              <Text>
                { calculateMin(stat.base_stat, index) }
              </Text>
            </GridItem>
            <GridItem color="gray.600">
              <Text>
                { calculateMax(stat.base_stat, index) }
              </Text>
            </GridItem>
          </>
        ))
      }
      <GridItem color="gray.600" fontWeight="600">
        <Text>Total</Text>
      </GridItem>
      <GridItem color="gray.600" fontWeight="600">
        <Text>{ total }</Text>
      </GridItem>
      <GridItem color="gray.600" fontWeight="600" />
      <GridItem color="gray.600" fontWeight="600">
        <Text>Min</Text>
      </GridItem>
      <GridItem color="gray.600" fontWeight="600">
        <Text>Max</Text>
      </GridItem>
    </Grid>
  );

  React.useEffect(() => {
    getPokemonDetails(id);
  }, []);

  return (
    <Flex
      h="100vh"
      w="100%"
    >
      <Box>
        <Sidebar />
        <DrawerMenu />
      </Box>
      <Grid
        gridTemplateAreas={`"infos image"
        "buttons background"
        "table background"
        `}
        m={['40px 40px', '40px 60px', '40px 60px', '5% 130px']}
        w="100%"
      >
        <GridItem area="infos" w={['100vw', '90vw']}>
          <Text color="gray.600">
            #
            {addLeadingZeros(Number(id), 3)}
          </Text>
          <Heading color={type} mb="20px" as="h1" size="xl">{ firstLetterToUpperCase(name) }</Heading>
          <Text color="gray.600">
            { description }
          </Text>
          <Button size="lg" backgroundColor="gray.300" m="20px 0">Capturar</Button>
        </GridItem>
        <GridItem
          mt={['170px', '70px', '200px', '150px', '20px']}
          mb={['30px', '30px', '0', '20px', '20px']}
          area="buttons"
        >
          <Button
            mr="10px"
            backgroundColor={statsOrAbout === 'about' ? type : 'trasparent'}
            color={statsOrAbout === 'about' ? 'white' : 'gray.600'}
            borderRadius="30px"
            onClick={() => setStatsOrAbout('about')}
          >
            Sobre
          </Button>
          <Button
            backgroundColor={statsOrAbout !== 'about' ? type : 'trasparent'}
            color={statsOrAbout !== 'about' ? 'white' : 'gray.600'}
            borderRadius="30px"
            onClick={() => setStatsOrAbout('stats')}
          >
            Estatísticas
          </Button>
        </GridItem>
        <GridItem
          w={['100vw', '500px', '500px', '500px', '550px']}
          h={statsOrAbout === 'about' ? '220px' : '300px'}
          backgroundColor="#ffffff30"
          border="1px solid #CBD5E0"
          borderRadius="10px"
          area="table"
          alignItems="center"
        >
          {
            statsOrAbout === 'about'
              ? tableAbout()
              : tableStats()
          }
        </GridItem>
        <GridItem area="image">
          <Image
            position={['absolute', 'absolute', 'fixed', 'fixed', 'absolute']}
            m={['0', '0', '0', '100px 0', 'auto auto']}
            right={['0', '20px', '50px', '50px', '100px']}
            top={['190px', '150px', '200px', '70px', '100px']}
            w={['170px', '150px', '250px', '300px', '400px']}
            h={['170px', '150px', '250px', '300px', '400px']}
            src={image}
            alt={name}
          />
        </GridItem>
      </Grid>
      <Image
        h={['40%', '50%', '50%', '60%', '70%']}
        bottom="0"
        right="0"
        position="fixed"
        src="circuloopaco.svg"
        alt="circulo de background"
        zIndex={-1}
      />
      <Image
        h={['30%', '40%', '40%', '50%', '60%']}
        bottom="0"
        right="0"
        position="fixed"
        src="circulo.svg"
        alt="circulo de background"
        zIndex={-1}
      />
    </Flex>
  );
};

export default Details;
