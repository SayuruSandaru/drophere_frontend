// src/pages/ResetPassword.tsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { resetPassword } from "api/auth";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      if (!token) {
        throw new Error("Invalid or missing token.");
      }
      const res = await resetPassword(newPassword, confirmPassword, token);
      if (res === true) {
        setSuccess("Your password has been successfully reset.");
      } else {
        setError("Failed to reset password.");
      }
    } catch (error: any) {
      setError(error.message || "Failed to reset password.");
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
            Reset Password
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
            <FormControl id="new-password" mb={4} isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password"
              />
            </FormControl>

            <FormControl id="confirm-password" mb={4} isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm  password"
              />
            </FormControl>

            <Button
              type="submit"
              backgroundColor={"teal.500"}
              color={"white"}
              width="full"
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Reset Password"}
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

export default ResetPassword;
