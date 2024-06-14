import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,

} from "@chakra-ui/react";
import { FaLocationArrow, FaUser } from "react-icons/fa";
import { Box, Flex, Text, Badge, Divider, Icon, Button, Spacer, useDisclosure, Image, IconButton, HStack, Tag, TagLabel, TagCloseButton, Avatar, Stack, useMediaQuery } from "@chakra-ui/react";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import PlaceAutocompleteModal from "../components/placeModalbox";
import CalendarComponent from "./components/calenderComponents";
import CounterComponent from "./components/counterComponent";
import CarInfo from "./components/resultCard";
import { FaFilter, FaBox, FaBars } from "react-icons/fa";
import MapContainer from "./components/googleMap";
import FilterDrawer from "./components/filterDrawer";
import { useNavigate } from "react-router-dom";
import { RouterPaths } from "router/routerConfig";
import { is } from "@babel/types";
import MenuDrawer from "./components/menuDrawer";
import { set } from "lodash";
import FilterDrawerMobile from "./components/filterDrawerMobile";

const Home = () => {
  const navigate = useNavigate();
  const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
  const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
  const { isOpen: isCalendarOpen, onOpen: onCalendarOpen, onClose: onCalendarClose } = useDisclosure();
  const { isOpen: isPassangerOpen, onOpen: onPassangerOpen, onClose: onPassangerClose } = useDisclosure();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isFilterDrawerMobileOpen, setIsFilterDrawerMobileOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
  const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
  const [selectedPassangerCount, setPassangerCount] = useState("");

  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Flex direction="column" p={4} h="100vh" bg="gray.50">
      {isLargeScreen && (
        <Flex direction={{ base: "column", md: "row" }} mb={4} align="center">
          <Flex align="center" mb={{ base: 4, md: 0 }}>
            <Image src="/images/Black_T.png" alt="Drop Here Logo" w="50px" />
            <Text fontSize="xl" fontWeight="bold" color="black" ml={2}>Drop Here</Text>
          </Flex>
          <Spacer />
          <HStack spacing={4}>
            <Button borderRadius={3} bgColor={"transparent"} size={"sm"} color={"black"} onClick={() => { navigate(RouterPaths.SEARCHDELIVERY); }}>
              <Icon as={FaBox} w={6} h={4} color={"gray.700"} mr={1} />
              Deliver
            </Button>
            <Button borderRadius={300} bgColor={"blackAlpha.800"} size={"sm"} color={"white"}>Earn with us</Button>
            <Avatar size="sm" name="John" />
          </HStack>
        </Flex>
      )}

      {!isLargeScreen && (
        (

          <Flex align="center" mb={{ base: 4, md: 0 }}>
            <Image src="/images/Black_T.png" alt="Drop Here Logo" w="50px" />
            <Text fontSize="xl" fontWeight="bold" color="black" ml={2}>Drop Here</Text>
            <Spacer />
            <IconButton
              icon={<Icon as={FaBars} w={6} h={4} color={"gray.500"} />}
              aria-label="Filter"
              onClick={() => setIsMenuDrawerOpen(true)}
              borderRadius="md"
              _hover={{ bg: "gray.200" }}
              height="40px"
              width="40px"
              ml={3}
            />
            <IconButton
              icon={<Icon as={FaFilter} w={6} h={4} color={"gray.500"} />}
              aria-label="Filter"
              onClick={() => setIsFilterDrawerMobileOpen(true)}
              borderRadius="md"
              _hover={{ bg: "gray.200" }}
              height="40px"
              width="40px"
              ml={3}
            />
          </Flex>

        )
      )}
      {
        isLargeScreen && (
          <Box bg="white" borderRadius="md" boxShadow="sm" mb={4} p={2}>
            <Flex direction={{ base: "column", md: "row" }} align="center">
              <Flex flex={1} align="center" onClick={() => handleItemClick("Pickup")} cursor="pointer" mb={{ base: 4, md: 0 }}>
                <Icon as={FaLocationArrow} w={6} h={4} color={"gray.500"} mt={0} />
                <Text ml={2} fontSize="md" fontWeight={"medium"}>{selectedPickupLocation}</Text>
              </Flex>
              {/* <Divider orientation={{ base: "horizontal", md: "vertical" }} height={{ base: "2px", md: "24px" }} mx={4} borderColor={'gray.400'} /> */}
              <Flex flex={1} align="center" onClick={() => handleItemClick("Destination")} cursor="pointer" mb={{ base: 4, md: 0 }}>
                <Icon as={FaLocationDot} w={6} h={4} color={"gray.500"} />
                <Text ml={2} fontSize="md" fontWeight={"medium"}>{selectedDestinationLocation}</Text>
              </Flex>
              {/* <Divider orientation={{ base: "horizontal", md: "vertical" }} height={{ base: "2px", md: "24px" }} mx={4} borderColor={'gray.400'} /> */}
              <Flex flex={1} align="center" onClick={() => handleItemClick("Calendar")} cursor="pointer" mb={{ base: 4, md: 0 }}>
                <Icon as={FaCalendarDays} w={6} h={4} color={"gray.500"} />
                <Text ml={2} fontSize="md" fontWeight={"medium"}>{formatDateWithoutYear(selectedDate)}</Text>
              </Flex>
              {/* <Divider orientation={{ base: "horizontal", md: "vertical" }} height={{ base: "2px", md: "24px" }} mx={4} borderColor={'gray.400'} /> */}
              <Flex flex={1} align="center" onClick={() => handleItemClick("Passenger")} cursor="pointer" mb={{ base: 4, md: 0 }}>
                <Icon as={FaUser} w={6} h={4} color={"gray.500"} />
                <Text ml={2} fontSize="md" fontWeight={"medium"}>{`${selectedPassangerCount} Passenger`}</Text>
              </Flex>
              <Button
                bg="#2b8ab0"
                color="white"
                borderRadius="md"
                _hover={{ bg: "#1a6c8e" }}
                height="40px"
                width={{ base: "100%", md: "200px" }}
                fontWeight="medium"
                mb={{ base: 4, md: 0 }}
              >
                Search
              </Button>
              <IconButton
                icon={<Icon as={FaFilter} w={6} h={4} color={"gray.500"} />}
                aria-label="Filter"
                onClick={() => setIsFilterDrawerOpen(true)}
                borderRadius="md"
                _hover={{ bg: "gray.200" }}
                height="40px"
                width="40px"
                ml={3}
              />
            </Flex>

          </Box>
        )
      }
      {
        isLargeScreen && (
          <HStack spacing={4} mb={5}>
            <Tag size="md" borderRadius='full' variant='solid' bg={'gray.200'}>
              <TagLabel color={"gray.600"}>Available only</TagLabel>
              <TagCloseButton color={"black"} />
            </Tag>
            <Tag size="md" borderRadius='full' variant='solid' bg={'gray.200'}>
              <TagLabel color={"gray.600"}>Car</TagLabel>
              <TagCloseButton color={"black"} />
            </Tag>
          </HStack>
        )
      }
      <FilterDrawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)} />
      <FilterDrawerMobile isOpen={isFilterDrawerMobileOpen} onClose={() => setIsFilterDrawerMobileOpen(false)} />
      <MenuDrawer isOpen={isMenuDrawerOpen} onClose={() => setIsMenuDrawerOpen(false)} />
      <Flex flex={1} direction={{ base: "column", lg: "row" }}>
        <Box flex={1} bg="white" borderRadius="md" boxShadow="sm" mb={{ base: 4, lg: 0 }} mr={{ lg: 4 }} p={4}>
          <MapContainer />
        </Box>
        <Box flex={1.5} bg="white" borderRadius="md" boxShadow="sm" p={4}>
          <Stack spacing={4}>
            <CarInfo
              imageUrl="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=960&h=750&dpr=1"
              altText="Kia Motors Subcompact car"
              carName="Car"
              date="2nd May 2024"
              from="Kandy"
              to="Badulla"
              availability="Available"
              seatsLeft="2"
              price="$382.25"
              onClick={() => navigate(RouterPaths.ORDER)}
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
              onClick={() => navigate(RouterPaths.ORDER)}
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
              onClick={() => navigate(RouterPaths.ORDER)}
            />
          </Stack>
        </Box>
      </Flex>
      <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
      <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestiantionSelect} />
      <CalendarComponent
        isOpen={isCalendarOpen}
        onClose={onCalendarClose}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <CounterComponent isOpen={selectedItem === "Passenger"} onClose={() => setSelectedItem("")} handleCountChange={handleCountChange} />
    </Flex>
  );
};

export default Home;
