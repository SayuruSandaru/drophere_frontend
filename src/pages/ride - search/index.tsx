import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useDisclosure,
  VStack,
  Icon,
  useColorModeValue,
  Collapse,
  ScaleFade,
  Stack,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
import { FaUser, FaMapMarkerAlt, FaFlag, FaSearch } from 'react-icons/fa';
import CounterComponent from './CounterComponent';
import PlaceAutocompleteModal from "pages/components/placeModalbox";
import Navbar from "pages/components/NavbarNeedLogin";
import Footer from "pages/components/footer";
import { useSetRecoilState } from "recoil";
import { searchRides } from "api/ride";
import { searchRideState } from "state";
import { getDriverById } from "api/driver";

const Ride: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
    const setSearchRideState = useSetRecoilState(searchRideState);
    const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
    const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
    const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
    const [count, setCount] = React.useState(0);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [pickCordinate, setPickCordinate] = useState({});
    const [destinationCordinate, setDestinationCordinate] = useState({});

    const handleItemClick = (item) => {
        setSelectedItem(item);
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
        console.log(place);
        setSelectedPickupLocation(place.name);
        setPickCordinate({ lat: place.latitude, lng: place.longitude });
    };

    const handleCountChange = (newCount) => {
        setCount(newCount);
    };

    const searchRide = async () => {
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
            const rideData = {
                pickup_lat: pickCordinate['lat'],
                pickup_lng: pickCordinate['lng'],
                destination_lat: destinationCordinate['lat'],
                destination_lng: destinationCordinate['lng'],
                pickupName: selectedPickupLocation,
                destinationName: selectedDestinationLocation,
                passengerCount: count,
                response: res.rides,
            };
            setSearchRideState(rideData);
            setLoading(false);
            navigate(RouterPaths.RIDE);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
        }
    };

    const getOwnerDetails = async (driverId) => {
        try {
            const res = await getDriverById({ driverId });
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    };

    const bgColor = useColorModeValue("gray.50", "gray.900");
    const cardBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "white");
    const inputBgColor = useColorModeValue("gray.100", "gray.700");
  
    return (
      <Box bg={bgColor} minHeight="100vh">
        <Navbar isDelivery={true} />
        <Container maxW="container.xl" py={10}>
          <Stack direction={{ base: "column", lg: "row" }} spacing={8} align="center">
            {/* Left side content - hidden on mobile */}
            {!isMobile && (
              <Box flex={1}>
                <ScaleFade initialScale={0.9} in={true}>
                  <VStack spacing={6} align="flex-start">
                    <Image
                      src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                      alt="City traffic"
                      borderRadius="xl"
                      boxShadow="2xl"
                      w="100%"
                    />
                  </VStack>
                </ScaleFade>
              </Box>
            )}
  
            {/* Right side form */}
            <Box flex={1} w="100%">
              <ScaleFade initialScale={0.9} in={true}>
                <VStack
                  spacing={6}
                  align="stretch"
                  bg={cardBgColor}
                  p={6}
                  borderRadius="xl"
                  boxShadow="2xl"
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-5px)", boxShadow: "3xl" }}
                >
                  <Heading as="h2" size="lg" textAlign="center" color={textColor}>
                    Plan Your Ride
                  </Heading>
                  <FormControl>
                    <FormLabel fontSize="sm" color={textColor}>Pick Up</FormLabel>
                    <Flex align="center" bg={inputBgColor} borderRadius="md" p={2} transition="all 0.3s" _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}>
                      <Icon as={FaMapMarkerAlt} color="blue.500" mr={2} />
                      <Input
                        placeholder="Select pickup location"
                        onClick={() => handleItemClick("Pickup")}
                        value={selectedPickupLocation}
                        readOnly
                        border="none"
                        _focus={{ boxShadow: "none" }}
                      />
                    </Flex>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm" color={textColor}>Destination</FormLabel>
                    <Flex align="center" bg={inputBgColor} borderRadius="md" p={2} transition="all 0.3s" _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}>
                      <Icon as={FaFlag} color="green.500" mr={2} />
                      <Input
                        placeholder="Select destination"
                        onClick={() => handleItemClick("Destination")}
                        value={selectedDestinationLocation}
                        readOnly
                        border="none"
                        _focus={{ boxShadow: "none" }}
                      />
                    </Flex>
                  </FormControl>
                  <Flex
                    align="center"
                    bg={inputBgColor}
                    borderRadius="md"
                    p={2}
                    cursor="pointer"
                    onClick={onOpen}
                    transition="all 0.3s"
                    _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
                  >
                    <Icon as={FaUser} color="purple.500" mr={2} />
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>
                      Passengers: {count}
                    </Text>
                  </Flex>
                  <Button
                    leftIcon={<FaSearch />}
                    colorScheme="blue"
                    size="lg"
                    onClick={searchRide}
                    isLoading={loading}
                    loadingText="Searching"
                    transition="all 0.3s"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  >
                    Find Your Ride
                  </Button>
                </VStack>
              </ScaleFade>
            </Box>
          </Stack>
        </Container>
  
        <Collapse in={!!errorMessage}>
          <Box p={4} color="white" bg="red.500" textAlign="center">
            {errorMessage}
          </Box>
        </Collapse>
  
        <CounterComponent
          isOpen={isOpen}
          onClose={onClose}
          handleCountChange={handleCountChange}
        />
        <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
        <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestiantionSelect} />
  
        <Footer />
      </Box>
    );
  };
  
  export default Ride;