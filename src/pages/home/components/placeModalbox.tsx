import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box, Text } from "@chakra-ui/react";
import axios from "axios";

const places = [
    "Badulla",
    "Mahiyanganaya",
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Anuradhapura",
    "Polonnaruwa",
];

const PlaceAutocompleteModal = ({ isOpen, onClose, onPlaceSelect }) => {
    const [query, setQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        if (value) {
            const filtered = places.filter((place) =>
                place.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setFilteredSuggestions([]);
        onPlaceSelect(suggestion);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#f7fafc" borderRadius="md" boxShadow="md">
                <ModalHeader bg="#2b8ab0" color="white" borderTopRadius="md" fontSize={"md"}>Search Places</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody padding={5}>
                    <Input
                        placeholder="Search places..."
                        value={query}
                        onChange={handleInputChange}
                        mb={4}
                    />
                    {filteredSuggestions.length > 0 && (
                        <Box bg="white" border="1px solid #ccc" borderRadius="md" mt={2}>
                            {filteredSuggestions.map((suggestion, index) => (
                                <Text
                                    key={index}
                                    p={2}
                                    cursor="pointer"
                                    _hover={{ bg: "#e2e8f0" }}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </Text>
                            ))}
                        </Box>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PlaceAutocompleteModal;
