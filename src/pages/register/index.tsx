import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { colors } from "theme/colors";
import { LoginForm } from "../login/login_form";
import { useNavigate } from "react-router-dom";
import { Sign_Up } from "./Sign_Up";
import { RouterPaths } from "router/routerConfig";
import { register } from "module";
import { registerUser } from "api/auth";
import { fileUpload } from "api/common";
import { useShowErrorToast } from "pages/components/toast";


const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const navigate = useNavigate();
  const showErrorToast = useShowErrorToast();


  const uploadProofDocument = async () => {
    try {
      if (!profileImage) {
        throw new Error('Please upload a profile image');
      }
      setLoading(true);
      const res = await fileUpload(profileImage);
      return res;
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.message || 'Failed to upload document. Please try again.';
      showErrorToast("Failed to upload document. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      console.log("Registering user");
      console.log("email: ", email);
      const url = await uploadProofDocument();

      await registerUser(
        {
          email: email,
          password: password,
          firstname: firstName,
          lastname: lastName,
          username: username,
          phone: mobileNumber,
          profile_image: url,
        }
      );
      setLoading(false);
      navigate(RouterPaths.LOGIN);
    } catch (error) {
      setLoading(false);
      // setErrorMessage(error.message);
      showErrorToast(error.message);
    }
  };

  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');


  return (
    <Box>
      <Flex direction="column" h="100vh">
        {/* {errorMessage && (
          <Box p={2} color="white" bg={"red.400"} textAlign="center">
            {errorMessage}
          </Box>
        )} */}
        {!isLargeScreen && (
          <Flex direction="row" bg="#2bb07b" p="5">
            <Heading m={"auto"} color={"white"}>
              Drop Here
            </Heading>
          </Flex>
        )}
        <Flex direction="row">
          {isLargeScreen && (
            <Box w={["100%", "100%", "50%"]} bg="#2bb07b">
              <Stack direction="column" p="50" h="100vh" spacing={4}>
                <Flex alignItems="center">
                  <Image src="/images/White_T.png" w={"14"} />
                  <Text fontSize="30px" fontWeight="800" color="white" ml={-2}>
                    Drop Here
                  </Text>
                </Flex>

                <Text fontSize="40px" fontWeight="600" color="white" pt="20%" lineHeight="shorter">

                  Be Part of Something Bigger!
                </Text>
                <Text minW={400} color="white">

                  Connect, share, and explore with our community. Sign up today
                  and start sharing your space.
                </Text>
              </Stack>
            </Box>
          )}
          <Sign_Up
            firstName={firstName}
            lastName={lastName}
            username={username}
            mobileNumber={mobileNumber}
            email={email}
            password={password}
            profileImage={profileImage}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setUsername={setUsername}
            setMobileNumber={setMobileNumber}
            setEmail={setEmail}
            setPassword={setPassword}
            setProfileImage={setProfileImage}
            onSignUp={handleRegister}

            loading={loading}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Register;