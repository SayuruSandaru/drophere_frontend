
import { Box, Flex, Image, Stack, Text, Heading, useMediaQuery, Spinner, Container, Button, FormControl, FormLabel, Input, HStack, Checkbox, Textarea, useToast, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
import Footer from "pages/components/footer";
import { colors } from "theme/colors";
import { login } from "api/auth";
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import NavBarLanding from "pages/landing/component/navbar";

const ContactUs: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
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
        // Implement validation or API submission logic here
        toast({
            title: "Contact request submitted.",
            description: "We will be in touch soon.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        setInput({ name: '', email: '', message: '' }); // Reset form
    };
    const handleLogin = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            await login({ email, password });
            setLoading(false);
            navigate(RouterPaths.HOME);
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

            <Box h="100vh" display={"flex"} >
                <Flex w="50%" h="100vh" bg="teal.100" alignItems="center" justifyContent="center">
                    <Box padding={20}>
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
                <Flex w="50%" h="100vh" alignItems="center" justifyContent="center">
                    <Box w={"80%"}>
                        <FormControl mb={4}>
                            <FormLabel fontSize="sm" color="gray.600">Name</FormLabel>
                            <Input
                                placeholder=""
                                onClick={() => { }}
                                width="100%"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel fontSize="sm" color="gray.600">Email</FormLabel>
                            <Input
                                placeholder=""
                                onClick={() => { }}
                                width="100%"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel fontSize="sm" color="gray.600">Message</FormLabel>
                            <Textarea
                                placeholder=""
                                width="100%"
                            />
                        </FormControl>
                        <Button color={"white"} bg="black" width="30%" mb={4} >Send</Button>
                    </Box>
                </Flex>
            </Box>
            <Footer />
        </Box>
    );
};

export default ContactUs;
