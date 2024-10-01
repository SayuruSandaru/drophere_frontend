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
import { useParams } from "react-router-dom";
import { getUserById } from "api/user";

// Move UserDetailsCard outside of the Profile component
const UserDetailsCard = ({
  userDetails,
  ratingData,
  isLargeScreen,
  onOpen,
  newReviewRating,
  setNewReviewRating,
  newReviewComment,
  handleChange,
  handleAddReview,
  userId
}) => (
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
            {User.isDriver() && User.getUserId() === parseInt(userId) && (
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

// Move ReviewsAndComments outside of the Profile component
const ReviewsAndComments = ({ isLargeScreen, isLoading, reviews }) => (
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
              comment={review.description || "No comment"}
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
  const { driver_id: userId } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews(driverId || User.getDriverDetails().driver_id);
        if (Array.isArray(fetchedReviews)) {
          const filteredReviews = fetchedReviews;
          setReviews(filteredReviews);
          const averageRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length;
          setRatingData({ rating: averageRating, reviews: filteredReviews.length });
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
  }, [userId, driverId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await getUserById(userId);
          if (response.status === "success") {
            setUserDetails({ user: response.user });
            setDriverId(response.user.driver_id);
            setIsCurrentUser(User.getUserId().toString() === userId);
          }
        } else {
          const fetchedUserDetails = await getUserDetails();
          setUserDetails(fetchedUserDetails);
          setIsCurrentUser(true);
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleAddReview = async () => {
    try {
      setIsLoading(true);
      console.log("Adding review");
      console.log("User details", User.getDriverDetails());
      console.log("User email", userDetails.user.email);
      if(User.getUserEmail() === userDetails.user.email) {
        toast({
          title: "Error",
          description: `You cannot review yourself`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      await createReview({
        description: newReviewComment,
        rating: newReviewRating,
        driver_id: driverId || User.getDriverDetails().driver_id
      });
      // Fetch reviews again after adding a new one
      const updatedReviews = await getReviews(driverId || User.getDriverDetails().driver_id);
      if (Array.isArray(updatedReviews)) {
        const filteredReviews = updatedReviews;
        setReviews(filteredReviews);
        const averageRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length;
        setRatingData({ rating: averageRating, reviews: filteredReviews.length });
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
        position: "top",
      });
      return;
    }

    try {
      setIsLoading(true);

      const url = await fileUpload(selectedFile);
      const response = await authService.updateUserImg(userDetails.user.email, url);

      if (response && response.status === "success") {
        toast({
          title: "Profile image updated",
          description: "Your profile image has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

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
        position: "top",
      });
    }
  };

  const handleChange = useCallback((e) => {
    setNewReviewComment(e.target.value);
  }, []);

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
          <UserDetailsCard
            userDetails={userDetails}
            ratingData={ratingData}
            isLargeScreen={isLargeScreen}
            onOpen={onOpen}
            newReviewRating={newReviewRating}
            setNewReviewRating={setNewReviewRating}
            newReviewComment={newReviewComment}
            handleChange={handleChange}
            handleAddReview={handleAddReview}
            userId={userId}
          />
          {isLargeScreen && (
            <ReviewsAndComments
              isLargeScreen={isLargeScreen}
              isLoading={isLoading}
              reviews={reviews}
            />
          )}
        </Flex>
      )}
      {!isLargeScreen && (
        <ReviewsAndComments
          isLargeScreen={isLargeScreen}
          isLoading={isLoading}
          reviews={reviews}
        />
      )}
      {/* <Footer /> */}

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
