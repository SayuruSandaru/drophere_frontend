import { Flex, Heading, VStack, Input, useDisclosure, Button, Icon, Text, Stack, FormControl, FormLabel, Box, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
import { FaUser } from 'react-icons/fa';
import CounterComponent from './CounterComponent';
import PlaceAutocompleteModal from "pages/components/placeModalbox";
import Navbar from "pages/components/NavbarNeedLogin";
import Footer from "pages/components/footer";
import { useSetRecoilState } from "recoil";
import { set } from "lodash";
import { searchRides } from "api/ride";
import { searchRideState } from "state";
import { getDriverById } from "api/driver";
import { get } from "http";


const Ride: React.FC = () => {
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

    return (
        <Box>
            {errorMessage && (
                <Box p={2} color="white" bg={"red.400"} textAlign="center">
                    {errorMessage}
                </Box>
            )}
            <Box h={20}>
                <Navbar isDelivery={true} />
            </Box>
            <Flex
                height="100vh"
                justifyContent="center"
                alignItems="center"
                bg="gray.50"
            >
                <Flex
                    direction="column"
                    bg="white"
                    p={6}
                    borderRadius="md"
                    boxShadow="lg"
                    alignItems="center"
                    maxW="400px"
                    w="full"
                >
                    <Heading as="h1" size="lg" textAlign="center">
                        Where you need to go?
                    </Heading>
                    <FormControl mb={4} mt={8}>
                        <FormLabel fontSize="sm" color={"gray.600"}>Pick Up</FormLabel>
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
                    <FormControl mb={10} mt={3}>
                        <Flex flex={1} onClick={onOpen} cursor="pointer">
                            <Icon as={FaUser} w={6} h={4} color={"gray.500"} />
                            <Text ml={2} fontSize="md" fontWeight={"medium"}>Passenger</Text>
                            <Text ml={10} fontSize="md" fontWeight={"medium"}>{count}</Text>
                        </Flex>
                    </FormControl>
                    <Button
                        bgColor={"black"}
                        onClick={searchRide}
                        width="full"
                        color="white"
                        _hover={{ bgColor: "gray.700" }}
                    >
                        {loading ? "" : "Search"}
                        {loading && (
                            <Flex justify="center">
                                <Spinner size="md" ml={2} />
                            </Flex>
                        )}
                    </Button>
                </Flex>

                <CounterComponent
                    isOpen={isOpen}
                    onClose={onClose}
                    handleCountChange={handleCountChange}
                />
                <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
                <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestiantionSelect} />

            </Flex>
            <Footer />
        </Box>
    );
};

export default Ride;

