import { useState } from "react";
import { Box, Flex, Text, Badge, Divider, Icon, Button, Spacer, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Stack, Image, IconButton, HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { FaLocationArrow, FaUser } from 'react-icons/fa';
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import PlaceAutocompleteModal from "./components/placeModalbox";
import CalendarComponent from "./components/calenderComponents";
import CounterComponent from "./components/counterComponent";
import CarInfo from "./components/resultCard";
import { FaFilter } from "react-icons/fa";
import { GoogleMap } from "@react-google-maps/api";
import MapContainer from "./components/googleMap";
import FilterDrawer from "./components/filterDrawer";



const Home = () => {
    const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
    const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
    const { isOpen: isCalendarOpen, onOpen: onCalendarOpen, onClose: onCalendarClose } = useDisclosure();
    const { isOpen: isPassangerOpen, onOpen: onPassangerOpen, onClose: onPassangerClose } = useDisclosure();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
    const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
    const [selectedPassangerCount, setPassangerCount] = useState("");

    const handleItemClick = (item) => {
        setSelectedItem(item);
        if (item === "Calendar") {
            onCalendarOpen();
        } else if (item === "Pickup") {
            onPickupPlaceOpen();
        } else if (item === "Destination") {
            onDestinationPlaceOpen();
        } else {

        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onCalendarClose();
    };

    const handleDestiantionSelect = (place) => {
        setSelectedDestinationLocation(place);
    };

    const handlePickupLocationSelect = (place) => {
        setSelectedPickupLocation(place);
    };

    const handleCountChange = (count) => {
        setPassangerCount(count);
        onCalendarClose();
    };

    const formatDateWithoutYear = (date) => {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <Flex direction="column" p={4} w="100vw" h="100vh" bg="gray.50">
            <Box bg="white" borderRadius="md" boxShadow="sm" mb={4} p={2}>
                <Flex direction="row" align="center">
                    <Flex flex={1} align="center" onClick={() => handleItemClick("Pickup")} cursor="pointer">
                        <Icon as={FaLocationArrow} w={6} h={4} color={"gray.500"} mt={0} />
                        <Text ml={2} fontSize="md" fontWeight={"medium"}>{selectedPickupLocation}</Text>
                    </Flex>
                    <Divider orientation="vertical" height="24px" mx={4} borderColor={'gray.400'} />
                    <Flex flex={1} align="center" onClick={() => handleItemClick("Destination")} cursor="pointer">
                        <Icon as={FaLocationDot} w={6} h={4} color={"gray.500"} />
                        <Text ml={2} fontSize="md" fontWeight={"medium"}>{selectedDestinationLocation}</Text>
                    </Flex>
                    <Divider orientation="vertical" height="24px" mx={4} borderColor={'gray.400'} />
                    <Flex flex={1} align="center" onClick={() => handleItemClick("Calendar")} cursor="pointer">
                        <Icon as={FaCalendarDays} w={6} h={4} color={"gray.500"} />
                        <Text ml={2} fontSize="md" fontWeight={"medium"}>{formatDateWithoutYear(selectedDate)}</Text>
                    </Flex>
                    <Divider orientation="vertical" height="24px" mx={4} borderColor={'gray.400'} />
                    <Flex flex={1} align="center" onClick={() => handleItemClick("Passenger")} cursor="pointer">
                        <Icon as={FaUser} w={6} h={4} color={"gray.500"} />
                        <Text ml={2} fontSize="md" fontWeight={"medium"}>{`${selectedPassangerCount} Passenger`}</Text>
                    </Flex>
                    <Spacer />

                    <Button
                        bg="#2b8ab0"
                        color="white"
                        borderRadius="md"
                        _hover={{ bg: "#1a6c8e" }}
                        height="40px"
                        width="200px"
                        fontWeight="medium"
                    >
                        Search
                    </Button>
                    <IconButton
                        icon={<Icon as={FaFilter} w={6} h={4} color={"gray.500"} />}
                        aria-label="Filter"
                        onClick={() => setIsDrawerOpen(true)}
                        borderRadius="md"
                        _hover={{ bg: "gray.200" }}
                        height="40px"
                        width="40px"
                        ml={4}
                    />
                </Flex>
                <FilterDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            </Box>
            <HStack spacing={4} mb={5}>

                <Tag
                    size="md"
                    borderRadius='full'
                    variant='solid'
                    bg={'gray.200'}
                >
                    <TagLabel color={"gray.600"}>Available only</TagLabel>
                    <TagCloseButton color={"black"} />
                </Tag>
                <Tag
                    size="md"
                    borderRadius='full'
                    variant='solid'
                    bg={'gray.200'}
                >
                    <TagLabel color={"gray.600"}>Car</TagLabel>
                    <TagCloseButton color={"black"} />
                </Tag>
            </HStack>
            <Flex flex={1}>
                <Box flex={1} bg="white" borderRadius="md" boxShadow="sm" mr={4} p={4}>
                    {/* Left box */}
                    <MapContainer />
                </Box>

                <Box flex={1.5} bg="white" borderRadius="md" boxShadow="sm" p={4}>
                    {/* Right stack of boxes */}
                    <Stack spacing={4}>
                        <CarInfo
                            imageUrl="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=960&h=750&dpr=1"
                            altText="Kia Motors Subcompact car"
                            carName="Car"
                            date="2nd May 2024"
                            from="Colombo"
                            to="Badulla"
                            availability="Available"
                            seatsLeft="2"
                            price="$382.25"
                        />
                        <CarInfo
                            imageUrl="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=960&h=750&dpr=1"
                            altText="Kia Motors Subcompact car"
                            carName="Car"
                            date="2nd May 2024"
                            from="Colombo"
                            to="Badulla"
                            availability="Available"
                            seatsLeft="2"
                            price="$382.25"
                        />
                        <CarInfo
                            imageUrl="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=960&h=750&dpr=1"
                            altText="Kia Motors Subcompact car"
                            carName="Car"
                            date="2nd May 2024"
                            from="Colombo"
                            to="Badulla"
                            availability="Available"
                            seatsLeft="2"
                            price="$382.25"
                        />

                    </Stack>
                </Box>
            </Flex >

            <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
            <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestiantionSelect} />
            <CalendarComponent
                isOpen={isCalendarOpen}
                onClose={onCalendarClose}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
            />
            <CounterComponent isOpen={selectedItem === "Passenger"} onClose={() => setSelectedItem("")} handleCountChange={handleCountChange} />
        </Flex >
    );
};

export default Home;
