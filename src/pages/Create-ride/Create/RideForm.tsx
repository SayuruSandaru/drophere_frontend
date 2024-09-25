import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, HStack, VStack, Select, Spinner, Flex , Text} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import PlaceAutocompleteModal from 'pages/components/placeModalbox';
import { useShowErrorToast, useShowSuccessToast } from 'pages/components/toast';

const RideForm = ({
  vehicles,
  handlePickupLocationSelect,
  handleDestinationSelect,
  selectedPickupLocation,
  selectedDestinationLocation,
  direction,
  loading,
}) => {
  const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
  const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
  const [vehicleType, setVehicleType] = useState("");
  const [passenger, setPassenger] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleItemClick = (item) => {
    if (item === "Pickup") {
      onPickupPlaceOpen();
    } else if (item === "Destination") {
      onDestinationPlaceOpen();
    }
  };

  return (
    <Box bgColor={"white"} p={[4, 5]} borderRadius={10} boxShadow={'xl'} w={["100%", "80%"]} ml={"20px"}>
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
      <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
      <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestinationSelect} />
    </Box>
  );
};

export default RideForm;
