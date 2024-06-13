import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
// import { Logo } from "./components/logo";
import { PasswordField } from "../login/components/passwordField";
const Signinindex = "./";


interface LoginProps {
  onLogin: () => void;
}

export const Sing_Up: React.FC<LoginProps> = ({ onLogin }) => (
  <Flex direction="column" justifyContent={"Center"} m="auto">
    <Container
      maxW="lg"
      pt={{ base: "12", md: "24 " }}
      py={{ base: "12", md: "24 " }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack>
          <Image src="/images/Black_T.png" w={"24"} m="auto" />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size="xs">Create your account</Heading>

            <Text color="fg.muted">
              Already have an account?  <Link href={Signinindex}>Sign in</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <Flex>
                <FormControl mr={4}>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input id="firstName" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input id="lastName" type="text" />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
                <Input id="mobileNumber" type="tel" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <Stack spacing="6">
              <Button
                bgColor={"black"}
                onClick={onLogin}
                color="white"
                _hover={{ bgColor: "gray.700" }}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  </Flex>
);
