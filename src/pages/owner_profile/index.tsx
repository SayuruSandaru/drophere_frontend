import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Avatar,
  Heading,
  Divider,
  Input,
  Button,
  useMediaQuery,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Icon,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { MdCheckCircle, MdEmail, MdPhone, MdStar } from "react-icons/md";
import { FaPaperPlane, FaCamera } from 'react-icons/fa';
import NavbarHome from "pages/components/NavbarHome";
import Footer from "pages/components/footer";
import Rating from "react-rating";
import ReviewItem from "./review_card";
import { getReviews, createReview } from "api/review";
import { getUserDetails } from "api/user";

const Profile = () => {
  const [ratingData, setRatingData] = useState({ rating: 0, reviews: 0 });
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [userDetails, setUserDetails] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews();
        console.log("Fetched Reviews:", fetchedReviews);
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
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const fetchedUserDetails = await getUserDetails();
        setUserDetails(fetchedUserDetails);
        console.log("Fetched User Details:", fetchedUserDetails);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleAddReview = async () => {
    try {
      setIsLoading(true);
      console.log("Submitting review:", { description: newReview.comment, rating: newReview.rating, driver_id: 1 });
      const response = await createReview({ description: newReview.comment, rating: newReview.rating, driver_id: 1 });
      console.log("Response from createReview:", response);
      const updatedReviews = await getReviews();
      console.log("Updated Reviews:", updatedReviews);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const ReviewsAndComments = () => (
    <Box pl={isLargeScreen ? 10 : 0}>
      <Box maxW={"500px"} borderRadius={10} padding={10}>
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

  const UserDetailsCard = () => (
    <Box borderRadius={10} maxWidth={"700px"}>
      <Stack spacing="4" bgColor={"white"} paddingX={"30px"} paddingY={"20px"} borderRadius={"10px"}>
        <Box>
          <Flex>
            <Box position="relative" display="inline-block">
              <Avatar
                size="lg"
                name={userDetails.user.username}
                src={userDetails.user.proof_document}
                cursor="pointer"
                onClick={onOpen}
              />
              <Icon
                as={FaCamera}
                boxSize={6}
                position="absolute"
                bottom={0}
                right={0}
                bg="white"
                borderRadius="full"
                p={1}
                color="gray.700"
              />
            </Box>
            <Text as="b" fontSize="xl" ml={"10px"} mt={4}>
              {userDetails.user.username}
            </Text>
          </Flex>
        </Box>
        <Text pt="6" fontSize="sm" color={"gray"}>
          <b>{ratingData.rating.toFixed(1)}</b> ({ratingData.reviews} reviews)
        </Text>
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
          <Heading size="xs">Contact</Heading>
          <Flex align="center" pt="2">
            <MdEmail />
            <Text fontSize="sm" ml="2">
              {userDetails?.user.email}
            </Text>
          </Flex>
          <Flex align="center" pt="2">
            <MdPhone />
            <Text fontSize="sm" ml="2">
              {userDetails.user.phone}
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
  );

  return (
    <Box>
      <Box h={20}>
        <NavbarHome />
      </Box>
      {userDetails === null ? (
        <Flex justifyContent="center" alignItems="center" h="90vh">
          <Spinner />
        </Flex>
      ) : (
        <Flex
          position="relative"
          justifyContent="center"
          alignItems="start"
          bg={"gray.50"}
          padding={10}
          flexDirection={isLargeScreen ? "row" : "column"}
        >
          <UserDetailsCard />
          {isLargeScreen && <ReviewsAndComments />}
        </Flex>
      )}
      {!isLargeScreen && <ReviewsAndComments />}
      <Footer />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a profile picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" accept="image/*" onChange={handleFileChange} borderStyle="none" />
            <Button
              mt={4}
              bg="#2b8ab0"
              color="white"
              width="full"
              _hover={{ bg: "#1a688b" }}
              _active={{ bg: "#1a688b" }}
              _focus={{ boxShadow: "none" }}
              borderRadius="md"
              boxShadow="md"
              py={3}
            >
              Upload
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;
