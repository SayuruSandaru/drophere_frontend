import { Box, Flex, Image, Stack, Text, useBreakpointValue, Heading } from "@chakra-ui/react";
import React from "react";
import { colors } from "theme/colors";
import { LoginForm } from "../login/login_form";
import { useNavigate } from 'react-router-dom';
import { Sing_Up } from "./Sign_Up";

const Register: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Login clicked');
        navigate('/'); // Navigate to the index page in components
    };

    const isLargeScreen = useBreakpointValue({ base: false, lg: true });

    return (
        <Flex direction="column" h="100vh">
            {!isLargeScreen && (
                <Flex direction="row" bg="#2bb07b" p="5">
                    <Heading m={"auto"} color={"white"}>Drop Here</Heading>
                </Flex>
            )}
            <Flex direction="row" h="100vh">
                {isLargeScreen && (
                    <Box w={["100%", "100%", "50%"]} bg="#2bb07b">
                        <Stack direction={"column"} align="center" justify="center" h="100%" spacing={4}>
                         
                            <Text fontSize="4xl" fontWeight="400" color={"white"}>Join Us Today</Text>
                            <Text fontSize="14px" fontWeight="300" color={"white"} maxW="50%" textAlign="center">
                                Become a part of our community and start exploring all the amazing features we have to offer. Sign up now to get started!
                            </Text>
                        </Stack>
                    </Box>
                )}
                <Sing_Up onLogin={handleLogin} />
            </Flex>
        </Flex>
    );
};

export default Register;