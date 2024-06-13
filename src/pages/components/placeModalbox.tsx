import React, { useRef, useState } from "react";
import { GoogleMap, LoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, Input, Box, Text } from "@chakra-ui/react";

const libraries: Libraries = ["places"]; // Specify libraries to load in the LoadScript component

const PlaceAutocompleteModal = ({ isOpen, onClose, onPlaceSelect }) => {
    const [query, setQuery] = useState("");
    const autocompleteRef = useRef(null);

    const handleLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        onPlaceSelect(place.name); // Assuming you want to use the place name
        setQuery(place.name);
        onClose();
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyDPVTj_4pkQwV9t2ylExQpFixYFsFd55ac" libraries={libraries}>
            <Modal isOpen={isOpen} onClose={onClose} > // Use `sx` for styling
                <ModalOverlay />
                <ModalContent bg="#f7fafc" borderRadius="md" boxShadow="md" sx={{ position: 'relative', zIndex: 1050 }}>
                    <ModalHeader bg="#2b8ab0" color="white" borderTopRadius="md" fontSize={"md"}>Search Places</ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody padding={5} height={220}>
                        <Box height={100}>
                            <Autocomplete
                                onLoad={handleLoad}
                                onPlaceChanged={handlePlaceSelect}
                                restrictions={{ country: "LK" }}
                            >
                                <Input
                                    placeholder="Search places..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    mb={4}
                                />
                            </Autocomplete>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </LoadScript>
    );
};

export default PlaceAutocompleteModal;
