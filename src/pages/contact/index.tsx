import {
    Box, Flex, FormControl, FormLabel, Input, Textarea, Button,
    Text, Icon, useToast, useMediaQuery
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavBarLanding from "pages/landing/component/navbar";
import Footer from "pages/components/footer";
import { RouterPaths } from "router/routerConfig";
import { login } from "api/auth";

const ContactUs: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: '',
        email: '',
        message: ''
    });
    const toast = useToast();

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Contact request submitted.",
            description: "We will be in touch soon.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        setInput({ name: '', email: '', message: '' });
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            await login({ email, password });
            setLoading(false);
            navigate(RouterPaths.RIDE);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
        }
    };

    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
    const navBarStyle = {
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 10,
    };

    return (
        <Box>
            <Box sx={navBarStyle}>
                <NavBarLanding />
            </Box>

            <Flex direction={isLargeScreen ? "row" : "column"} h="100vh">
                <Flex w={isLargeScreen ? "50%" : "100%"} h="100vh" bg="teal.100" alignItems="center" justifyContent="center">
                    <Box padding={isLargeScreen ? 20 : 8}>
                        <Text fontSize="5xl" fontWeight={500} mb={6} textAlign="left" fontFamily="Red Hat Display">
                            Contact us
                        </Text>
                        <Text fontSize="md" textAlign="left" color="gray.600">
                            Got a question? We're here to answer! Whether you need assistance finding the right service or have a query about our pricing, fill out the form below and our team will get back to you shortly.
                        </Text>
                        <Flex direction="row">
                            <Icon as={FaEnvelope} color="purple.500" boxSize="5" mx={3} my={8} />
                            <Box borderRadius="lg" p={4}>
                                <Text fontSize="xl" fontWeight={500}>Email</Text>
                                <Text fontSize="smaller" color="gray.600">dropheresupport@gmail.com</Text>
                            </Box>
                        </Flex>
                        <Flex direction="row">
                            <Icon as={FaPhone} color="purple.500" boxSize="5" mx={3} my={8} />
                            <Box borderRadius="lg" p={4}>
                                <Text fontSize="xl" fontWeight={500}>Phone</Text>
                                <Text fontSize="smaller" color="gray.600">+94 732 455 555</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>

                <Flex w={isLargeScreen ? "50%" : "100%"} h="100vh" alignItems="center" justifyContent="center">
                    <Box w={isLargeScreen ? "80%" : "90%"} padding={isLargeScreen ? 10 : 4}>
                        <FormControl mb={4}>
                            <FormLabel fontSize="sm" color="gray.600">Name</FormLabel>
                            <Input
                                placeholder="Your name"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                                width="100%"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel fontSize="sm" color="gray.600">Email</FormLabel>
                            <Input
                                placeholder="Your email"
                                name="email"
                                value={input.email}
                                onChange={handleChange}
                                width="100%"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel fontSize="sm" color="gray.600">Message</FormLabel>
                            <Textarea
                                placeholder="Your message"
                                name="message"
                                value={input.message}
                                onChange={handleChange}
                                width="100%"
                            />
                        </FormControl>
                        <Button color={"white"} bg="black" width="100%" mb={4} onClick={handleSubmit}>Send</Button>
                    </Box>
                </Flex>
            </Flex>

            <Footer />
        </Box>
    );
};

export default ContactUs;
