import React, { useEffect, useState } from 'react';
import { ChakraProvider, Text, Box, Button, FormControl, FormLabel, Input, HStack, VStack, Grid, GridItem, Center, useDisclosure, Select, useToast, useMediaQuery } from '@chakra-ui/react';
import NavbarOwner from 'pages/components/navbar-owner';
import Footer from 'pages/components/footer';
import PlaceAutocompleteModal from 'pages/components/placeModalbox';
import rideService from 'api/services/rideService';
import vehicleService from 'api/services/vehicleService';
import { decodePolyline } from 'util/map';
import MapContainerMulitRoute from 'pages/home/components/googleMap_multiroute';
import { useShowErrorToast, useShowSuccessToast } from 'pages/components/toast';

interface Coordinate {
  lat: number;
  lng: number;
}

const Cride = () => {
  const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
  const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
  const [destinationCordinate, setDestinationCordinate] = useState<Coordinate | null>(null);
  const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
  const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
  const [pickCordinate, setPickCordinate] = useState<Coordinate | null>(null);
  const [polylinePath, setPolylinePath] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const toast = useToast();
  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');

  const showSuccessToast = useShowSuccessToast();
  const showErrorToast = useShowErrorToast();

  const handlePickupLocationSelect = (place) => {
    setSelectedPickupLocation(place.name);
    setPickCordinate({ lat: place.latitude, lng: place.longitude });
  };

  const handleDestinationSelect = (place) => {
    setSelectedDestinationLocation(place.name);
    setDestinationCordinate({ lat: place.latitude, lng: place.longitude });
  };

  const handleItemClick = (item) => {
    if (item === "Pickup") {
      onPickupPlaceOpen();
    } else if (item === "Destination") {
      onDestinationPlaceOpen();
    }
  };

  const direction = async () => {
    let formValid = true;

    if (!selectedPickupLocation) {
      showErrorToast("Pickup location is required");
      formValid = false;
    }

    if (!selectedDestinationLocation) {
      showErrorToast("Destination location is required");
      formValid = false;
    }

    if (!vehicleType) {
      showErrorToast("Vehicle type is required");
      formValid = false;
    }

    if (!date) {
      showErrorToast("Date is required");
      formValid = false;
    }

    if (!time) {
      showErrorToast("Time is required");
      formValid = false;
    }

    if (!formValid) {
      return;
    }

    try {
      const res = await rideService.getDirections(pickCordinate, destinationCordinate);
      if (res.status === "error") {
        showErrorToast("Failed to get directions");
      } else {
        const lines = res.directions.map(decodePolyline);
        setPolylinePath(lines);
      }
    } catch (error) {
      showErrorToast("Failed to get directions");
    }
  };

  const handleRouteSelect = (index) => {
    showSuccessToast("Route selected successfully");
  };

  const getVehicle = async () => {
    try {
      const res = await vehicleService.getVehicle();
      if (res.status === "error") {
        showErrorToast("Failed to get vehicle");
      } else {
        console.log(res);
      }
    } catch (error) {
      showErrorToast("Failed to get vehicle");
    }
  };

  useEffect(() => {
    getVehicle();
  }, []);

  return (
    <ChakraProvider>
      <Box bgColor={"gray.50"}>
        <Box pb={3}>
          <NavbarOwner />
        </Box>
        <Box p={[2, 5]}>
          <Grid templateColumns={["1fr", null, "repeat(2, 1fr)"]} gap={6} height="calc(100vh - 80px)">
            <Center h={"90%"}>
              <GridItem w="100%">
                <Box bgColor={"white"} p={[4, 5]} borderRadius={10} boxShadow={'2xl'} w={["100%", "80%"]}>
                  <Text color={"black"} fontWeight={"bold"} fontSize={"2xl"}>Plan your journey</Text>
                  <Text color={"gray.600"} fontSize={"md"}>Fill the following details to plan your journey</Text>
                  <Box mb={4} mt={5}>
                    <FormControl>
                      <FormLabel fontSize="sm" color={"gray.500"}>Pick Up</FormLabel>
                      <Input
                        placeholder=""
                        onClick={() => handleItemClick("Pickup")}
                        value={selectedPickupLocation}
                        readOnly
                      />
                    </FormControl>
                  </Box>
                  <Box mb={4}>
                    <FormControl>
                      <FormLabel fontSize="sm" color={"gray.500"}>Destination</FormLabel>
                      <Input
                        placeholder=""
                        onClick={() => handleItemClick("Destination")}
                        value={selectedDestinationLocation}
                        readOnly
                      />
                    </FormControl>
                  </Box>
                  <Box mb={4}>
                    <FormControl>
                      <FormLabel fontSize="sm" color={"gray.500"}>Vehicle</FormLabel>
                      <Select
                        placeholder="Select vehicle"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="bike">Bike</option>
                        <option value="tuktuk">Tuktuk</option>
                        <option value="car">Car</option>
                        <option value="van">Van</option>
                        <option value="bus">Bus</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormControl>
                  </Box>
                  <HStack spacing={4} w="100%" mt={8}>
                    <Box>
                      <FormControl>
                        <FormLabel fontSize="sm" color={"gray.500"}>Date</FormLabel>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel fontSize="sm" color={"gray.500"}>Time</FormLabel>
                        <HStack>
                          <Input
                            type="text"
                            placeholder="10:30 AM"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </HStack>
                      </FormControl>
                    </Box>
                  </HStack>
                  <Button
                    bgColor={"black"}
                    marginTop={30}
                    onClick={direction}
                    color="white"
                    _hover={{ bgColor: "gray.700" }}
                  >
                    Confirm the trip
                  </Button>
                </Box>
              </GridItem>
            </Center>
            <GridItem w="100%">
              <MapContainerMulitRoute polylinePath={polylinePath} onRouteSelect={handleRouteSelect} />
            </GridItem>
          </Grid>
        </Box>
        {!isLargeScreen && <Footer />}
        <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
        <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestinationSelect} />
      </Box>
    </ChakraProvider>
  );
};

export default Cride;
