import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const CounterComponent = ({ isOpen, onClose, handleCountChange }) => {
    const [count, setCount] = useState(0);
    const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
    const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bg="#f7fafc" borderRadius="md" boxShadow="md">
                <ModalHeader bg="#2b8ab0" color="white" borderTopRadius="md" fontSize={"md"}>Passenger amount</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <Flex direction="row" align="center" justify="center">
                        <Text>Passenger</Text>
                        <Spacer />
                        <Button
                            onClick={() => {
                                if (count > 0) {
                                    setCount(count - 1);
                                    handleCountChange(count - 1);
                                }
                            }}
                            variant="outline"
                            colorScheme="black"
                            size="sm"
                            borderRadius="full"
                            m={2} >-
                        </Button>
                        <Text m={6}>{count}</Text>
                        <Button
                            onClick={() => {
                                setCount(count + 1);
                                handleCountChange(count + 1);
                            }}
                            variant="outline"
                            colorScheme="black"
                            size="sm"
                            borderRadius="full"
                            m={2} >+
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default CounterComponent;
