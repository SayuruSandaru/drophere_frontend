import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, VStack, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FiMapPin, FiSend } from 'react-icons/fi';

const OngoingRideCard = ({ imageUrl, from, to, onViewRide }) => {
    return (
        <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={useColorModeValue('white', 'gray.800')}
            m={2}
        >
            <Flex direction="row">
                <Image
                    src={imageUrl}
                    alt="Vehicle"
                    boxSize="150px"
                    objectFit="cover"
                />
                <Box p="6" w="100%">
                    <VStack align="start" spacing={3}>
                        <HStack>
                            <FiMapPin />
                            <Text>
                                <Text as="span" fontWeight="bold">From: </Text> {from}
                            </Text>
                        </HStack>
                        <HStack>
                            <FiSend />
                            <Text>
                                <Text as="span" fontWeight="bold">To: </Text> {to}
                            </Text>
                        </HStack>
                        <Box />
                        <Button size="sm" variant="link" colorScheme="blue" onClick={onViewRide}>
                            <FiMapPin style={{ marginRight: 10 }} />View ride
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};

export default OngoingRideCard;
