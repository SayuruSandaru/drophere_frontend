import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Box,
} from "@chakra-ui/react";

const PlaceAutocompleteModal = ({ isOpen, onClose, onPlaceSelect }) => {
  const [query, setQuery] = useState("");
  const autocompleteRef = useRef(null);

  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      const latitude = lat();
      const longitude = lng();
      onPlaceSelect({ name: place.name, latitude, longitude });
      setQuery(place.name);
    } else {
      // Handle the case where no geometry is returned
      console.error("Place does not have geometry");
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#f7fafc"
        borderRadius="md"
        boxShadow="md"
        sx={{ position: "relative", zIndex: 1050 }}
      >
        <ModalHeader
          bg="#2b8ab0"
          color="white"
          borderTopRadius="md"
          fontSize={"md"}
        >
          Search Places
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody padding={5} height={220}>
          <Box>
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
  );
};

export default PlaceAutocompleteModal;
