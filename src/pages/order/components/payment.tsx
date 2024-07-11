import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    Text,
    FormLabel,
    Flex,
} from '@chakra-ui/react';
import './payment.css';

interface RespModalProps {
    hasOpen: boolean;
    onCloseModal: () => void;
}

class RespModal extends React.Component<RespModalProps> {

    render() {
        const { hasOpen, onCloseModal } = this.props;

        return (
            <Modal isOpen={hasOpen} onClose={onCloseModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text size='xl' mt={5} mb={5} fontWeight="bold">Add credit or debit card</Text>
                        <FormControl isRequired>
                            <FormLabel fontSize="sm" color={"gray.600"}>Card Number</FormLabel>
                            <Input type='text' placeholder='Card Number' maxLength={16} />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel fontSize="sm" color={"gray.600"}>Cardholder Name</FormLabel>
                            <Input type='text' placeholder='Enter Cardholder Name' />
                        </FormControl>
                        <Flex mt={4}>
                            <FormControl isRequired mr={2}>
                                <FormLabel fontSize="sm" color={"gray.600"}>Expiration date</FormLabel>
                                <Input type='text' placeholder='MM/YY' maxLength={5} />
                            </FormControl>
                            <FormControl isRequired ml={2}>
                                <FormLabel fontSize="sm" color={"gray.600"}>CVV</FormLabel>
                                <Input type='text' placeholder='CVV' maxLength={3} />
                            </FormControl>
                        </Flex>
                        <Button bg="#2b8ab0" type='submit' width='full' mt={5} mb={4} color={'white'} onClick={onCloseModal}>
                            Add Payment Details
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }
}

export default RespModal;