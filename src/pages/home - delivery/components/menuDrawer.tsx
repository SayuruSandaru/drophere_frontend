import React, { useState } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Text,
    Box,
    Avatar,
    Center,
    Divider,
} from '@chakra-ui/react';
import { FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/routerConfig';

const Chips = ({ options, selectedOption, onSelect }) => {
    return (
        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
            {options.map((option, index) => (
                <Button
                    key={index}
                    size="xs"
                    borderRadius="full"
                    variant="solid"
                    bg={selectedOption === option ? 'teal.500' : 'gray.200'}
                    color={selectedOption === option ? 'white' : 'black'}
                    onClick={() => onSelect(option)}
                    _hover={{
                        bg: selectedOption === option ? 'teal.600' : 'gray.300',
                    }}
                    _focus={{
                        boxShadow: 'outline',
                    }}
                >
                    {option}
                </Button>
            ))}
        </Box>
    );
};

const MenuDrawer = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [selectedVehicleOption, setSelectedVehicleOption] = useState('');
    const [selectedAvailabilityOption, setSelectedAvailabilityOption] = useState('');

    const vehicleOption = ['All', 'Motorbike', 'tuktuk', 'Car', 'Van', 'Lorry'];
    const availabilityOption = ['All', 'AVailable now', 'Booked'];


    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu </DrawerHeader>
                <DrawerBody>
                    <Center>
                        <Avatar name="John Doe" src="https://bit.ly/broken-link" />
                    </Center>
                    <Box mt={3} />
                    <Center>
                        <Text ml={3} fontSize="lg" fontWeight="bold">John Doe</Text>
                    </Center>
                    <Box mt={10} />
                    <Divider></Divider>
                    <Box mt={35} />
                    <Button variant="outline" w="full" mb={3} onClick={() => { navigate(RouterPaths.SEARCHDELIVERY) }}>
                        <FaBox />
                        <Text ml={3}>Deliver</Text>
                    </Button>
                    <Button w="full" mt={3} bgColor={"black"}>
                        <Text ml={3} color={"white"}>Earn with us</Text>
                    </Button>
                </DrawerBody>
            </DrawerContent>
        </Drawer>

    );
};

export default MenuDrawer;



