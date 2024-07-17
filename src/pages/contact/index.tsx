import {
    Box, Flex, FormControl, FormLabel, Input, Textarea, Button,
    Text, Icon, useToast, useMediaQuery, useBreakpointValue
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
        position: 'sticky',
        width: '100%',
        top: 0,
        zIndex: 10,
    };

    return (
        <Box>
            <Box sx={navBarStyle}>
                <NavBarLanding />
            </Box>

            <Flex direction={useBreakpointValue({ base: "column", md: "row" })} h="auto">
                <Flex w={useBreakpointValue({ base: "100%", md: "50%" })} h="auto" bg="teal.100" alignItems="center" justifyContent="center">
                    <Box padding={useBreakpointValue({ base: 8, md: 20 })}>
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

                <Flex w={useBreakpointValue({ base: "100%", md: "50%" })} h="auto" alignItems="center" justifyContent="center">
                    <Box w={useBreakpointValue({ base: "90%", md: "80%" })} padding={useBreakpointValue({ base: 4, md: 10 })}>
                        <form onSubmit={handleSubmit}>
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
                            <Button type="submit" color={"white"} bg="black" width="100%" mb={4}>Send</Button>
                        </form>
                    </Box>
                </Flex>
            </Flex>

            <Footer />
        </Box>
    );
};

export default ContactUs;
