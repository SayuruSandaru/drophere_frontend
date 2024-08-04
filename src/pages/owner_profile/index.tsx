import React, { useState, useEffect, useCallback } from "react";
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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Grid,
  useToast
} from "@chakra-ui/react";
import { MdCheckCircle, MdEmail, MdPhone, MdStar } from "react-icons/md";
import { FaPaperPlane, FaCamera } from 'react-icons/fa';
import NavbarHome from "pages/components/NavbarHome";
import Footer from "pages/components/footer";
import Rating from "react-rating";
import ReviewItem from "./review_card";
import { getReviews, createReview } from "api/review";
import { getUserDetails } from "api/user";
import { fileUpload } from "api/common";
import authService from "api/services/authService";
import User from "model/user";

const Profile = () => {
  const [ratingData, setRatingData] = useState({ rating: 0, reviews: 0 });
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargeScreen] = useMediaQuery("(min-width: 992px)");
  const toast = useToast();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews();
        if (Array.isArray(fetchedReviews)) {
          setReviews(fetchedReviews);
          const averageRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0) / fetchedReviews.length;
          setRatingData({ rating: averageRating, reviews: fetchedReviews.length });
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
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
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleAddReview = async () => {
    try {
      setIsLoading(true);
      const response = await createReview({
        description: newReviewComment,
        rating: newReviewRating,
        driver_id: 1
      });
      const updatedReviews = await getReviews();
      if (Array.isArray(updatedReviews)) {
        setReviews(updatedReviews);
        const averageRating = updatedReviews.reduce((acc, review) => acc + review.rating, 0) / updatedReviews.length;
        setRatingData({ rating: averageRating, reviews: updatedReviews.length });
        setNewReviewRating(0);
        setNewReviewComment("");
      } else {
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
      setSelectedFile(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile || !userDetails || !userDetails.user || !userDetails.user.email) {
      console.error('Missing required data:', { selectedFile, userDetails });
      toast({
        title: "Error",
        description: "Missing required data for upload",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      console.log('Uploading document for user:', userDetails.user.email);
      const url = await fileUpload(selectedFile);
      console.log('File uploaded, received URL:', url);

      const response = await authService.updateUserImg(userDetails.user.email, url);
      console.log('Profile update response:', response);

      if (response && response.status === "success") {
        toast({
          title: "Profile image updated",
          description: "Your profile image has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Update the local state immediately
        setUserDetails(prevDetails => ({
          ...prevDetails,
          user: {
            ...prevDetails.user,
            profile_image: url
          }
        }));
      } else {
        throw new Error(response.message || "Failed to update profile image");
      }

      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to upload file:", error);
      toast({
        title: "Error",
        description: `Failed to update profile image: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setNewReviewComment(value);
  }, []);

  const ReviewsAndComments = () => (
    <Box pl={isLargeScreen ? 10 : 0}>
      <Box maxW={"900px"} borderRadius={10} padding={10}>
        <Heading size="md" mt={-10} mb={8}>Reviews and Comments</Heading>
        {isLoading ? (
          <Spinner />
        ) : (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
          </Grid>
        )}
      </Box>
    </Box>
  );

  const UserDetailsCard = () => (
    <Box borderRadius={10} maxWidth={"700px"} width={"600px"} boxShadow="lg">
      <Stack spacing="4" bgColor={"white"} paddingX={"30px"} paddingY={"20px"} borderRadius={"10px"}>
        <Box>
          <Flex>
            <Box position="relative" display="inline-block">
              <Avatar
                size="lg"
                name={userDetails.user.username}
                src={userDetails.user.profile_image}
              />
              {User.isDriver() && User.getUserId() === userDetails.user.id && (
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
                  cursor="pointer"
                  onClick={onOpen}
                />
              )}
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
              initialRating={newReviewRating}
              emptySymbol={<MdStar size={20} color="gray" />}
              fullSymbol={<MdStar size={20} color="gold" />}
              onChange={(rate) => setNewReviewRating(rate)}
            />
          </Flex>
          <Flex>
            <Input
              placeholder="Comment"
              value={newReviewComment}
              onChange={handleChange}
              mb={3}
              mr={2}
              borderRadius={5}
              focusBorderColor="blue.500"
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
              onClick={uploadImage}
              isLoading={isLoading}
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
