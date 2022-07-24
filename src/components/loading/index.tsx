import React from 'react';
import {
  Image, ModalOverlay, Modal, useDisclosure,
} from '@chakra-ui/react';

interface ILoading {
  loading: boolean;
}

const Loading: React.FC<ILoading> = ({ loading }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  React.useEffect(() => {
    if (loading) {
      onOpen();
    } else {
      onClose();
    }
  }, [loading]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        backdropFilter="blur(1px)"
      >
        <Image
          display={!loading ? 'block' : 'none'}
          src="pikachurunning.gif"
          alt="pikachu"
          width="100px"
          height="70px"
          position="fixed"
          top="50%"
          left="50%"
          zIndex={1}
        />
      </ModalOverlay>
    </Modal>
  );
};

export default Loading;
