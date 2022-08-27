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

const CustomModal = (props) => {
  const {
    header,
    children,
    isOpen,
    onClose,
    closeText,
    secRemove,
    secText,
    secAction,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {closeText ?? "Close"}
          </Button>
          {!secRemove ? (
            <Button colorScheme="yellow" variant="ghost" onClick={secAction}>
              {secText ?? "Secondary Action"}
            </Button>
          ) : (
            ""
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
