import React, { useState, MouseEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, HStack, VStack, Text, Stack, useDisclosure } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import PlaceAutocompleteModal from 'pages/components/placeModalbox';
import Footer from 'pages/components/footer';
import NavbarHome from 'pages/components/NavbarHome';
import Navbar from 'pages/components/NavbarNeedLogin';

const SearchDelivery = () => {
  const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
  const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
  const [packageType, setPackageType] = useState('Document');
  const [deliveryType, setDeliveryType] = useState('Standard delivery');
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
  const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item === "Pickup") {
      onPickupPlaceOpen();
    } else if (item === "Destination") {
      onDestinationPlaceOpen();
    }
  };

  const handleDestiantionSelect = (place) => {
    setSelectedDestinationLocation(place);
  };

  const handlePickupLocationSelect = (place) => {
    setSelectedPickupLocation(place);
  };

  return (
    <Box>
      <Box h={20}><Navbar isDelivery={false} /></Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.50"
        overflow="hidden"
      >
        <style>
          {`
          @keyframes moveBackground {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-50%, -50%); }
          }
        `}
        </style>
        <Box
          position="relative"
          maxWidth="sm"
          width="100%"
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontSize="xl" fontWeight="bold" color="black" mb={4} textAlign="center">
            Navigating Miles, Delivering Smiles
          </Text>
          <FormControl mb={4}>
            <FormLabel fontSize="sm" color={"gray.600"}>Pickup</FormLabel>
            <Input
              placeholder=""
              onClick={() => handleItemClick("Pickup")}
              value={selectedPickupLocation}
              readOnly
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="sm" color={"gray.600"}>Destination</FormLabel>
            <Input
              placeholder=""
              onClick={() => handleItemClick("Destination")}
              value={selectedDestinationLocation}
              readOnly
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="sm" color={"gray.600"}>Date</FormLabel>
            <Input type="date" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="sm" color={"gray.600"}>Weight</FormLabel>
            <HStack>
              <Input placeholder="" type="number" />
              <Text pl={3} pr={3}>Kg</Text>
            </HStack>
          </FormControl>
          <Stack spacing="6" mt={10}>
            <Button
              bgColor={"black"}
              onClick={() => { }}
              color="white"
              _hover={{ bgColor: "gray.700" }}
            >
              Search
            </Button>
          </Stack>
        </Box>
        <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
        <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestiantionSelect} />
      </Box>

      <Footer />
    </Box>
  );
};

export default SearchDelivery;