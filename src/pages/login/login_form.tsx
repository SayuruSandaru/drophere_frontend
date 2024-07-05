import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Flex,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { PasswordField } from "./components/passwordField";

const Signupindex = "/register";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onLogin: () => void;
  loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ email, password, setEmail, setPassword, onLogin, loading }) => {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email address" }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 0) {
      setErrors(prevErrors => ({ ...prevErrors, password: "Please enter your password" }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, password: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = !email ? "Email is required" : undefined;
    const passwordError = !password ? "Password is required" : undefined;

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      onLogin();
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
              <Heading size="xs">Log in to your account</Heading>
              <Text color="fg.muted">
                Don't have an account? <Link href={Signupindex}>Sign up</Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                  </FormControl>
                  <PasswordField
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password}
                  />
                </Stack>
                <HStack justify="space-between">
                  <Checkbox defaultChecked>Remember me</Checkbox>
                  <Button variant="text" size="sm">
                    Forgot password?
                  </Button>
                </HStack>
                <Stack spacing="6">
                  <Button
                    bgColor={"black"}
                    type="submit"
                    color="white"
                    _hover={{ bgColor: "gray.700" }}
                  >
                    {loading ? "" : "Log in"}
                    {loading && (
                      <Flex justify="center">
                        <Spinner size="md" ml={2} />
                      </Flex>
                    )}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};
