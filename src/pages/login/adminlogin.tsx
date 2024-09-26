import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Heading,
  useMediaQuery,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RouterPaths } from "router/routerConfig";
import { colors } from "theme/colors";
import { adminLogin, login } from "api/auth";
import { useSetRecoilState } from "recoil";
import { tokenState, userState } from "../../state";
import User from "model/user";
import CookieManager from "api/cookieManager";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  //handel admin login
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const { user, token } = await adminLogin({ email, password });
      setToken(token);
      setUser(user);
      CookieManager.setCookie("token", token, 5);
      // User.setUserDetail(user);
      navigate(RouterPaths.ADMINHOME);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };


  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');

  return (
    <Flex direction="column" minH="100vh" bg={colors.primary}>
      {/* Error Message */}
      {errorMessage && (
        <Box p={2} color="white" bg="red.400" textAlign="center">
          {errorMessage}
        </Box>
      )}

      {/* Header for Small Screens */}
      {!isLargeScreen && (
        <Flex direction="row" bg={colors.primary[500]} p="5">
          <Heading m="auto" color="white">Admin Portal</Heading>
        </Flex>
      )}

      {/* Main Content */}
      <Flex direction="row" justify="center" align="center" flexGrow={1}>
        {/* Admin Branding Side for Larger Screens */}
        {isLargeScreen && (
          <Box w="50%" bg={colors.primary[600]} p={8} textAlign="center">
          <Box w="20%" h="20%" mb={8} bg="blue" borderRadius="50%" mx="auto" />
          <Heading color="blue.300">Welcome Back, Admin</Heading>
          <Text fontSize="lg" color="whiteAlpha.800" mt={4}>
            Please enter your credentials to continue.
          </Text>
        </Box>
        
        )}

        {/* Login Form */}
        <Box w={isLargeScreen ? "30%" : "100%"} p={8}>
          <Stack spacing={4}>
            <Heading size="lg" mb={6} textAlign="center">
              Admin Login
            </Heading>

            {/* Email Field */}
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            {/* Password Field */}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            {/* Login Button */}
            <Button
              mt={4}
              colorScheme="blue"
              onClick={handleLogin}
              isLoading={loading}
              loadingText="Logging in..."
            >
              Login
            </Button>

            {/* Show Spinner when loading */}
            {loading && <Spinner size="lg" color="blue.500" mx="auto" />}

            {/* Footer message */}
            <Text fontSize="sm" color="gray.500" textAlign="center">
              © {new Date().getFullYear()} Admin Portal. All rights reserved.
            </Text>
          </Stack>
        </Box>
      </Flex>

    </Flex>
  );
};

export default AdminLogin;
