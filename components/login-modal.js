import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const LoginModal = (props) => {
  const { isOpen, action, onClose } = props;
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please login before continuing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>You are not logged in....</p>
          <p>Press below button to navigate to login page</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={action}>
            To Login...
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
