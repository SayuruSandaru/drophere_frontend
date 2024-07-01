import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Avatar,
  VStack,
  Heading,
  Divider,
  Input,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdCheckCircle, MdEmail, MdPhone, MdStar } from "react-icons/md";
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import NavbarHome from "pages/components/NavbarHome";
import Footer from "pages/components/footer";
import Rating from "react-rating";
import ReviewItem from "./review_card";

const Profile = () => {
  const [ratingData, setRatingData] = useState({ rating: 0, reviews: 20 });
  const [hasUpdatedReviews, setHasUpdatedReviews] = useState(false);

  const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

  const StarRating = () => {
    const [hover, setHover] = useState(0);

    const handleClick = (newRating) => {
      setRatingData((prevData) => ({
        rating: newRating,
        reviews: hasUpdatedReviews ? prevData.reviews : prevData.reviews + 1,
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

  const ReviewsAndComments = () => {
    return (
      <Box pl={isLargeScreen ? 10 : 0}>
        <Box maxW={"500px"} borderRadius={10} padding={10} bg={"white"}>
          <Heading size="md" mb={8}>Reviews and Comments</Heading>
          <Stack spacing={5}>
            <ReviewItem name="John Doe" comment="Excellent driver! Very punctual and professional." rating={4.5} />
            <ReviewItem name="Jane Smith" comment="Great service, highly recommend!" rating={5} />
            <ReviewItem name="Alice Johnson" comment="Very friendly and safe driver." rating={4} />
            <ReviewItem name="Bob Brown" comment="Good experience, will book again." rating={4.2} />
            <ReviewItem name="Carol White" comment="Professional and on time." rating={4.8} />
            <ReviewItem name="Dave Black" comment="The ride was comfortable and smooth." rating={4.7} />
            <ReviewItem name="Eve Blue" comment="Satisfied with the service." rating={4.3} />
            <ReviewItem name="Frank Green" comment="Highly recommended!" rating={5} />
          </Stack>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box h={20}>
        <NavbarHome />
      </Box>
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="start"
        // height="100vh"
        bg={"gray.50"}
        padding={10}
      >
        <Flex maxW={"1200px"} w="full" >
          <Box borderRadius={10}>
            <Stack spacing="4">
              <Box>
                <Flex>
                  <Avatar
                    size="lg"
                    name="Sayuru Sadaru"
                    src="https://bit.ly/prosper-baba"
                  />
                  <VStack align="start" pl="2">
                    <Text as="b" fontSize="xl">
                      John
                    </Text>
                    <Text>Working Year: 2</Text>
                  </VStack>
                </Flex>
                <Text pt="6" fontSize="sm" color={"gray"}>
                  <b>{ratingData.rating}.0</b> ({ratingData.reviews} reviews)
                </Text>
                {/* <Box pt={2}>
                  <StarRating />
                </Box> */}
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
                  backgroundColor: "gray.300",
                }}
              />
              <Box>
                <Heading size="xs">About Sayuru</Heading>
                <Text pt="2" fontSize="sm">
                  I am a professional driver with 2 years of experience. I have a 5-star rating and I am a verified driver.
                </Text>
              </Box>
              <Divider
                sx={{
                  height: "5px",
                  borderRadius: "md",
                  backgroundColor: "gray.300",
                }}
              />
              <Box>
                <Heading size="xs">Contact</Heading>
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
              <Divider
                sx={{
                  height: "5px",
                  borderRadius: "md",
                  backgroundColor: "gray.300",
                }}
              />
              <Box>
                <Heading size="xs" mb={3} mt={3}>Add a New Review</Heading>
                <Flex> <Text fontSize="sm" mr={2}>Rating: </Text>
                  <Rating
                    initialRating={3}
                    emptySymbol={<MdStar size={20} color="gray" />}
                    fullSymbol={<MdStar size={20} color="gold" />}
                    onClick={(rate) => { }}
                  /></Flex>
                <Flex>
                  <Input
                    placeholder="Comment"
                    value={""}
                    onChange={(e) => { }}
                    mb={3}
                    mr={2}
                    borderRadius={5}
                  />
                  <Button bg={"transparent"}><FaPaperPlane /></Button>
                </Flex>
              </Box>
            </Stack>
          </Box>
          {isLargeScreen && (
            <ReviewsAndComments />
          )}
        </Flex>
      </Flex>
      {!isLargeScreen && <ReviewsAndComments />}
      <Footer />
    </Box>
  );
};

export default Profile;
