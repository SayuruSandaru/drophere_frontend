import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, HStack, Text, Stack, useDisclosure, Spinner, Flex, Image, VStack, ScaleFade, Container, Icon, useMediaQuery, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PlaceAutocompleteModal from 'pages/components/placeModalbox';
import Footer from 'pages/components/footer';
import Navbar from 'pages/components/NavbarNeedLogin';
import { RouterPaths } from 'router/routerConfig';
import { searchRides } from 'api/ride';
import { searchRideState } from 'state';
import { useSetRecoilState } from 'recoil';
import { FaUser, FaSearch, FaMap } from 'react-icons/fa';
import { format } from 'date-fns/format';
import MapPopup from 'pages/ride - search/location_picker_modal';

const SearchDelivery = () => {
  const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
  const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
  const { isOpen: isPickupMapOpen, onOpen: onPickupMapOpen, onClose: onPickupMapClose } = useDisclosure();
  const { isOpen: isDestinationMapOpen, onOpen: onDestinationMapOpen, onClose: onDestinationMapClose } = useDisclosure();

  const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const setSearchRideState = useSetRecoilState(searchRideState);
  const navigate = useNavigate();
  const [pickCordinate, setPickCordinate] = useState({});
  const [destinationCordinate, setDestinationCordinate] = useState({});
  const [selectedPickupLocation, setSelectedPickupLocation] = useState("");

  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const handleItemClick = (item) => {
    if (item === "Pickup") {
      onPickupPlaceOpen();
    } else if (item === "Destination") {
      onDestinationPlaceOpen();
    } else if (item === "PickupMap") {
      onPickupMapOpen();
    } else if (item === "DestinationMap") {
      onDestinationMapOpen();
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
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const res = await searchRides({
        pickup_lat: pickCordinate['lat'],
        pickup_lng: pickCordinate['lng'],
        destination_lat: destinationCordinate['lat'],
        destination_lng: destinationCordinate['lng'],
        pickup_name: selectedPickupLocation,
        destination_name: selectedDestinationLocation,
        date: formattedDate,
        passenger_count: 1,
      });

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
      <Navbar isDelivery={false} />
      <Container maxW="container.xl" py={20}>
        <Stack direction={{ base: "column", lg: "row" }} spacing={8} align="center">
          {!isMobile && (
            <Box flex={1}>
              <ScaleFade initialScale={0.9} in={true}>
                <VStack spacing={6} align="flex-start">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1682090260563-191f8160ca48?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Delivery illustration"
                    borderRadius="xl"
                    boxShadow="2xl"
                  />
                </VStack>
              </ScaleFade>
            </Box>
          )}

          <Box flex={1} width="100%">
            <ScaleFade initialScale={0.9} in={true}>
              <VStack
                spacing={8}
                align="stretch"
                bg="white"
                p={8}
                borderRadius="xl"
                boxShadow="2xl"
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", boxShadow: "3xl" }}
              >
                <Text fontSize="2xl" fontWeight="bold" color="black" textAlign="center">
                  Navigating Miles, Delivering Smiles
                </Text>
                <FormControl>
                  <FormLabel fontSize="sm" color={"gray.600"}>Pickup</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Select pickup location"
                      onClick={() => handleItemClick("Pickup")}
                      value={selectedPickupLocation}
                      readOnly
                    />
                    <InputRightElement width="3rem" paddingRight="0.5rem">
                      <IconButton
                        size={"sm"}
                        aria-label="Open Map"
                        icon={<FaMap />}
                        backgroundColor="gray.300"
                        onClick={() => handleItemClick("PickupMap")}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>


                <FormControl>
                  <FormLabel fontSize="sm" color={"gray.600"}>Destination</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Select destination"
                      onClick={() => handleItemClick("Destination")}
                      value={selectedDestinationLocation}
                      readOnly
                    />
                    <InputRightElement paddingRight="0.5rem">
                      <IconButton
                        size={"sm"}
                        aria-label="Open Map"
                        icon={<FaMap />}
                        backgroundColor="gray.300"
                        onClick={() => handleItemClick("DestinationMap")}  // Corrected to open DestinationMap modal
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>


                <FormControl>
                  <FormLabel fontSize="sm" color={"gray.600"}>Date</FormLabel>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm" color={"gray.600"}>Weight</FormLabel>
                  <HStack>
                    <Input
                      placeholder="Enter weight"
                      type="number"
                      value={selectedWeight}
                      onChange={(e) => setSelectedWeight(e.target.value)}
                    />
                    <Text pl={3} pr={3}>Kg</Text>
                  </HStack>
                </FormControl>

                <Button
                  colorScheme="blue"
                  onClick={searchDelivery}
                  isLoading={loading}
                  loadingText="Searching"
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                >
                  Search for Delivery
                </Button>
              </VStack>
            </ScaleFade>
          </Box>
        </Stack>
      </Container>

      {/* Autocomplete Modals for pickup and destination */}
      <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
      <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestiantionSelect} />

      {/* Map Modals for pickup and destination */}
      <MapPopup
        isOpen={isPickupMapOpen}
        onClose={onPickupMapClose}
        onConfirmLocation={(location, placeName) => {
          setPickCordinate(location);
          setSelectedPickupLocation(placeName);
        }}
      />
      <MapPopup
        isOpen={isDestinationMapOpen}
        onClose={onDestinationMapClose}
        onConfirmLocation={(location, placeName) => {
          setDestinationCordinate(location);
          setSelectedDestinationLocation(placeName);
        }}
      />

      <Footer />
    </Box>
  );
};

export default SearchDelivery;
