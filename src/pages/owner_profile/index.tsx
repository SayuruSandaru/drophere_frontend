import React, { useState, useEffect } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { MdCheckCircle, MdEmail, MdPhone, MdStar } from "react-icons/md";
import { FaPaperPlane } from 'react-icons/fa';
import NavbarHome from "pages/components/NavbarHome";
import Footer from "pages/components/footer";
import Rating from "react-rating";
import ReviewItem from "./review_card";
import { getReviews, createReview } from "api/review"; // Ensure to import these functions

const Profile = () => {
  const [ratingData, setRatingData] = useState({ rating: 0, reviews: 0 });
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews();
        console.log("Fetched Reviews:", fetchedReviews); // Log fetched reviews

        if (Array.isArray(fetchedReviews)) {
          setReviews(fetchedReviews);
          const averageRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0) / fetchedReviews.length;
          setRatingData({ rating: averageRating, reviews: fetchedReviews.length });
        } else {
          console.error("Fetched reviews is not an array");
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        setReviews([]); // Set reviews to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);




  const handleAddReview = async () => {
    try {
      setIsLoading(true);
      console.log("Submitting review:", { description: newReview.comment, rating: newReview.rating, driver_id: 1 }); // Log the data being sent
      const response = await createReview({ description: newReview.comment, rating: newReview.rating, driver_id: 1 }); // Replace with appropriate driver_id
      console.log("Response from createReview:", response); // Log the response
      const updatedReviews = await getReviews();
      console.log("Updated Reviews:", updatedReviews); // Log updated reviews
      if (Array.isArray(updatedReviews)) {
        setReviews(updatedReviews);
        const averageRating = updatedReviews.reduce((acc, review) => acc + review.rating, 0) / updatedReviews.length;
        setRatingData({ rating: averageRating, reviews: updatedReviews.length });
        setNewReview({ rating: 0, comment: "" });
      } else {
        console.error("Updated reviews is not an array");
        setReviews([]);
      }
    } catch (error) {
      console.error("Failed to add review", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ReviewsAndComments = () => (
    <Box pl={isLargeScreen ? 10 : 0}>
      <Box maxW={"500px"} borderRadius={10} padding={10} bg={"white"}>
        <Heading size="md" mb={8}>Reviews and Comments</Heading>
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing={5}>
            {Array.isArray(reviews) && reviews.length > 0 ? reviews.map((review, index) => (
              <ReviewItem
                key={index}
                name={review.username || "Anonymous"}
                comment={review.comment || review.description || "No comment"}
                rating={review.rating}
              />
            )) : (
              <Text>No reviews available.</Text>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );



  return (
    <Box>
      <Box h={20}>
        <NavbarHome />
      </Box>
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="start"
        bg={"gray.50"}
        padding={10}
      >
        <Flex maxW={"1200px"} w="full">
          <Box borderRadius={10}>
            <Stack spacing="4">
              <Box>
                <Flex>
                  <Avatar
                    size="lg"
                    name="John"
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
                  <b>{ratingData.rating.toFixed(1)}</b> ({ratingData.reviews} reviews)
                </Text>
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
              <Divider />
              <Box>
                <Heading size="xs">About John</Heading>
                <Text pt="2" fontSize="sm">
                  I am a professional driver with 2 years of experience. I have a 5-star rating and I am a verified driver.
                </Text>
              </Box>
              <Divider />
              <Box>
                <Heading size="xs">Contact</Heading>
                <Flex align="center" pt="2">
                  <MdEmail />
                  <Text fontSize="sm" ml="2">
                    john@gmail.com
                  </Text>
                </Flex>
                <Flex align="center" pt="2">
                  <MdPhone />
                  <Text fontSize="sm" ml="2">
                    0771234567
                  </Text>
                </Flex>
              </Box>
              <Divider />
              <Box>
                <Heading size="xs" mb={3} mt={3}>Add a New Review</Heading>
                <Flex>
                  <Text fontSize="sm" mr={2}>Rating: </Text>
                  <Rating
                    initialRating={newReview.rating}
                    emptySymbol={<MdStar size={20} color="gray" />}
                    fullSymbol={<MdStar size={20} color="gold" />}
                    onClick={(rate) => setNewReview({ ...newReview, rating: rate })}
                  />
                </Flex>
                <Flex>
                  <Input
                    placeholder="Comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    mb={3}
                    mr={2}
                    borderRadius={5}
                  />
                  <Button onClick={handleAddReview} bg={"transparent"}>
                    <FaPaperPlane />
                  </Button>
                </Flex>
              </Box>
            </Stack>
          </Box>
          {isLargeScreen && <ReviewsAndComments />}
        </Flex>
      </Flex>
      {!isLargeScreen && <ReviewsAndComments />}
      <Footer />
    </Box>
  );
};

export default Profile;
