import * as React from 'react';
import {
  Stack, Wrap, WrapItem, Button, Avatar, Image,
} from '@chakra-ui/react';

const Sidebar: React.FC = () => {
  const oi = 'oi';
  console.log(oi);

  return (
    <Stack
      align="start"
      justifyContent="space-between"
      h="100vh"
      w="64px"
      position="fixed"
    >
      <WrapItem m="16px">
        <Image src="pokebolamenu.svg" alt="pokebolamenu" />
      </WrapItem>
      <Wrap spacing={2} align="start">
        <WrapItem>
          <Button ml="8px" type="button" h="48px" w="48px">
            <Image src="home.svg" alt="home" />
          </Button>
        </WrapItem>
        <WrapItem>
          <Button ml="8px" type="button" h="48px" w="48px">
            <Image src="pokebolaempty.svg" alt="pokebolaempty" />
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
