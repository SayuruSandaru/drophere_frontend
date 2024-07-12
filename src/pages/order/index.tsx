import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  VStack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { MdCheckCircle, MdDateRange, MdEmail, MdPhone } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarHome from "pages/components/NavbarHome";
import Footer from "pages/components/footer";
import StarRating from "./components/starRating";
import Modal from "./components/payment";
import { Timeline } from "react-responsive-timeline";
import "./components/order.css";
import { RouterPaths } from "router/routerConfig";
import reservationService from "api/services/reservationService";
import rideService from "api/services/rideService";
import { decryptData, getLocalStorage } from "util/secure";
import { useShowSuccessToast } from "pages/components/toast";

export default function OrderPageRide() {
  const navigate = useNavigate();
  const rating = 4.5;
  const reviews = 50;
  const joinDate = "Joined 2024";
  const email = "test@gmail.com";
  const phone = "0771234567";
  const [price, setPrice] = useState(0);
  const showSuccessToast = useShowSuccessToast();
  const { id, passenger_count } = useParams();
  const [rideDetails, setRideDetails] = useState(null);
  const [hasOpen, setHasOpen] = useState(false);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await rideService.getRideById(parseInt(id));
        if (response.status === "success") {
          setRideDetails(response.ride);
          const price = getLocalStorage(id)
          console.log(price)
          setPrice(price)
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

  const openModal = () => setHasOpen(true);
  const closeModal = () => setHasOpen(false);

  const placeOrder = async () => {
    try {
      const reservation = {
        driver_id: rideDetails.driver_id,
        ride_id: id,
        status: "confirmed",
        price: price,
        passenger_count: 1,
      };
      const response = await reservationService.createReservation(reservation);
      if (response.status === "success") {
        console.log("Order placed successfully:", response);
        showSuccessToast("Payment details added successfully");
      } else {
        console.log("Error placing order:", response);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };



  return (
    <Box bgColor={"gray.50"}>
      <Box h={20}>
        <NavbarHome />
      </Box>
      {!rideDetails && (
        <Box h={"80vh"}>
          <Center>
            <Spinner mt={20} size="xl" />
          </Center>
        </Box>
      )}
      {rideDetails && (
        <Flex direction="row" justify="center" align="flex-start" p={4}>
          <Box
            maxW="700px"
            w="full"
            bg={"white"}
            boxShadow="lg"
            rounded="md"
            overflow="hidden"
            mx={4}
          >
            <Flex justify="left" align="center" mt={6} p={6}>
              <Avatar
                ml="14"
                size="lg"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                css={{
                  border: "2px solid white",
                }}
                cursor="pointer"
                onClick={() => navigate(RouterPaths.PROFILE)}
              />
              <Stack spacing={0} align="left" ml={5}>
                <Heading
                  fontSize="md"
                  fontWeight={500}
                  fontFamily="body"
                  cursor="pointer"
                  onClick={() => navigate(RouterPaths.PROFILE)}
                >
                  Sayuru Sandaru
                </Heading>
                <Flex align="center">
                  <Box as={MdCheckCircle} mr={2} />
                  <Text color="gray.500">Verified driver</Text>
                </Flex>
              </Stack>
            </Flex>
            <Box p={6}>
              <Stack ml={16}>
                <div className="time">
                  <Timeline
                    timelines={[
                      {
                        title: rideDetails.start_location,
                      },
                      {
                        title: rideDetails.end_location,
                      },
                    ]}
                  />
                </div>
              </Stack>
              <Box mt={10} />
              <Stack spacing={3} align="left" ml={20} mt={5}>
                <Flex align="center">
                  <MdDateRange style={{ marginRight: "8px" }} />
                  <Text color="gray.500">{rideDetails.start_time}</Text>
                </Flex>
                <Flex align="center">
                  <MdEmail style={{ marginRight: "8px" }} />
                  <Text color="gray.500">{email}</Text>
                </Flex>
                <Flex align="center">
                  <MdPhone style={{ marginRight: "8px" }} />
                  <Text color="gray.500">{phone}</Text>
                </Flex>
              </Stack>

              <hr className="hr" />
              <Flex justify="center">
                <Stack spacing={0} align="center" mt={10}>
                  <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
                    {price} LKR
                  </Heading>
                </Stack>
              </Flex>
              <hr className="hr" />
            </Box>
          </Box>
          <VStack align="stretch" w="30%" p={4} ml={12}>
            <Box
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="md"
              w="full"
              textAlign="center"
            >
              <Image
                src={rideDetails.vehicle_details.image_url}
                alt="Passenger Image"
                objectFit="cover"
                borderRadius="md"
                mb={4}
              />
            </Box>
            <Button
              onClick={openModal}
              w="full"
              height="50px"
              fontSize="25px"
              bg={"gray.900"}
              color="white"
              rounded="md"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Book
            </Button>
          </VStack>
        </Flex>
      )}
      <Box h={20} />
      <Footer />
      <Modal hasOpen={hasOpen} onCloseModal={closeModal} onAddPaymentMethod={placeOrder} />
    </Box>
  );
}
