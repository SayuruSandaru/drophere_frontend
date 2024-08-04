import React, { useEffect, useState } from 'react';
import { ChakraProvider, Text, Box, Button, FormControl, FormLabel, Input, HStack, VStack, Grid, GridItem, Center, useDisclosure, Select, useToast, useMediaQuery, Spinner, Flex } from '@chakra-ui/react';
import NavbarOwner from 'pages/components/navbar-owner';
import Footer from 'pages/components/footer';
import PlaceAutocompleteModal from 'pages/components/placeModalbox';
import rideService from 'api/services/rideService';
import vehicleService from 'api/services/vehicleService';
import { decodePolyline } from 'util/map';
import MapContainerMulitRoute from 'pages/home/components/googleMap_multiroute';
import { useShowErrorToast, useShowSuccessToast } from 'pages/components/toast';
import User from 'model/user';
import { set } from 'date-fns';

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
  const [vehicles, setVehicles] = useState([]);
  const toast = useToast();
  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passenger, setPassenger] = useState("");

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
      if (availableRoutes.length > 0) {
        if (selectedRoute !== null) {
          await createRide();
          return;
        } else {
          showErrorToast("Please select a route");
          return;
        }
      } else {
        if (pickCordinate === null || destinationCordinate === null) {
          showErrorToast("Please select pickup and destination location");
          return;
        } else {
          const res = await rideService.getDirections(pickCordinate, destinationCordinate);
          if (res.status === "error") {
            showErrorToast("Failed to get directions");
          } else {
            setAvailableRoutes(res.directions);
            const lines = res.directions.map(decodePolyline);
            setPolylinePath(lines);
          }
        }
      }
    } catch (error) {
      showErrorToast("Failed to get directions");
    }
  };

  const handleRouteSelect = (index) => {
    setSelectedRoute(index);
    showSuccessToast("Route selected successfully");
  };

  const getVehicle = async () => {
    try {
      const user = User.getUserId();
      if (!user) {
        console.error("User is not logged in or session expired");
        showErrorToast("Please log in to view vehicles");
        // Optionally, redirect to login page
        // window.location.href = '/login';
        return;
      }
      const userId = user.toString();
      console.log("User ID:", userId);
      const res = await vehicleService.getVehicleByOwenerId(userId);
      console.log("API Response:", res);
      if (res.status === "error") {
        showErrorToast(`Failed to get vehicle: ${res.message || 'Unknown error'}`);
      } else {
        setVehicles(res.vehicles);
      }
    } catch (error) {
      console.error("Error in getVehicle:", error);
      showErrorToast(`Failed to get vehicle: ${error.message || 'Unknown error'}`);
    }
  };

  const createRide = async () => {
    setLoading(true);
    const ride = {
      driver_id: User.getDriverDetails().driver_id,
      vehicle_id: vehicleType,
      status: "active",
      start_time: `${date} ${convertTime12to24(time)}`,
      current_location: "NOT AVAILABLE",
      route: availableRoutes[selectedRoute],
      start_location: selectedPickupLocation,
      end_location: selectedDestinationLocation,
      passenger_count: parseInt(passenger),
    };
    try {
      const res = await rideService.createRide(ride);
      setLoading(false);
      if (res.status === "error") {
        showErrorToast("Failed to create ride");
      } else {
        showSuccessToast("Ride created successfully");
      }
    } catch (error) {
      setLoading(false);
      showErrorToast("Failed to create ride");
    }
  };

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
  };

  // Usage inside your component or before making an API request
  const startTime = `${date} ${convertTime12to24(time)}`;



  useEffect(() => {
    getVehicle();
  }, []);
  const uniqueTypes = Array.from(new Set(vehicles.map(v => v.type)));

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
                        id="vehicle-select"
                        value={vehicleType}
                        onChange={(e) => {
                          setVehicleType(e.target.value)
                        }}
                        placeholder="Select vehicle"
                      >
                        <option value="">Select Type</option>
                        {vehicles.map((vehicle, index) => (
                          <option key={index} value={vehicle.vehicle_id}>
                            {`${vehicle.type} - ${vehicle.model} - ${vehicle.license_plate}`}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box mb={4}>
                    <FormControl>
                      <FormLabel fontSize="sm" color={"gray.500"}>Available Space</FormLabel>
                      <Input
                        type="number"
                        placeholder="Enter available space"
                        value={passenger}
                        onChange={(e) => setPassenger(e.target.value)}
                      />
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
                            type="time"
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
                    {loading ? "Creating..." : "Create Ride"}
                    {loading && (
                      <Flex justify="center">
                        <Spinner size="md" ml={2} />
                      </Flex>
                    )}
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
