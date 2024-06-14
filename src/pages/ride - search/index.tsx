import { Flex, Heading, VStack, Input, useDisclosure, Button, Icon, Text, Stack, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";
import { FaUser } from 'react-icons/fa';
import CounterComponent from './CounterComponent';


const Ride: React.FC = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onLogin = () => {
        console.log('Login clicked');
        navigate(RouterPaths.RIDESEARCH);
    };

    const handleCountChange = (newCount) => {
        console.log('New count:', newCount);
    };

    const selectedDestinationLocation = "";

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


                    <FormControl mb={4}>
                        <FormLabel fontSize="sm" color={"gray.600"}>Pick Up</FormLabel>
                        <Input
                            placeholder=""
                            onClick={() => console.log('clicked')}
                            value={selectedDestinationLocation}
                            readOnly
                        />
                    </FormControl>


                    <FormControl mb={4}>
                        <FormLabel fontSize="sm" color={"gray.600"}>Destination</FormLabel>
                        <Input
                            placeholder=""
                            onClick={() => console.log('clicked')}
                            value={selectedDestinationLocation}
                            readOnly
                        />
                    </FormControl>


                    <Flex flex={1} align="center" onClick={onOpen} cursor="pointer">
                        <Icon as={FaUser} w={6} h={4} color={"gray.500"} />
                        <Text ml={2} fontSize="md" fontWeight={"medium"}>Passenger</Text>
                    </Flex>


                    <Stack spacing="6">
                        <Button
                            bgColor={"black"}
                            onClick={onLogin}
                            color="white"
                            _hover={{ bgColor: "gray.700" }}
                        >
                            Search for a Ride
                        </Button>
                    </Stack>

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
