import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";

const CounterComponent = ({ isOpen, onClose, handleCountChange }) => {
    const [count, setCount] = useState(0);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#f7fafc" borderRadius="md" boxShadow="md">
                <ModalHeader bg="#2b8ab0" color="white" borderTopRadius="md" fontSize={"md"}>Passanger amount</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <Flex direction="row" align="center" justify="center">
                        <Text>Passanger</Text>
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