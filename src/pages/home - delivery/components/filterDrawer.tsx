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
} from '@chakra-ui/react';

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

const FilterDrawer = ({ isOpen, onClose }) => {
    const [selectedVehicleOption, setSelectedVehicleOption] = useState('');
    const [selectedAvailabilityOption, setSelectedAvailabilityOption] = useState('');

    const vehicleOption = ['All', 'Motorbike', 'tuktuk', 'Car', 'Van', 'Lorry'];
    const availabilityOption = ['All', 'AVailable now', 'Booked'];


    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Filter Options</DrawerHeader>

                <DrawerBody>
                    <Text>Vehicle type</Text>
                    <Chips options={vehicleOption} selectedOption={selectedVehicleOption} onSelect={setSelectedVehicleOption} />
                    <Box mt={10} />
                    <Text>Availablity</Text>
                    <Chips options={availabilityOption} selectedOption={selectedAvailabilityOption} onSelect={setSelectedAvailabilityOption} />
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue">Apply</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default FilterDrawer;



