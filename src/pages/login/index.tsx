import { Box, Flex, Image, Stack, Text, useBreakpointValue, Heading } from "@chakra-ui/react";
import React from "react";
import { LoginForm } from "./login_form";
import { colors } from "theme/colors";
import { useNavigate } from 'react-router-dom';
// import logo from "../../assets/White_T.png";
// import logo from "../";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('Login clicked');
    navigate('/register'); // Navigate to the next page after login
  };

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex direction="column" h="100vh">
      {!isLargeScreen && (
        <Flex direction="row" bg={colors.primary[500]} p="5">
          <Heading m={"auto"} color={"white"}>Drop Here</Heading>
        </Flex>
      )}

      <Flex direction="row" h="100vh">
        {isLargeScreen && (
          <Box w="50%" bg={colors.primary[500]}>
            <Stack direction={"column"} p="50" h="100%" spacing={4}>
              {/* <Image src="/images/L01.svg" w={300} /> */}

            <Flex alignItems="center">
              <Image src="/images/White_T.png" w={100} />
              <Text fontSize="30px" fontWeight="800" color={"white"} ml={-2}>Drop Here</Text>
            </Flex>

              <Text fontSize="40px" fontWeight="600" color={"white"} pt="20%" lineHeight="shorter">
                Join the Journey, <br/>
                <Text as='em'><Text as='u'>Share</Text></Text> the Road </Text>

                <Text w={500} color={"white"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit sapiente perferendis numquam sit</Text>

          
                <Text fontWeight={300} color={"white"} pt="250">© 2021 Drop Here. All rights reserved</Text>


            </Stack>
          </Box>
        )}
        <LoginForm onLogin={handleLogin} />
      </Flex>
    </Flex>
  );
};

export default Login;