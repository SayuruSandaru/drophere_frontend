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
    onAddPaymentMethod: (paymentDetails: PaymentDetails) => void; // New callback prop
}

interface PaymentDetails {
    cardNumber: string;
    cardholderName: string;
    expirationDate: string;
    cvv: string;
}

class RespModal extends React.Component<RespModalProps> {
    state = {
        cardNumber: '',
        cardholderName: '',
        expirationDate: '',
        cvv: ''
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleAddPaymentMethod = () => {
        const { cardNumber, cardholderName, expirationDate, cvv } = this.state;
        const paymentDetails = { cardNumber, cardholderName, expirationDate, cvv };
        this.props.onAddPaymentMethod(paymentDetails);
        this.props.onCloseModal();
    };

    render() {
        const { hasOpen, onCloseModal } = this.props;
        const { cardNumber, cardholderName, expirationDate, cvv } = this.state;

        return (
            <Modal isOpen={hasOpen} onClose={onCloseModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text size='xl' mt={5} mb={5} fontWeight="bold">Add credit or debit card</Text>
                        <FormControl isRequired>
                            <FormLabel fontSize="sm" color={"gray.600"}>Card Number</FormLabel>
                            <Input
                                type='text'
                                placeholder='Card Number'
                                maxLength={16}
                                name="cardNumber"
                                value={cardNumber}
                                onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel fontSize="sm" color={"gray.600"}>Cardholder Name</FormLabel>
                            <Input
                                type='text'
                                placeholder='Enter Cardholder Name'
                                name="cardholderName"
                                value={cardholderName}
                                onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <Flex mt={4}>
                            <FormControl isRequired mr={2}>
                                <FormLabel fontSize="sm" color={"gray.600"}>Expiration date</FormLabel>
                                <Input
                                    type='text'
                                    placeholder='MM/YY'
                                    maxLength={5}
                                    name="expirationDate"
                                    value={expirationDate}
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                            <FormControl isRequired ml={2}>
                                <FormLabel fontSize="sm" color={"gray.600"}>CVV</FormLabel>
                                <Input
                                    type='text'
                                    placeholder='CVV'
                                    maxLength={3}
                                    name="cvv"
                                    value={cvv}
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                        </Flex>
                        <Button
                            bg="#2b8ab0"
                            type='submit'
                            width='full'
                            mt={5}
                            mb={4}
                            color={'white'}
                            onClick={this.handleAddPaymentMethod}
                        >
                            Add payment method
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }
}

export default RespModal;
