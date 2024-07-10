import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, HStack, Text, Stack, useDisclosure, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PlaceAutocompleteModal from 'pages/components/placeModalbox';
import Footer from 'pages/components/footer';
import Navbar from 'pages/components/NavbarNeedLogin';
import { RouterPaths } from 'router/routerConfig';
import { searchRides } from 'api/ride'; 
import { searchRideState } from 'state'; 
import { useSetRecoilState } from 'recoil';

const SearchDelivery = () => {
  const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
  const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
  const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(''); // Add this state for date selection
  const [selectedWeight, setSelectedWeight] = useState(''); // Add this state for weight input
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const setSearchRideState = useSetRecoilState(searchRideState); // Using the same state setter for searchRideState
  const navigate = useNavigate();
  const [pickCordinate, setPickCordinate] = useState({});
  const [destinationCordinate, setDestinationCordinate] = useState({});
  const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
  
  const handleItemClick = (item) => {

    if (item === "Pickup") {
      onPickupPlaceOpen();
    } else if (item === "Destination") {
      onDestinationPlaceOpen();
    }
  };

  const handleDestiantionSelect = (place) => {
    setSelectedDestinationLocation(place.name);
    setDestinationCordinate({ lat: place.latitude, lng: place.longitude });
  };

  const handlePickupLocationSelect = (place) => {
    setSelectedPickupLocation(place.name);
    setPickCordinate({ lat: place.latitude, lng: place.longitude });
  };

  const searchDelivery = async () => {
    try {

        setLoading(true);
        setErrorMessage('');
        const res = await searchRides(
            {
                pickup_lat: pickCordinate['lat'],
                pickup_lng: pickCordinate['lng'],
                destination_lat: destinationCordinate['lat'],
                destination_lng: destinationCordinate['lng'],
            }
        );

        const deliveryData = {
            pickup_lat: pickCordinate['lat'],
            pickup_lng: pickCordinate['lng'],
            destination_lat: destinationCordinate['lat'],
            destination_lng: destinationCordinate['lng'],
            pickupName: selectedPickupLocation,
            destinationName: selectedDestinationLocation,
            date: selectedDate,
            weight: selectedWeight,
            response: res.rides,
        };

        setSearchRideState(deliveryData);
        setLoading(false);
        navigate(RouterPaths.HOMEDELIVERY);
    } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
    }
};

  return (
    <Box>
      {errorMessage && (
        <Box p={2} color="white" bg={"red.400"} textAlign="center">
          {errorMessage}
        </Box>
      )}
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
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontSize="sm" color={"gray.600"}>Weight</FormLabel>
            <HStack>
              <Input
                placeholder=""
                type="number"
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
              />
              <Text pl={3} pr={3}>Kg</Text>
            </HStack>
          </FormControl>
          <Stack spacing="6" mt={10}>
            <Button
              bgColor={"black"}
              onClick={searchDelivery}
              color="white"
              _hover={{ bgColor: "gray.700" }}
              isDisabled={loading}
            >
              {loading ? <Spinner size="md" /> : "Search"}
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
