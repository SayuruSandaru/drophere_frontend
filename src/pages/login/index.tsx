import { Box, Flex, Image, Stack, Text, Heading, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { LoginForm } from "./login_form";
import { colors } from "theme/colors";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Login clicked');
    navigate(RouterPaths.HOME); // Navigate to the next page after login
  };

  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
  return (
    <Flex direction="column" h="100vh">
      {!isLargeScreen && (
        <Flex direction="row" bg={colors.primary[500]} p="5">
          <Heading m="auto" color="white">Drop Here</Heading>
        </Flex>
      )}

      <Flex direction="row" >
        {isLargeScreen && (
          <Box w="50%" bg={colors.primary[500]} >
            <Stack direction="column" p="50" h="100vh" spacing={4}>
              <Flex alignItems="center">
                <Image src="/images/White_T.png" w={"14"} />
                <Text fontSize="30px" fontWeight="800" color="white" ml={-2}>Drop Here</Text>
              </Flex>

              <Text fontSize="40px" fontWeight="600" color="white" pt="20%" lineHeight="shorter">
                Join the Journey, <br />
                <Text as='em'><Text as='u'>Share</Text></Text> the Road
              </Text>
              <Text minW={400} color="white" fontFamily={"sans-serif"}>
                Turn your empty seats into new friendships. Join us and share the journey              </Text>
              <Box display="flex" flexDirection="column" justifyContent="flex-end" height="100vh">
                <Text fontWeight={300} color="white">© {new Date().getFullYear()} Drop Here. All rights reserved</Text>
              </Box>
            </Stack>
          </Box>
        )}
        <LoginForm onLogin={handleLogin} />
      </Flex>
    </Flex>
  );
};

export default Login;
