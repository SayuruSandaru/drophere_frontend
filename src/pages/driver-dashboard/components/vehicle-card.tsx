import { Button, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, VStack, HStack, Image, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { FiMapPin, FiMoreVertical, FiSend } from 'react-icons/fi';

const VehicleDetails = ({ imageUrl, model, plateNumber, onEdit, onDelete }) => {
    return (
        <Box
            maxH="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={useColorModeValue('white', 'gray.800')}
            m={2}
            position="relative"
        >
            <Image
                src={imageUrl}
                alt={`${model}`}
                objectFit="cover"
                width="100%"
                height="auto"
            />
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<FiMoreVertical />}
                    variant="outline"
                    position="absolute"
                    right="1"
                    top="1"
                    size="sm"
                />
                <MenuList>
                    <MenuItem onClick={onEdit}>Edit</MenuItem>
                    <MenuItem onClick={onDelete}>Delete</MenuItem>
                </MenuList>
            </Menu>
            <Box p="6" w="100%">
                <VStack align="start" spacing={3}>
                    <HStack>
                        <Text>
                            <Text as="span" fontWeight="bold">Model: </Text> {model}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text>
                            <Text as="span" fontWeight="bold">Plate Number: </Text> {plateNumber}
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
};

export default VehicleDetails;
