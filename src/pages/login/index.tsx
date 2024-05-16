import { Box, Flex, Image, Stack, Text, useBreakpointValue, Heading } from "@chakra-ui/react";
import React from "react";
import { LoginForm } from "./login_form";
import { colors } from "theme/colors";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('Login clicked');
    navigate('/register'); // Navigate to the next page after login
  };

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex direction="column" minH="100vh">
      {!isLargeScreen && (
        <Flex direction="row" bg={colors.primary[100]} p="5">
          <Heading m={"auto"}>Drop Here</Heading>
        </Flex>
      )}
      <Flex direction="row" flexGrow={1}>
        {isLargeScreen && (
          <Box w="50%" bgColor={colors.primary[100]}>
            <Stack direction={"column"} align="center" justify="center" h="100%" spacing={4}>
              <Image src="/images/L01.svg" w={300} />
              <Text fontSize="4xl" fontWeight="400" color={"black"}>Drop Here</Text>
              <Text fontSize="14px" fontWeight="300" color={"gray.600"} maxW="50%" textAlign="center">
                Lorem ipsum dolor sit consecteturis amet, consecteturis dolor sit amet
              </Text>
            </Stack>
          </Box>
        )}
        <LoginForm onLogin={handleLogin} />
      </Flex>
    </Flex>
  );
};

export default Login;