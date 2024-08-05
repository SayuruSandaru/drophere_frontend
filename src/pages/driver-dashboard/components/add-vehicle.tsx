import React, { useState } from 'react';
import { RouterPaths } from 'router/routerConfig';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Flex,
    Select,
    Image,
    FormErrorMessage,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import { FiArrowLeft } from 'react-icons/fi';
import { createVehicle } from 'api/vehicle';
import { fileUpload } from 'api/common';
import { useNavigate } from 'react-router-dom';

interface VehicleDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
    onError: (error: string) => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ isOpen, onClose, onBack, onError }) => {
    const navigator = useNavigate();
    const [vehicleModel, setVehicleModel] = useState('');
    const [year, setYear] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [vehicleImage, setVehicleImage] = useState<File | null>(null);
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formErrors, setFormErrors] = useState({
        vehicleModel: '',
        year: '',
        licensePlate: '',
        vehicleImage: '',
        type: '',
        capacity: '',
    });

    const validateForm = () => {
        let valid = true;
        const errors = {
            vehicleModel: '',
            year: '',
            licensePlate: '',
            vehicleImage: '',
            type: '',
            capacity: '',
        };

        if (!vehicleModel.trim()) {
            errors.vehicleModel = 'Vehicle Model is required';
            valid = false;
        }
        if (!year.trim()) {
            errors.year = 'Year is required';
            valid = false;
        }
        if (!licensePlate.trim()) {
            errors.licensePlate = 'License Plate No is required';
            valid = false;
        }
        if (!vehicleImage) {
            errors.vehicleImage = 'Vehicle Image is required';
            valid = false;
        }
        if (!type.trim()) {
            errors.type = 'Type is required';
            valid = false;
        }
        if (!capacity.trim()) {
            errors.capacity = 'Capacity is required';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        if (validateForm()) {
            onError('');
            uploadProofDocument();
        } else {
            console.log('Form has errors. Please fill in all required fields.');
        }
    };

    const uploadProofDocument = async () => {
        try {
            if (!vehicleImage) {
                return;
            }
            setLoading(true);
            const res = await fileUpload(vehicleImage);
            await updateVehicle(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const errorMessage = error.message || 'Failed to upload document. Please try again.';
            setError(errorMessage);
            onError(errorMessage);
        }
    };

    const updateVehicle = async (imageurl: string) => {
        try {
            setLoading(true);
            await createVehicle({
                capacity: parseInt(capacity),
                license_plate: licensePlate,
                model: vehicleModel,
                type: type.toLowerCase(),
                year: parseInt(year),
                image_url: imageurl,
            });
            setLoading(false);
            navigator(RouterPaths.DASHBOARDRIDES)
        } catch (error) {
            setLoading(false);
            console.error(error);
            const errorMessage = error.message || 'Failed to create vehicle. Please try again.';
            setError(errorMessage);
            onError(errorMessage);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>

                    <Box my={"30px"}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    <FormControl isInvalid={!!formErrors.vehicleModel} isRequired>
                                        <FormLabel htmlFor="vehicleModel">Vehicle Model</FormLabel>
                                        <Input id="vehicleModel" type="text" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
                                        <FormErrorMessage>{formErrors.vehicleModel}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!formErrors.year} isRequired>
                                        <FormLabel htmlFor="year">Year</FormLabel>
                                        <Input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                                        <FormErrorMessage>{formErrors.year}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!formErrors.licensePlate} isRequired>
                                        <FormLabel htmlFor="licensePlate">License Plate No</FormLabel>
                                        <Input id="licensePlate" type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
                                        <FormErrorMessage>{formErrors.licensePlate}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!formErrors.vehicleImage} isRequired>
                                        <FormLabel htmlFor="vehicleImage">Vehicle Image</FormLabel>
                                        <Input id="vehicleImage" type="file" border={'none'} accept="image/*" onChange={(e) => setVehicleImage(e.target.files ? e.target.files[0] : null)} />
                                        <FormErrorMessage>{formErrors.vehicleImage}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!formErrors.type} isRequired>
                                        <FormLabel htmlFor="type">Type</FormLabel>
                                        <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                            <option value="">Select Type</option>
                                            <option value="bike">Bike</option>
                                            <option value="tuktuk">Tuktuk</option>
                                            <option value="car">Car</option>
                                            <option value="van">Van</option>
                                            <option value="bus">Bus</option>
                                            <option value="other">Other</option>
                                        </Select>
                                        <FormErrorMessage>{formErrors.type}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!formErrors.capacity} isRequired>
                                        <FormLabel htmlFor="capacity">Capacity</FormLabel>
                                        <Select id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)}>
                                            <option value="">Select Capacity</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                        </Select>
                                        <FormErrorMessage>{formErrors.capacity}</FormErrorMessage>
                                    </FormControl>
                                </Stack>
                                <Stack spacing="6">
                                    <Button
                                        bgColor={"black"}
                                        color="white"
                                        _hover={{ bgColor: "gray.700" }}
                                        width="100%"
                                        type="submit"
                                        isDisabled={loading}
                                    >
                                        {loading ? <Spinner size="md" /> : "Next"}
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default VehicleDetails;
