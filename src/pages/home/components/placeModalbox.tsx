import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    Box,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

interface PlaceAutocompleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPlaceSelect: (place: string) => void;
}

interface PlacePrediction {
    description: string;
    place_id: string;
}

const PlaceAutocompleteModal: React.FC<PlaceAutocompleteModalProps> = ({ isOpen, onClose, onPlaceSelect }) => {
    const [query, setQuery] = useState<string>("");
    const [filteredSuggestions, setFilteredSuggestions] = useState<PlacePrediction[]>([]);
    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDPVTj_4pkQwV9t2ylExQpFixYFsFd55ac',
        libraries
    });

    useEffect(() => {
        if (isLoaded && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
    }, [isLoaded]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        if (value && autocompleteService.current) {
            autocompleteService.current.getPlacePredictions(
                { 
                    input: value, 
                    componentRestrictions: { country: 'LK' } 
                }, 
                (predictions, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                        setFilteredSuggestions(predictions);
                    } else {
                        setFilteredSuggestions([]);
                    }
                }
            );
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: PlacePrediction) => {
        setQuery(suggestion.description);
        setFilteredSuggestions([]);
        onPlaceSelect(suggestion.description); 
        onClose();
    };

    if (!isLoaded) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#f7fafc" borderRadius="md" boxShadow="md">
                    <ModalHeader bg="#2b8ab0" color="white" borderTopRadius="md" fontSize="md">
                        Search Places
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody padding={5} textAlign="center">
                        <Spinner size="lg" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#f7fafc" borderRadius="md" boxShadow="md">
                <ModalHeader bg="#2b8ab0" color="white" borderTopRadius="md" fontSize="md">
                    Search Places
                </ModalHeader>
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
                            {filteredSuggestions.map((suggestion) => (
                                <Text
                                    key={suggestion.place_id}
                                    p={2}
                                    cursor="pointer"
                                    _hover={{ bg: "#e2e8f0" }}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.description}
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
