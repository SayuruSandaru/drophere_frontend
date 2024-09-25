import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Flex,
  Image,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { PasswordField } from "../login/components/passwordField";
import { isValidPhoneNumber } from "libphonenumber-js";
import { auth } from '../../firebase'; 
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { RouterPaths } from "router/routerConfig";
import { on } from "events";
import { set } from "date-fns";

const Signinindex = "./";

interface SignUpProps {
  firstName: string;
  lastName: string;
  username: string;
  mobileNumber: string;
  email: string;
  password: string;
  loading: boolean;
  profileImage: File | null;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setUsername: (value: string) => void;
  setMobileNumber: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSignUp: (formData: FormData) => void;
  setProfileImage: (value: File) => void;
}

export const Sign_Up: React.FC<SignUpProps> = ({
  firstName,
  lastName,
  username,
  mobileNumber,
  email,
  password,
  loading,
  profileImage,
  setFirstName,
  setLastName,
  setUsername,
  setMobileNumber,
  setEmail,
  setPassword,
  setProfileImage,
  onSignUp,
}) => {
  
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);  // Local state for button loading
  const formData = new FormData();
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const navigator = useNavigate();

  const [phoneVerification, setPhoneVerification] = useState(false);
  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, 'register-btn-recapture', // Attach reCAPTCHA to the button's ID
        {
          size: 'invisible',  
          callback: (response) => {
            console.log('reCAPTCHA solved');
            sendVerificationCode();
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired, please try again.');
          }
        },
      );

      window.recaptchaVerifier.verify();
    } else {
      console.log("Already verified");
      sendVerificationCode();
    }
  };

  const sendVerificationCode = () => {
    const phoneNumber = `+${mobileNumber}`; // Ensure the phone number includes the country code
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult); // Save the confirmation result for verification
        console.log('SMS sent.');
        onOpen();  // Open the modal to enter the verification code
        setIsLoading(false);  // Stop loading spinner after SMS is sent
      })
      .catch((error) => {
        console.error('Error sending SMS:', error);
        setIsLoading(false);  // Stop loading spinner if there is an error
      });
  };

  const verifyCode = () => {
    setIsLoading(true);  // Start loading spinner when verifying the code
    if (confirmationResult) {
      confirmationResult.confirm(verificationCode)
        .then((result) => {
          const user = result.user;  // User successfully signed in
          console.log('Phone number verified! User:', user);
          onClose();  
          setPhoneVerification(true);
          onSignUp(formData);  
          setIsLoading(false); 
        })
        .catch((error) => {
          console.error('Error verifying code:', error);
          setIsLoading(false);  // Stop loading spinner on error
        });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName) {
      newErrors.firstName = "First name is required";
    } else if (/\d/.test(firstName)) {
      newErrors.firstName = "First name should not contain numbers";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    } else if (/\d/.test(lastName)) {
      newErrors.lastName = "Last name should not contain numbers";
    }

    if (!username) newErrors.username = "Username is required";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) newErrors.password = "Password is required";

    if (!profileImage) newErrors.profileImage = "Profile image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    setIsLoading(true);  // Start the loading spinner when sign-up begins
    if (validateForm()) {
      
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("username", username);
      formData.append("mobileNumber", mobileNumber);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      if(!phoneVerification) {
        setupRecaptcha();  
      }else{
        onSignUp(formData);  
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);  // Stop loading spinner if form validation fails
    }
  };

  return (
    <Flex direction="column" justifyContent={"center"} m="auto">
      <Container
        maxW="lg"
        pt={{ base: "12", md: "24" }}
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack>
            <Image src="/images/Black_T.png" w={"24"} m="auto" />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size="xs">Create your account</Heading>
              <Text color="fg.muted">
                Already have an account? <Link href={Signinindex}>Sign in</Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <Flex>
                  <FormControl mr={4} isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && (
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && (
                      <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                    )}
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.mobileNumber}>
                  <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  {errors.mobileNumber && (
                    <FormErrorMessage>{errors.mobileNumber}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  )}
                </FormControl>
                <PasswordField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password}
                />
                <FormControl isInvalid={!!errors.profileImage}>
                  <FormLabel htmlFor="profileImage">Profile Image</FormLabel>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                  {errors.profileImage && (
                    <FormErrorMessage>{errors.profileImage}</FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button
                  id="register-btn"
                  bgColor={"black"}
                  onClick={handleSignUp}
                  color="white"
                  _hover={{ bgColor: "gray.700" }}
                >
                  {isLoading ? (
                    <Spinner size="md" ml={2} /> // Show spinner when loading
                  ) : (
                    "Register"
                  )}
                </Button>
                <div id="register-btn-recapture"></div>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>

      {/* Modal for entering verification code */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Verification Code</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="verificationCode">Verification Code</FormLabel>
              <Input
                id="verificationCode"
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={verifyCode}>
              Verify
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
