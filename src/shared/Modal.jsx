import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const CustomModal = ({
  isOpen,
  onOpen,
  onClose,
  title,
  children,
  okTxt,
  cancelTxt = "Cancel",
  onOkClick,
  isLoading,
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        bg="blackAlpha.500"
        backdropFilter="blur(5px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            {cancelTxt}
          </Button>
          <Button colorScheme="blue" onClick={onOkClick} isLoading={isLoading}>
            {okTxt}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
