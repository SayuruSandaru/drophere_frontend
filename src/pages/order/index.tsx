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
} from "@chakra-ui/react";
import { colors } from "theme/colors";
import StarRating from "./components/starRating";
import { Timeline } from "react-responsive-timeline";
import Modal from "./components/payment";
import React, { useState } from "react";
import "./components/order.css";
import { MdEmail, MdPhone } from "react-icons/md";
import { RouterPaths } from "router/routerConfig";
import { useNavigate } from "react-router-dom";

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
    <Center py={6}>
      <Box
        maxW={"700px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack spacing={0} align={"center"} mt={5} ml={5} mb={5}>
          <Heading
            fontSize={"4xl"}
            fontWeight={600}
            fontFamily={"body"}
            color={colors.primary[500]}
          >
            MON 5 JUNE
          </Heading>
        </Stack>

        <Flex justify={"left"} ml={20} mt={12} >
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "2px solid white",
            }}
            cursor={"pointer"}
            onClick={() => navigate(RouterPaths.PROFILE)}
          />

          <Stack spacing={0} align={"left"} mt={2} ml={5} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"} onClick={() => navigate(RouterPaths.PROFILE)} cursor={"pointer"}>
              Sayuru Sandaru
            </Heading>
            <Text color={"gray.500"}>
              <StarRating rating={rating} reviews={reviews} />
            </Text>
            <Text color={"gray.500"}>{joinDate}</Text>{" "}
            {/* Add the join date here */}
          </Stack>
        </Flex>

        <Box p={6}>
          <Stack ml={16}>
            <div className="time">
              <Timeline
                timelines={[
                  {
                    title: "Colombo, Sri Lanka",
                    sub: "2.30 PM",
                  },
                  {
                    title: "Kandy, Sri Lanka",
                    sub: "4.30 PM",
                  },
                ]}
              />
            </div>
          </Stack>
          <hr className="hr"></hr>

          <Flex justify={"Center"}>
            <Stack spacing={0} align={"left"} mt={10} ml={0} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                Price Rs.500
              </Heading>
            </Stack>
          </Flex>
          <hr className="hr"></hr>

          <Stack spacing={3} align={'left'} ml={20} mt={5}> {/* Adding spacing and margin top */}
            <Flex align={'center'}>
              <MdEmail style={{ marginRight: '8px' }} />
              <Text color={'gray.500'}>{email}</Text>
            </Flex>
            <Flex align={'center'}>
              <MdPhone style={{ marginRight: '8px' }} />
              <Text color={'gray.500'}>{phone}</Text>
            </Flex>
          </Stack>

          <Stack align={"center"}>
            <Button
              onClick={openModal}
              w={"full"}
              maxW={"600px"}
              mt={8}
              height={"50px"}
              fontSize={"25px"}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Book
            </Button>
          </Stack>
        </Box>
      </Box>
      <Modal hasOpen={hasOpen} onCloseModal={closeModal} />
    </Center>
  );
}
