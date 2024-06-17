import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  StackDivider,
  Avatar,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { MdCheckCircle, MdEmail, MdPhone } from "react-icons/md";
import { FaStar } from 'react-icons/fa';
import NavbarHome from "pages/components/NavbarHome";

const Profile = () => {
  const [ratingData, setRatingData] = useState({ rating: 0, reviews: 20 });
  const [hasUpdatedReviews, setHasUpdatedReviews] = useState(false);

  const StarRating = () => {
    const [hover, setHover] = useState(0);

    const handleClick = (newRating) => {
      setRatingData((prevData) => ({
        rating: newRating,
        reviews: hasUpdatedReviews ? prevData.reviews : prevData.reviews + 1
      }));
      setHasUpdatedReviews(true);
    };

    return (
      <Box display="flex">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <FaStar
              key={i}
              color={i < (hover || ratingData.rating) ? "red" : "gray"}
              cursor="pointer"
              style={{ transition: "color 0.3s" }}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleClick(i + 1)}
            />
          ))}
      </Box>
    );
  };

  return (
    <Box>
      <NavbarHome />
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box maxW={"500px"}>
          <Stack spacing="4">
            <Box>
              <Flex>
                <Avatar
                  size="lg"
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                />
                <VStack align="start" pl="2">
                  <Text as="b" fontSize="xl">
                    Sayuru Sadaru
                  </Text>
                  <Text>Working Year: 2</Text>
                </VStack>
              </Flex>
              <Text pt="6" fontSize="sm" color={"gray"}>
                <b>{ratingData.rating}.0</b> ({ratingData.reviews} reviews)
              </Text>
              <Box pt={2}>
                <StarRating />
              </Box>
            </Box>
            <Divider />
            <Box>
              <Flex align="center" pt="2">
                <MdCheckCircle color="green" />
                <Text fontSize="sm" ml="2">
                  Verified ID
                </Text>
              </Flex>
              <Flex align="center" pt="2">
                <MdCheckCircle color="green" />
                <Text fontSize="sm" ml="2">
                  Confirmed email
                </Text>
              </Flex>
              <Flex align="center" pt="2">
                <MdCheckCircle color="green" />
                <Text fontSize="sm" ml="2">
                  Confirmed phone number
                </Text>
              </Flex>
            </Box>
            <Divider
              sx={{
                height: "5px",
                borderRadius: "md",
                backgroundColor: "gray.300"
              }}
            />
            <Box>
              <Heading size="xs">
                About Sayuru
              </Heading>
              <Text pt="2" fontSize="sm">
                I am a professional driver with 2 years of experience. I have a 5-star rating and I am a verified driver.
              </Text>
            </Box>
            <Divider
              sx={{
                height: "5px",
                borderRadius: "md",
                backgroundColor: "gray.300"
              }}
            />
            <Box>
              <Heading size="xs">
                Contact
              </Heading>
              <Flex align="center" pt="2">
                <MdEmail />
                <Text fontSize="sm" ml="2">
                  sayuru@gmail.com
                </Text>
              </Flex>
              <Flex align="center" pt="2">
                <MdPhone />
                <Text fontSize="sm" ml="2">
                  0771234567
                </Text>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
