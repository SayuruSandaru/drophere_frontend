import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Input,
  Button,
  Icon,
  Image,
  Text,
  Stack,
  useBreakpointValue,
  ResponsiveValue,
} from "@chakra-ui/react";
import { Property } from "csstype";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedRideState, reservationState } from "state";
import { useLocation, useParams } from "react-router-dom";
import { createDeliveryOrder } from "../../api/reservation";
import { decryptData, getLocalStorage } from "util/secure";
import rideService from "api/services/rideService";

const OrderDelivery = () => {
  const location = useLocation();
  const { id } = useParams();
  const { selectedRide: initialSelectedRide, price: initialPrice } = location.state || {};

  const [rideDetails, setRideDetails] = useState(initialSelectedRide || null);
  const flexDirection = useBreakpointValue<ResponsiveValue<Property.FlexDirection>>({
    base: "column",
    lg: "row"
  });
  const containerWidth = useBreakpointValue({
    base: "100%",
    md: "90%",
    lg: "80%",
  });
  const inputWidth = useBreakpointValue({ base: "100%", md: "350px" });
  const startLocation = rideDetails?.start_location ?? "N/A";
  const endLocation = rideDetails?.end_location ?? "N/A";
  const startTime = rideDetails?.start_time
    ? new Date(rideDetails.start_time).toLocaleString()
    : "N/A";
  const imageUrl =
    rideDetails?.vehicle_details?.image_url ??
    "https://via.placeholder.com/150";

  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [price, setPrice] = useState(initialPrice || 0);

  const setReservation = useSetRecoilState(reservationState);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await rideService.getRideById(parseInt(id));
        if (response.status === "success") {
          setRideDetails(response.ride);
          const storedPrice = getLocalStorage(id);
          if (storedPrice) {
            setPrice(storedPrice);
          } else if (response.ride.fee) {
            setPrice(response.ride.fee);
          }
          console.log(response);
        } else {
          console.log("Error getting ride details:", response);
        }
      } catch (error) {
        console.error("Error getting ride details:", error);
      }
    };
  
    fetchRideDetails();
  }, [id]);

  const validateOrderData = (orderData) => {
    const requiredFields = ['driver_id', 'ride_id', 'status', 'price', 'recipient_name', 'recipient_address', 'recipient_phone', 'weight'];
    for (const field of requiredFields) {
      if (orderData[field] === undefined || orderData[field] === null || orderData[field] === '') {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    if (typeof orderData.price !== 'number' || orderData.price <= 0) {
      throw new Error('Invalid price');
    }
    if (typeof orderData.weight !== 'number' || orderData.weight <= 0) {
      throw new Error('Invalid weight');
    }
  };

  const handleBooking = async () => {
    try {
      setError(""); 
      setSuccess(false); 

      if (!recipientName || !recipientAddress || !recipientPhone) {
        setError("Please fill in all recipient details.");
        return;
      }

      if (!rideDetails) {
        console.error("rideDetails is undefined:", rideDetails);
        setError("Ride information is missing. Please try selecting the ride again.");
        return;
      }

      console.log("Selected ride:", rideDetails);

      const orderData = {
        driver_id: rideDetails.driver_id,
        ride_id: rideDetails.ride_id,
        status: "confirmed",
        price: parseFloat(price),
        recipient_name: recipientName,
        recipient_address: recipientAddress,
        recipient_phone: recipientPhone,
        weight: rideDetails.weight || 1, // Ensure this is not 0 or null
      };

      validateOrderData(orderData);
      console.log("Sending order data:", orderData); 

      const result = await createDeliveryOrder(orderData);
      if (result) {
        console.log("Delivery order created successfully");
        setReservation(result);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Complete error object:", error);
      setError(error.message || "Failed to create delivery order. Please try again.");
    }
  };

  return (
    <Box>
      <Flex direction="column" bg="gray.100" p={[4, 6]} alignItems="center">
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          Review your delivery
        </Heading>

        <Flex
          w={containerWidth}
          direction={flexDirection}
          justifyContent="center"
        >
          <Stack
            spacing={4}
            align="stretch"
            w={["100%", "100%", "60%"]}
            mr={[0, 0, 4]}
          >
            <Box
              bg="white"
              p={[4, 6]}
              borderRadius="md"
              boxShadow="md"
              w="100%"
            >
              <VStack spacing={2} align="start" as="div">
                <Heading as="h3" size="md" mb={2}>
                  Recipient details
                </Heading>
                <Flex align="center" mb={4}>
                  <Icon as={FaMapMarkerAlt} w={5} h={5} color="black" mr={2} />
                  <Text fontSize="md">{endLocation}</Text>
                </Flex>
                <Stack spacing={2} w="100%">
                  <Flex align="center" direction={["column", "row"]}>
                    <Text width={["100%", "150px"]} mb={[2, 0]}>
                      Name:
                    </Text>
                    <Input
                      placeholder="Name of the recipient"
                      w={inputWidth}
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </Flex>
                  <Flex align="center" direction={["column", "row"]}>
                    <Text width={["100%", "150px"]} mb={[2, 0]}>
                      Address:
                    </Text>
                    <Input
                      placeholder="Street , City , State"
                      w={inputWidth}
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </Flex>
                  <Flex align="center" direction={["column", "row"]}>
                    <Text width={["100%", "150px"]} mb={[2, 0]}>
                      Contact Number:
                    </Text>
                    <Input
                      placeholder="Contact"
                      w={inputWidth}
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                    />
                  </Flex>
                </Stack>
              </VStack>
            </Box>

            <Box
              bg="white"
              p={[4, 6]}
              borderRadius="md"
              boxShadow="md"
              w="100%"
            >
              <VStack spacing={2} align="stretch">
                <Heading size="md">Guidelines</Heading>

                <Text size="md">General Guidelines:</Text>
                <Text size="xs" fontWeight={300}>
                  1. Please make sure that the package is properly packed.
                </Text>
                <Text size="xs" fontWeight={300}>
                  2. Please make sure details are correct.
                </Text>
                <Text size="xs" fontWeight={400}>
                  Prohibited items:
                </Text>
                <Text size="xs" fontWeight={300}>
                  Prohibited items are Alcohol, medication, drugs, firearms, and
                  dangerous or illegal items are prohibited.
                </Text>
              </VStack>
            </Box>
          </Stack>

          <VStack align="stretch" w={["100%", "100%", "40%"]} mt={[4, 4, 0]}>
            <Box bg="white" p={4} borderRadius="md" boxShadow="md" w="100%">
              <Flex justifyContent="center">
                <Image
                  src={imageUrl}
                  alt="Passenger Image"
                  objectFit="cover"
                  borderRadius="md"
                  maxH="200px"
                />
              </Flex>
              <Text>
                <strong>From:</strong> {startLocation}
              </Text>
              <Text>
                <strong>To:</strong> {endLocation}
              </Text>
              <Text>
                <strong>Date and Time:</strong> {startTime}
              </Text>
              <Text>
                <strong>Price:</strong> Rs {price}
              </Text>
            </Box>

            <Button
              bg="black"
              variant="solid"
              color="white"
              mt={4}
              onClick={handleBooking}
            >
              Book
            </Button>
            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}
            {success && (
              <Text color="green.500" mt={2}>
                Delivery order created successfully!
              </Text>
            )}
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OrderDelivery;