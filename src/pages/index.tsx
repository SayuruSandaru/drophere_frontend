import { Box, Flex, Spacer, Image, Stack, useTheme, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import React from "react";
import { Login } from "./login/login";
import { colors } from "theme/colors";
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('Login clicked');
    navigate('/register'); // Navigate to the next page after login
  };
  return (
    <Flex direction="row" minH="100vh">
      <Box w="50%" bgColor={colors.primary[100]}>
        <Stack direction={"column"} align="center" justify="center" h="100%" spacing={4}>
          <Image src="/images/L01.svg" w={300} />
          <Text fontSize="4xl" fontWeight="400" color={"black"}>Drop Here</Text>
          <Text fontSize="14px" fontWeight="300" color={"gray.600"} maxW="50%" textAlign="center">
            Lorem ipsum dolor sit consecteturis amet, consecteturis dolor sit amet
          </Text>
        </Stack>
      </Box>
      <Login onLogin={handleLogin} />
    </Flex>
  );
};

export default Home;
