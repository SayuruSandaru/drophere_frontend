import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  IconButton,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Stack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  FaLocationArrow,
  FaLocationDot,
  FaCalendarDays,
  FaBoxOpen,
  FaFilter,
} from "react-icons/fa6";
import PlaceAutocompleteModal from "../components/placeModalbox";
import CalendarComponent from "./components/calenderComponents";
import CounterComponent from "./components/counterComponent";
import CarInfo from "./components/resultCard";
import FilterDrawer from "./components/filterDrawer";
import FilterDrawerMobile from "./components/filterDrawerMobile";
import MenuDrawer from "./components/menuDrawer";
import NavbarHomeDelivery from "pages/components/NavbarHomeDelivery";
import { useNavigate } from "react-router-dom";
import { RouterPaths } from "router/routerConfig";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchRideState } from "state";
import { searchRides } from "api/ride";
import { decodePolyline } from "util/map";
import MapContainer from "pages/home/components/googleMap";
import { selectedRideState } from "state";
import { encryptData, getLocalStorage, setLocalStorage } from "util/secure";
import { format } from "date-fns/format";

const HomeDelivery = () => {
  const setSelectedRide = useSetRecoilState(selectedRideState);

  const navigate = useNavigate();
  const rideSearchData = useRecoilValue(searchRideState);
  const setSearchRideState = useSetRecoilState(searchRideState);

  const {
    isOpen: isPickupPlaceOpen,
    onOpen: onPickupPlaceOpen,
    onClose: onPickupPlaceClose,
  } = useDisclosure();
  const {
    isOpen: isDestinationPlaceOpen,
    onOpen: onDestinationPlaceOpen,
    onClose: onDestinationPlaceClose,
  } = useDisclosure();
  const {
    isOpen: isCalendarOpen,
    onOpen: onCalendarOpen,
    onClose: onCalendarClose,
  } = useDisclosure();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isFilterDrawerMobileOpen, setIsFilterDrawerMobileOpen] =
    useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPickupLocation, setSelectedPickupLocation] = useState(
    rideSearchData?.pickupName || ""
  );
  const [selectedDestinationLocation, setSelectedDestinationLocation] =
    useState(rideSearchData?.destinationName || "");
  const [selectedWeight, setSelectedWeight] = useState(
    rideSearchData?.weight || ""
  );
  const [pickCordinate, setPickCordinate] = useState({
    lat: rideSearchData?.pickup_lat || 0, // Provide default coordinates if null
    lng: rideSearchData?.pickup_lng || 0,
  });
  const [destinationCordinate, setDestinationCordinate] = useState({
    lat: rideSearchData?.destination_lat || 0, // Provide default coordinates if null
    lng: rideSearchData?.destination_lng || 0,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [polylinePath, setPolylinePath] = useState([]);

  const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item === "Calendar") {
      onCalendarOpen();
    } else if (item === "Pickup") {
      onPickupPlaceOpen();
    } else if (item === "Destination") {
      onDestinationPlaceOpen();
    } else if (item === "Weight") {
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onCalendarClose();
  };

  const handleDestinationSelect = (place) => {
    setSelectedDestinationLocation(place.name);
    setDestinationCordinate({ lat: place.latitude, lng: place.longitude });
  };

  const handlePickupLocationSelect = (place) => {
    setSelectedPickupLocation(place.name);
    setPickCordinate({ lat: place.latitude, lng: place.longitude });
  };

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
  };

  const formatDateWithoutYear = (date) => {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const searchDelivery = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const res = await searchRides({
        pickup_lat: pickCordinate.lat,
        pickup_lng: pickCordinate.lng,
        destination_lat: destinationCordinate.lat,
        destination_lng: destinationCordinate.lng,
        pickup_name: selectedPickupLocation,
        destination_name: selectedDestinationLocation,
        date: formattedDate,
        passenger_count: 1,
      });
      const deliveryData = {
        pickup_lat: pickCordinate.lat,
        pickup_lng: pickCordinate.lng,
        destination_lat: destinationCordinate.lat,
        destination_lng: destinationCordinate.lng,
        pickupName: selectedPickupLocation,
        destinationName: selectedDestinationLocation,
        date: selectedDate,
        weight: selectedWeight,
        response: res.rides,
      };
      setSearchRideState(deliveryData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleCardClick = (ride) => {
    setSelectedRide(ride);
    navigate(RouterPaths.ORDERDELIVERY);
  };

  const setdata = (id, price) => {
    console.log(id, price);
    setLocalStorage(id, price.toString());
    console.log("success");
    console.log(getLocalStorage(id));
  };

  return (
    <Flex direction="column" h="100vh" bg="gray.50">
      {errorMessage && (
        <Box p={2} color="white" bg={"red.400"} textAlign="center">
          {errorMessage}
        </Box>
      )}
      <NavbarHomeDelivery />
      {isLargeScreen && (
        <Box bg="white" borderRadius="md" boxShadow="sm" mb={4} p={2}>
          <Flex direction={{ base: "column", md: "row" }} align="center">
            <Flex
              flex={1}
              align="center"
              onClick={() => handleItemClick("Pickup")}
              cursor="pointer"
              mb={{ base: 4, md: 0 }}
            >
              <Icon
                as={FaLocationArrow}
                w={6}
                h={4}
                color={"gray.500"}
                mt={0}
              />
              <Text ml={2} fontSize="md" fontWeight={"medium"}>
                {selectedPickupLocation}
              </Text>
            </Flex>
            <Flex
              flex={1}
              align="center"
              onClick={() => handleItemClick("Destination")}
              cursor="pointer"
              mb={{ base: 4, md: 0 }}
            >
              <Icon as={FaLocationDot} w={6} h={4} color={"gray.500"} />
              <Text ml={2} fontSize="md" fontWeight={"medium"}>
                {selectedDestinationLocation}
              </Text>
            </Flex>
            <Flex
              flex={1}
              align="center"
              onClick={() => handleItemClick("Calendar")}
              cursor="pointer"
              mb={{ base: 4, md: 0 }}
            >
              <Icon as={FaCalendarDays} w={6} h={4} color={"gray.500"} />
              <Text ml={2} fontSize="md" fontWeight={"medium"}>
                {formatDateWithoutYear(selectedDate)}
              </Text>
            </Flex>
            {/* <Flex
              flex={1}
              align="center"
              onClick={() => handleItemClick("Weight")}
              cursor="pointer"
              mb={{ base: 4, md: 0 }}
            >
              <Icon as={FaBox} w={6} h={4} color={"gray.500"} />
              <Text
                ml={2}
                fontSize="md"
                fontWeight={"medium"}
              >{`${selectedWeight} Kg`}</Text>
            </Flex> */}
            <Button
              bg="#2b8ab0"
              color="white"
              borderRadius="md"
              _hover={{ bg: "#1a6c8e" }}
              height="40px"
              width={{ base: "100%", md: "200px" }}
              fontWeight="medium"
              mb={{ base: 4, md: 0 }}
              onClick={searchDelivery}
              isLoading={loading}
            >
              Search
            </Button>
            {/* <IconButton
              icon={<Icon as={FaFilter} w={6} h={4} color={"gray.500"} />}
              aria-label="Filter"
              onClick={() => setIsFilterDrawerOpen(true)}
              borderRadius="md"
              _hover={{ bg: "gray.200" }}
              height="40px"
              width="40px"
              ml={3}
            /> */}
          </Flex>
        </Box>
      )}
      {/* {isLargeScreen && (
        <HStack spacing={4} mb={5}>
          <Tag size="md" borderRadius="full" variant="solid" bg={"gray.200"}>
            <TagLabel color={"gray.600"}>Available only</TagLabel>
            <TagCloseButton color={"black"} />
          </Tag>
          <Tag size="md" borderRadius="full" variant="solid" bg={"gray.200"}>
            <TagLabel color={"gray.600"}>Car</TagLabel>
            <TagCloseButton color={"black"} />
          </Tag>
        </HStack>
      )} */}
      {/* <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      />
      <FilterDrawerMobile
        isOpen={isFilterDrawerMobileOpen}
        onClose={() => setIsFilterDrawerMobileOpen(false)}
      /> */}
      <MenuDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
      />
      <Flex flex={1} direction={{ base: "column", lg: "row" }}>
        <Box
          flex={1}
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          mb={{ base: 4, lg: 0 }}
          mr={{ lg: 4 }}
          p={4}
        >
          <MapContainer polylinePath={polylinePath} />
        </Box>
        <Box flex={1.5} bg="white" borderRadius="md" boxShadow="sm" p={4}>
          <Stack spacing={4}>
            {rideSearchData?.response?.length > 0 ? (
              rideSearchData.response.map((ride) => (
                <CarInfo
                  key={ride.ride_id}
                  imageUrl={ride.vehicle_details.image_url}
                  altText={ride.vehicle_details.model}
                  carName={ride.vehicle_details.model}
                  date={new Date(ride.start_time).toLocaleDateString()}
                  from={ride.start_location}
                  to={ride.end_location}
                  name={ride.owner_details.city}
                  availability={ride.status}
                  seatsLeft={ride.passenger_count}
                  price={`Rs ${ride.individualFee}`}
                  onClick={() => {
                    const points = decodePolyline(ride.route);
                    setPolylinePath(points);
                  }}
                  onBook={() => {
                    setSelectedRide(ride);
                    navigate(`/delivery/order/${ride.ride_id}`, {
                      state: { selectedRide: ride, price: ride.fee },
                    });
                  }}
                />
              ))
            ) : (
              <Flex direction="column" align="center" justify="center" mt={40}>
                <Icon as={FaBoxOpen} w={12} h={12} color="gray.500" />
                <Text textAlign="center" color="gray.500" fontSize="lg" mt={4}>
                  No rides found
                </Text>
              </Flex>
            )}
          </Stack>
        </Box>
      </Flex>
      <PlaceAutocompleteModal
        isOpen={isPickupPlaceOpen}
        onClose={onPickupPlaceClose}
        onPlaceSelect={handlePickupLocationSelect}
      />
      <PlaceAutocompleteModal
        isOpen={isDestinationPlaceOpen}
        onClose={onDestinationPlaceClose}
        onPlaceSelect={handleDestinationSelect}
      />
      <CalendarComponent
        isOpen={isCalendarOpen}
        onClose={onCalendarClose}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      {/* <CounterComponent
        isOpen={selectedItem === "Weight"}
        onClose={() => setSelectedItem("")}
        handleCountChange={handleWeightChange}
      /> */}
    </Flex>
  );
};

export default HomeDelivery;
