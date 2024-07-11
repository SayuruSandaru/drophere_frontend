
import { Box, Flex, Image, Stack, Text, Heading, useMediaQuery, Spinner } from "@chakra-ui/react";
import React from "react";
import { LoginForm } from "./login_form";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
import Footer from "pages/components/footer";
import { colors } from "theme/colors";
import { login } from "api/auth";
import { driverByUser } from "api/driver";
import { useSetRecoilState } from "recoil";
import { tokenState, userState } from '../../state';
import User from "model/user";
import CookieManager from "api/cookieManager";

const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const credentials = { email, password };
      const { user, token } = await login(credentials);
      console.log(token);
      console.log(user);
      CookieManager.setCookie("token", token, 5);
      setToken(token);
      setUser(user);
      const userId = User.getUserId();
      console.log(userId);
      setLoading(false);
      navigate(RouterPaths.SEARCHRIDE);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const [isLargeScreen] = useMediaQuery('(min-width: 992px)');

  return (
    <Flex direction="column" h="100vh">

      {errorMessage && (
        <Box p={2} color="white" bg={"red.400"} textAlign="center">
          {errorMessage}
        </Box>
      )}

      {!isLargeScreen && (
        <Flex direction="row" bg={colors.primary[500]} p="5">
          <Heading m="auto" color="white">Drop Here</Heading>
        </Flex>
      )}



      <Flex direction="row">
        {isLargeScreen && (
          <Box w="50%" bg={colors.primary[500]}>
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
                Turn your empty seats into new friendships. Join us and share the journey
              </Text>
              <Box display="flex" flexDirection="column" justifyContent="flex-end" height="100vh">
                <Text fontWeight={300} color="white">© {new Date().getFullYear()} Drop Here. All rights reserved</Text>
              </Box>
            </Stack>
          </Box>
        )}
        <LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} onLogin={handleLogin} loading={loading} />
      </Flex>
    </Flex>
  );
};

export default Login;
