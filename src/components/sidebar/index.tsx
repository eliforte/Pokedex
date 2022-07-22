import * as React from 'react';
import {
  Stack, Wrap, WrapItem, Button, Avatar, Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const Navegate = useNavigate();

  return (
    <Stack
      display={['none', 'none', 'none', 'flex', 'flex']}
      align="start"
      justifyContent="space-between"
      h="100vh"
      w="64px"
      position="fixed"
      bg="white"
    >
      <WrapItem m="16px">
        <Image
          src="pokebolamenu.svg"
          alt="pokebolamenu"
          h={{ base: '32px', md: '40px' }}
          w={{ base: '32px', md: '40px' }}
        />
      </WrapItem>
      <Wrap spacing={3} align="start">
        <WrapItem>
          <Button
            ml="8px"
            type="button"
            onClick={() => Navegate('/')}
            h={{ base: '48px', sm: '48px' }}
            w={{ base: '48px', sm: '48px' }}
          >
            <Image
              w={{ base: '48px', sm: '40px' }}
              h={{ base: '49px', sm: '40px' }}
              src="home.svg"
              alt="home"
            />
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            ml="8px"
            type="button"
            onClick={() => Navegate('/pokedex')}
            h={{ base: '48px', sm: '48px' }}
            w={{ base: '48px', sm: '48px' }}
          >
            <Image
              w={{ base: '48px', sm: '40px' }}
              h={{ base: '49px', sm: '40px' }}
              src="pokebolaempty.svg"
              alt="pokebolaempty"
            />
          </Button>
        </WrapItem>
      </Wrap>
      <WrapItem>
        <Avatar m="8px" name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
      </WrapItem>
    </Stack>
  );
};

export default Sidebar;
