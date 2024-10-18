import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import Footer from "pages/components/footer";
import NavBarLanding from "pages/landing/component/navbar";
import { forgotPassword } from "api/auth";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await forgotPassword(email);
      if(res === true){
        setSuccess("Password reset link has been sent to your email.");
      }else{
        setError("Failed to send password reset email.");
      }
    } catch (error: any) {
      setError(error.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH="135vh"
      bg="gray.100"
    >
      <NavBarLanding />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
        px={4}
        py={12}
      >
        <Box
          maxW="md"
          width="100%"
          mx="auto"
          p={8}
          boxShadow="lg"
          borderRadius="md"
          bg="white"
        >
          <Text fontSize="2xl" mb={4} textAlign="center" fontWeight="bold">
            Forgot Password
          </Text>

          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>

            <Button
              type="submit"
              backgroundColor={"teal.500"}
                color={"white"}
              width="full"
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Send email"}
            </Button>
          </form>
        </Box>
      </Box>
      <Box mt={8}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ForgotPassword;
