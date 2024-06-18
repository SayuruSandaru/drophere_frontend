import { Flex, Heading, Input, useDisclosure, Button, Icon, Text, FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
import { FaUser } from 'react-icons/fa';
import CounterComponent from './CounterComponent';
import PlaceAutocompleteModal from "pages/components/placeModalbox";


const Ride: React.FC = () => {
    const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
    const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
    const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
   // const [selectedItem, setSelectedItem] = useState("");
  //const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
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
        <Flex
            height="100vh"
            justifyContent="center"
            alignItems="center"
            bg="gray.200"
            p={4}
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
                <Heading as="h1" size="lg">
                    Where you need to go?
                </Heading>
                <FormControl mb={4} mt={8}>
                    <FormLabel color={"gray.600"}>Pick Up</FormLabel>
                    <Input
                        placeholder=""
                        onClick={() => handleItemClick("Pickup")}
                        value={selectedDestinationLocation}
                        readOnly
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel color={"gray.600"}>Destination</FormLabel>
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
                        <Text ml={2}>Passenger</Text>
                        <Text ml={10}>{count}</Text>
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
    );
};

export default Ride;
function setSelectedItem(item: any) {
    throw new Error("Function not implemented.");
}

function setSelectedPickupLocation(place: any) {
    throw new Error("Function not implemented.");
}

