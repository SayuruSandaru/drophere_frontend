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
import Footer from "pages/components/footer";
import NavbarHome from "../components/NavbarHome";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchRideState } from "state";
import { searchRides } from "api/ride";
import React from "react";
import { decodePolyline } from "util/map";
import { encryptData, getLocalStorage, setLocalStorage } from "util/secure";
import { setDate } from "date-fns";

const Home = () => {
  const rideSearchData = useRecoilValue(searchRideState);
  const setSearchRideState = useSetRecoilState(searchRideState);
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

  const [selectedPickupLocation, setSelectedPickupLocation] = useState(rideSearchData.pickupName || '');
  const [pickCordinate, setPickCordinate] = useState({ "lat": rideSearchData.pickup_lat, "lng": rideSearchData.pickup_lng });
  const [destinationCordinate, setDestinationCordinate] = useState({ "lat": rideSearchData.destination_lat, "lng": rideSearchData.destination_lng });
  const [selectedDestinationLocation, setSelectedDestinationLocation] = useState(rideSearchData.destinationName);
  const [selectedPassangerCount, setPassangerCount] = useState(`${rideSearchData.passengerCount} Passenger`);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [polylinePath, setPolylinePath] = useState([]);

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

  const getSearchData = () => {

  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
    onCalendarClose();
  };

  const handleDestiantionSelect = (place) => {
    setSelectedDestinationLocation(place.name);
    setDestinationCordinate({ lat: place.latitude, lng: place.longitude });
  };

  const handlePickupLocationSelect = (place) => {
    setSelectedPickupLocation(place.name);
    setPickCordinate({ lat: place.latitude, lng: place.longitude });
  };

  const handleCountChange = (count) => {
    setPassangerCount(count);
    onCalendarClose();
  };

  const formatDateWithoutYear = (date) => {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const searchRide = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      console.log(pickCordinate['lat']);
      const res = await searchRides(
        {
          pickup_lat: pickCordinate['lat'],
          pickup_lng: pickCordinate['lng'],
          destination_lat: destinationCordinate['lat'],
          destination_lng: destinationCordinate['lng'],
          date: selectedDate.toISOString(),
          passenger_count: parseInt(selectedPassangerCount),
        }
      );
      const rideData = {
        pickup_lat: pickCordinate['lat'],
        pickup_lng: pickCordinate['lng'],
        destination_lat: destinationCordinate['lat'],
        destination_lng: destinationCordinate['lng'],
        pickupName: selectedPickupLocation,
        destinationName: selectedDestinationLocation,
        passengerCount: selectedPassangerCount,
        response: res.rides,
      };
      setSearchRideState(rideData);
      console.log(res);
      console.log("success");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.message);
    }
  }
  const setdata = (id, prce) => {
    console.log(id, prce);
    setLocalStorage(id, prce);

    console.log("success");
    getLocalStorage(id);
  }

  return (
    <Flex direction="column" h="100vh" bg="gray.50">
      {errorMessage && (
        <Box p={2} color="white" bg={"red.400"} textAlign="center">
          {errorMessage}
        </Box>
      )}
      <NavbarHome />
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
                <Text ml={2} fontSize="md" fontWeight={"medium"}>{`${selectedPassangerCount}`}</Text>
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
                onClick={searchRide}
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
          <MapContainer polylinePath={polylinePath} />
        </Box>
        <Box flex={1.5} bg="white" borderRadius="md" boxShadow="sm" p={4}>
          <Stack spacing={4}>
            {rideSearchData && rideSearchData.response && rideSearchData.response.map(ride => (
              <CarInfo
                key={ride.ride_id}
                imageUrl={ride.vehicle_details.image_url}
                altText={ride.vehicle_details.model}
                carName={`${ride.vehicle_details.type} ${ride.vehicle_details.model}`}
                date={new Date(ride.start_time).toLocaleDateString()}
                from={ride.start_location}
                to={ride.end_location}
                name={ride.owner_details.city}
                availability={ride.status}
                seatsLeft={ride.vehicle_details.capacity}
                price={`Rs ${ride.fee}`}
                onClick={() => {
                  const points = decodePolyline(ride.route)
                  setPolylinePath(points);
                }}
                onBook={() => {
                  const rideId = ride.ride_id;
                  setdata(rideId, ride.fee);
                  navigate(`/order/${rideId}`);
                  // navigate(`${RouterPaths}`);
                }}
              />
            ))}
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
