import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  VStack,
  Image,
} from "@chakra-ui/react";
import { MdCheck, MdCheckCircle, MdDateRange, MdEmail, MdPhone } from "react-icons/md";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "pages/components/NavbarHome";
import Footer from "pages/components/footer";
import StarRating from "./components/starRating";
import Modal from "./components/payment";
import { Timeline } from "react-responsive-timeline";
import "./components/order.css";
import { RouterPaths } from "router/routerConfig";

export default function SocialProfileWithImage() {
  const navigate = useNavigate();
  const rating = 4.5; // Set the rating value here
  const reviews = 50; // Set the number of reviews here
  const joinDate = "Joined 2024";
  const email = "sayuru@gmail.com"; // User email
  const phone = "0771234567"; // User phone number

  const [hasOpen, setHasOpen] = useState(false);

  const openModal = () => setHasOpen(true);
  const closeModal = () => setHasOpen(false);

  return (
    <Box>
      <Box h={20}>
        <NavbarHome />
      </Box>
      <Flex direction="row" justify="center" align="center" p={4}>
        <Box
          maxW="700px"
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="xl"
          rounded="md"
          overflow="hidden"
          mx={4}
        >
          <Flex justify="center" mt={6}>
            <Avatar
              size="md"
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
              <Flex>
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
                      title: "Colombo, Sri Lanka",
                    },
                    {
                      title: "Kandy, Sri Lanka",
                    },
                  ]}
                />
              </div>
            </Stack>
            <Box mt={10} />
            <Stack spacing={3} align="left" ml={20} mt={5}>
              <Flex align="center">
                <MdDateRange style={{ marginRight: "8px" }} />
                <Text color="gray.500">Mon 23 June</Text>
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
                  Price Rs.500
                </Heading>
              </Stack>
            </Flex>
            <hr className="hr" />
          </Box>
        </Box>

        <VStack align="stretch" w="30%" p={4}>
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="md"
            w="full"
            textAlign="center"
          >
            <Image
              src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=860&h=750&dpr=1"
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
            bg={useColorModeValue("#151f21", "gray.900")}
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
      <Footer />
      <Modal hasOpen={hasOpen} onCloseModal={closeModal} />
    </Box>
  );
}
