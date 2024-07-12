import React from "react";
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
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { selectedRideState } from "state";
import { useLocation } from "react-router-dom";
import { reservationState } from 'state';
import { useSetRecoilState } from 'recoil';

import { createDeliveryOrder } from "../../api/reservation";
import { useState } from "react";

const OrderDelivery = () => {
  const location = useLocation();
  const selectedRide = location.state?.selectedRide;
  const flexDirection = useBreakpointValue({ base: "column", lg: "row" }) as
    | "column"
    | "row";
  const containerWidth = useBreakpointValue({
    base: "100%",
    md: "90%",
    lg: "80%",
  });
  const inputWidth = useBreakpointValue({ base: "100%", md: "350px" });

  // const selectedRide = useRecoilValue(selectedRideState);
  const startLocation = selectedRide?.start_location ?? "N/A";
  const endLocation = selectedRide?.end_location ?? "N/A";
  const startTime = selectedRide?.start_time
    ? new Date(selectedRide.start_time).toLocaleString()
    : "N/A";
  const fee = selectedRide?.fee ?? "N/A";
  const imageUrl =
    selectedRide?.vehicle_details?.image_url ??
    "https://via.placeholder.com/150";

  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const setReservation = useSetRecoilState(reservationState);


  const handleBooking = async () => {
    try {
      setError(""); 
      setSuccess(false); 

      
      if (!recipientName || !recipientAddress || !recipientPhone) {
        setError("Please fill in all recipient details.");
        return;
      }

      if (!selectedRide) {
        console.error("selectedRide is undefined:", selectedRide);
        setError("Ride information is missing. Please try selecting the ride again.");
        return;
      }

      console.log("Selected ride:", selectedRide);
      const hardcodedDriverId = "1";
      const hardcodedRideId = "2";

      const orderData = {
        driver_id: hardcodedDriverId,
        ride_id: hardcodedRideId,
        status: "pending",
        price: parseFloat(fee),
        recipient_name: recipientName,
        recipient_address: recipientAddress,
        recipient_phone: recipientPhone,
        weight: selectedRide.weight || 0,
      };
      console.log("Sending order data:", orderData); 

      const result = await createDeliveryOrder(orderData);
      if (result) {
        console.log("Delivery order created successfully");
        setReservation(result);
        setSuccess(true);
        // Handle successful booking (e.g., show success message, navigate to confirmation page)
      }
    } catch (error) {
      console.error("Error creating delivery order: ", error);
      setError("Failed to create delivery order. Please try again.");
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
                  src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=860&h=750&dpr=1"
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
                <strong>Price:</strong> Rs {fee}
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
