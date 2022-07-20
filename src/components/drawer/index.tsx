import * as React from 'react';
import {
  Stack,
  Wrap,
  WrapItem,
  Button,
  Avatar,
  Image,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const DrawerMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        m={['5px', '10px', '10px', '10px', '10px']}
        display={['flex', 'flex', 'flex', 'none', 'none']}
        bg="blackAlpha.200"
        ref={btnRef}
        onClick={onOpen}
        position="fixed"
        borderRadius="50%"
        w={['20px', '40px', '40px']}
        h={['40px', '40px', '40px']}
      >
        <HamburgerIcon
          fontSize={['25px', '32px', '32px', '40px', '40px']}
        />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent style={{ width: '64px' }}>
          <DrawerCloseButton />
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
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
