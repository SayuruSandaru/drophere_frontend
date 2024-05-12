import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'
import { Logo } from './components/logo'
import { PasswordField } from './components/passwordField'

interface LoginProps {
    onLogin: () => void
}

export const LoginForm: React.FC<LoginProps> = ({ onLogin }) => (
    <Container maxW="lg" py={{ base: '12', md: '24 ' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
            <Stack spacing="6">
                <Logo />
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size="xs">Log in to your account</Heading>
                    <Text color="fg.muted">
                        Don't have an account? <Link href="#">Sign up</Link>
                    </Text>
                </Stack>
            </Stack>
            <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg.surface' }}
                borderRadius={{ base: 'none', sm: 'xl' }}
            >
                <Stack spacing="6">
                    <Stack spacing="5">
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" type="email" />
                        </FormControl>
                        <PasswordField />
                    </Stack>
                    <HStack justify="space-between">
                        <Checkbox defaultChecked>Remember me</Checkbox>
                        <Button variant="text" size="sm">
                            Forgot password?
                        </Button>
                    </HStack>
                    <Stack spacing="6">
                        <Button bgColor={"black"} onClick={onLogin} color="white" _hover={{ bgColor: "gray.700" }}>
                            Sign in
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Container>
)