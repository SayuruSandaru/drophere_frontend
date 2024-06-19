import { Flex, Heading, VStack, Input, useDisclosure, Button, Icon, Text, Stack, FormControl, FormLabel, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
import { FaUser } from 'react-icons/fa';
import CounterComponent from './CounterComponent';
import PlaceAutocompleteModal from "pages/components/placeModalbox";
import Navbar from "pages/components/NavbarNeedLogin";
import Footer from "pages/components/footer";


const Ride: React.FC = () => {
    const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
    const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
    const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
    const [count, setCount] = React.useState(0);

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

    const onLogin = () => {
        console.log('Login clicked');
        navigate(RouterPaths.SEARCHRIDE);
    };

    const handleCountChange = (newCount) => {
        setCount(newCount);
    };

    return (
        <Box>
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
                            value={selectedDestinationLocation}
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
                        onClick={onLogin}
                        width="full"
                        color="white"
                        _hover={{ bgColor: "gray.700" }}
                    >
                        Search for a Ride
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