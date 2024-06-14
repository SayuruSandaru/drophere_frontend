// CalendarComponent.tsx
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Center } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerStyles.css'; // Import your custom styles

const CalendarComponent = ({ isOpen, onClose, selectedDate, handleDateChange }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#f7fafc" borderRadius="md" boxShadow="md">
                <ModalHeader bg="#2b8ab0" color="white" borderTopRadius="md" fontSize={"md"}>Select a date</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <Center>
                        <div className="custom-datepicker">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                inline
                            />
                        </div>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CalendarComponent;
