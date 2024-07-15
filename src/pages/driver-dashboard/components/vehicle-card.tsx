import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, VStack, HStack, Image, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { FiMapPin, FiMoreVertical, FiSend } from 'react-icons/fi';

const VehicleDetails = () => {
    return (
        <Box
            maxH="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={useColorModeValue('white', 'gray.800')}
            m={2}
            position="relative" // This makes the Box a positioning context for absolute positioning inside it
        >
            <Image
                src="https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Vehicle"
                objectFit="cover"
                width="100%"
                height="auto"
            />
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical />}
                    variant="outline"
                    position="absolute" // Absolutely position this button
                    right="1" // Position from the right
                    top="1" // Position from the top
                    size="sm"
                />
                <MenuList>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </MenuList>
            </Menu>
            <Box p="6" w="100%">
                <VStack align="start" spacing={3}>
                    <HStack>
                        <Text>
                            <Text as="span" fontWeight="bold">Brand: </Text> Toyota Camry
                        </Text>
                    </HStack>
                    <HStack>
                        <Text>
                            <Text as="span" fontWeight="bold">To: </Text> Abuja
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
};

export default VehicleDetails;
