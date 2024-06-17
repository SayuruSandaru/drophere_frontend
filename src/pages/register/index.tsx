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
import React from "react";
import { colors } from "theme/colors";
import { LoginForm } from "../login/login_form";
import { useNavigate } from "react-router-dom";
import { Sing_Up } from "./Sign_Up";
import { RouterPaths } from "router/routerConfig";


const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login clicked");
    navigate(RouterPaths.LOGIN);
  };

  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');


  return (
    <Box>
      <Flex direction="column" h="100vh">
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
          <Sing_Up onLogin={handleLogin} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Register;
