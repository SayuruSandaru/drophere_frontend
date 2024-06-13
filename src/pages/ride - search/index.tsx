import { Flex, Image, Heading, VStack, Input, useDisclosure, Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
//import { useState } from "react";
import { FaUser } from 'react-icons/fa'; // Import the FaUser icon
import CounterComponent from './CounterComponent';

//const Ride: React.FC = () => {
const Ride: React.FC = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleCountChange = (newCount) => {
        console.log('New count:', newCount);
    };
    const handleLogin = () => {
        console.log('Login clicked');
        navigate(RouterPaths.RIDESEARCH); // Navigate to the next page after login

    };



    return (
        <Flex
            height="100vh"
            justifyContent="center"
            alignItems="center"
            bg="gray.200"
            p={4}
        >
            <Flex
                direction="column"
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="lg"
                alignItems="center"
                maxW="400px"
                w="full"
            >
                <VStack spacing={4} w="full">
                    <Heading as="h1" size="lg" textAlign="center">
                        Passenger
                    </Heading>
                    <Input placeholder="Pick up" variant="outline" />
                    <Input placeholder="Destination" variant="outline" />


                    <Flex flex={1} align="center" onClick={onOpen} cursor="pointer">
                        <Icon as={FaUser} w={6} h={4} color={"gray.500"} />
                        <Text ml={2} fontSize="md" fontWeight={"medium"}>Passenger</Text>
                    </Flex>

                    <Flex justifyContent="center" w="full">
                        <Image
                            src="https://via.placeholder.com/150"
                            alt="Passenger Image"
                            objectFit="cover"
                            borderRadius="md"
                        />
                    </Flex>
                    <Button colorScheme="blue" variant="solid" w="full">
                        Search for a Ride
                    </Button>
                </VStack>
            </Flex>

            <CounterComponent
                isOpen={isOpen}
                onClose={onClose}
                handleCountChange={handleCountChange}
            />
        </Flex>
    );
};

export default Ride;
