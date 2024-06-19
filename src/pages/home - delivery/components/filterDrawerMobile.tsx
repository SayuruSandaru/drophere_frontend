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
    FormLabel,
    FormControl,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import CounterComponent from './counterComponent';
import PlaceAutocompleteModal from 'pages/components/placeModalbox';
import { set } from 'lodash';
import CalendarComponent from './calenderComponents';

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

const FilterDrawerMobile = ({ isOpen, onClose }) => {
    const { isOpen: isPickupPlaceOpen, onOpen: onPickupPlaceOpen, onClose: onPickupPlaceClose } = useDisclosure();
    const { isOpen: isDestinationPlaceOpen, onOpen: onDestinationPlaceOpen, onClose: onDestinationPlaceClose } = useDisclosure();
    const { isOpen: isCalendarOpen, onOpen: onCalendarOpen, onClose: onCalendarClose } = useDisclosure();
    const { isOpen: isPassangerOpen, onOpen: onPassangerOpen, onClose: onPassangerClose } = useDisclosure();
    const [selectedVehicleOption, setSelectedVehicleOption] = useState('');
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedAvailabilityOption, setSelectedAvailabilityOption] = useState('');
    const [selectedPickupLocation, setSelectedPickupLocation] = useState("");
    const [selectedDestinationLocation, setSelectedDestinationLocation] = useState("");
    const [selectedPassangerCount, setPassangerCount] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const vehicleOption = ['All', 'Motorbike', 'tuktuk', 'Car', 'Van', 'Lorry'];
    const availabilityOption = ['All', 'AVailable now', 'Booked'];

    const handleItemClick = (item) => {
        setSelectedItem(item);
        if (item === "Calendar") {
            onCalendarOpen();
        } else if (item === "Pickup") {
            onPickupPlaceOpen();
        } else if (item === "Destination") {
            onDestinationPlaceOpen();
        } else {
            onPassangerOpen();
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onCalendarClose();
    };

    const handleDestiantionSelect = (place) => {
        setSelectedDestinationLocation(place);
    };

    const handlePickupLocationSelect = (place) => {
        setSelectedPickupLocation(place);
    };

    const handleCountChange = (count) => {
        setPassangerCount(count);
        onCalendarClose();
    };

    const formatDateWithoutYear = (date) => {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };


    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Where need to go?</DrawerHeader>

                <DrawerBody>
                    <FormControl mb={4}>
                        <FormLabel fontSize="sm" color={"gray.600"}>Pickup</FormLabel>
                        <Input
                            placeholder=""
                            onClick={() => handleItemClick("Pickup")}
                            value={selectedPickupLocation}
                            readOnly
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel fontSize="sm" color={"gray.600"}>Destination</FormLabel>
                        <Input
                            placeholder=""
                            onClick={() => handleItemClick("Destination")}
                            value={selectedDestinationLocation}
                            readOnly
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel fontSize="sm" color={"gray.600"}>No of passangers</FormLabel>
                        <Input
                            placeholder=""
                            onClick={() => handleItemClick("Passangers")}
                            value={selectedPassangerCount}
                            readOnly
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel fontSize="sm" color={"gray.600"}>Date</FormLabel>
                        <Input
                            placeholder=""
                            onClick={() => handleItemClick("Calendar")}
                            value={formatDateWithoutYear(selectedDate)}
                            readOnly
                        />
                    </FormControl>
                    <Text>Vehicle type</Text>
                    <Chips options={vehicleOption} selectedOption={selectedVehicleOption} onSelect={setSelectedVehicleOption} />
                    <Box mt={10} />
                    <Text>Availablity</Text>
                    <Chips options={availabilityOption} selectedOption={selectedAvailabilityOption} onSelect={setSelectedAvailabilityOption} />
                    <PlaceAutocompleteModal isOpen={isPickupPlaceOpen} onClose={onPickupPlaceClose} onPlaceSelect={handlePickupLocationSelect} />
                    <PlaceAutocompleteModal isOpen={isDestinationPlaceOpen} onClose={onDestinationPlaceClose} onPlaceSelect={handleDestiantionSelect} />
                    <CounterComponent isOpen={isPassangerOpen} onClose={onPassangerClose} handleCountChange={handleCountChange} />
                    <CalendarComponent
                        isOpen={isCalendarOpen}
                        onClose={onCalendarClose}
                        selectedDate={selectedDate}
                        handleDateChange={handleDateChange}
                    />
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} mt={2} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" mt={2}>Apply</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default FilterDrawerMobile;



