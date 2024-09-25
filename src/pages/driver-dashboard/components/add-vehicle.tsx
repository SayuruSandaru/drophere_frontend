import React, { useState } from 'react';
import { RouterPaths } from 'router/routerConfig';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Select,
    FormErrorMessage,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import { createVehicle } from 'api/vehicle';
import { fileUpload } from 'api/common';
import { useNavigate } from 'react-router-dom';

import { vehicleData } from '../../register_driver/components/vehicleData'; 

interface VehicleDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
    onError: (error: string) => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ isOpen, onClose, onBack, onError }) => {
    const navigator = useNavigate();
    const [brand, setBrand] = useState('');
    const [customBrand, setCustomBrand] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [customModel, setCustomModel] = useState('');
    const [models, setModels] = useState<string[]>([]);
    const [year, setYear] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [vehicleImage, setVehicleImage] = useState<File | null>(null);
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formErrors, setFormErrors] = useState({
        brand: '',
        customBrand: '',
        vehicleModel: '',
        customModel: '',
        year: '',
        licensePlate: '',
        vehicleImage: '',
        type: '',
        capacity: '',
    });

    const updateModels = (selectedBrand: string) => {
        const brandData = vehicleData.find(item => item.brand === selectedBrand);
        if (brandData) {
            setModels([...brandData.models, 'Other']);
        } else {
            setModels([]);
        }
        setVehicleModel('');
        setCustomModel('');
    };

    const validateForm = () => {
        let valid = true;
        const errors = {
            brand: '',
            customBrand: '',
            vehicleModel: '',
            customModel: '',
            year: '',
            licensePlate: '',
            vehicleImage: '',
            type: '',
            capacity: '',
        };

        if (!brand.trim()) {
            errors.brand = 'Brand is required';
            valid = false;
        } else if (brand === 'Other' && !customBrand.trim()) {
            errors.customBrand = 'Please enter the brand';
            valid = false;
        }

        if (!vehicleModel.trim()) {
            errors.vehicleModel = 'Vehicle Model is required';
            valid = false;
        } else if ((vehicleModel === 'Other' || models.length === 0) && !customModel.trim()) {
            errors.customModel = 'Please enter the model';
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
        } catch (error: any) {
            setLoading(false);
            const errorMessage = error.message || 'Failed to upload document. Please try again.';
            setError(errorMessage);
            onError(errorMessage);
        }
    };

    const updateVehicle = async (imageurl: string) => {
        try {
            setLoading(true);
            const selectedBrand = brand === 'Other' ? customBrand : brand;
            const selectedModel = (vehicleModel === 'Other' || models.length === 0) ? customModel : vehicleModel;

            await createVehicle({
                capacity: parseInt(capacity),
                license_plate: licensePlate,
                model: `${selectedBrand} ${selectedModel}`, // Concatenated brand and model
                type: type.toLowerCase(),
                year: parseInt(year),
                image_url: imageurl,
            });
            setLoading(false);
            navigator(RouterPaths.DASHBOARDRIDES)
        } catch (error: any) {
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
                                    {/* Brand Selection */}
                                    <FormControl isInvalid={!!formErrors.brand} isRequired>
                                        <FormLabel htmlFor="brand">Brand</FormLabel>
                                        <Select
                                            id="brand"
                                            value={brand}
                                            onChange={(e) => {
                                                setBrand(e.target.value);
                                                updateModels(e.target.value);
                                                setCustomBrand('');
                                            }}
                                        >
                                            <option value="">Select Brand</option>
                                            {vehicleData.map((item) => (
                                                <option key={item.brand} value={item.brand}>
                                                    {item.brand}
                                                </option>
                                            ))}
                                            <option value="Other">Other</option>
                                        </Select>
                                        <FormErrorMessage>{formErrors.brand}</FormErrorMessage>
                                    </FormControl>
                                    {/* Custom Brand Input */}
                                    {brand === 'Other' && (
                                        <FormControl isInvalid={!!formErrors.customBrand} isRequired>
                                            <FormLabel htmlFor="customBrand">Enter Brand</FormLabel>
                                            <Input
                                                id="customBrand"
                                                type="text"
                                                value={customBrand}
                                                onChange={(e) => setCustomBrand(e.target.value)}
                                            />
                                            <FormErrorMessage>{formErrors.customBrand}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                    {/* Model Selection */}
                                    <FormControl isInvalid={!!formErrors.vehicleModel} isRequired>
                                        <FormLabel htmlFor="vehicleModel">Model</FormLabel>
                                        {models.length > 0 ? (
                                            <Select
                                                id="vehicleModel"
                                                value={vehicleModel}
                                                onChange={(e) => {
                                                    setVehicleModel(e.target.value);
                                                    setCustomModel('');
                                                }}
                                            >
                                                <option value="">Select Model</option>
                                                {models.map((model) => (
                                                    <option key={model} value={model}>
                                                        {model}
                                                    </option>
                                                ))}
                                            </Select>
                                        ) : (
                                            <Input
                                                id="vehicleModel"
                                                type="text"
                                                value={customModel}
                                                onChange={(e) => setCustomModel(e.target.value)}
                                            />
                                        )}
                                        <FormErrorMessage>{formErrors.vehicleModel}</FormErrorMessage>
                                    </FormControl>
                                    {/* Custom Model Input */}
                                    {(vehicleModel === 'Other' || models.length === 0) && (
                                        <FormControl isInvalid={!!formErrors.customModel} isRequired>
                                            <FormLabel htmlFor="customModel">Enter Model</FormLabel>
                                            <Input
                                                id="customModel"
                                                type="text"
                                                value={customModel}
                                                onChange={(e) => setCustomModel(e.target.value)}
                                            />
                                            <FormErrorMessage>{formErrors.customModel}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                    {/* Year Input */}
                                    <FormControl isInvalid={!!formErrors.year} isRequired>
                                        <FormLabel htmlFor="year">Year</FormLabel>
                                        <Input
                                            id="year"
                                            type="number"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                        />
                                        <FormErrorMessage>{formErrors.year}</FormErrorMessage>
                                    </FormControl>
                                    {/* License Plate Input */}
                                    <FormControl isInvalid={!!formErrors.licensePlate} isRequired>
                                        <FormLabel htmlFor="licensePlate">License Plate No</FormLabel>
                                        <Input
                                            id="licensePlate"
                                            type="text"
                                            value={licensePlate}
                                            onChange={(e) => setLicensePlate(e.target.value)}
                                        />
                                        <FormErrorMessage>{formErrors.licensePlate}</FormErrorMessage>
                                    </FormControl>
                                    {/* Vehicle Image Input */}
                                    <FormControl isInvalid={!!formErrors.vehicleImage} isRequired>
                                        <FormLabel htmlFor="vehicleImage">Vehicle Image</FormLabel>
                                        <Input
                                            id="vehicleImage"
                                            type="file"
                                            border={'none'}
                                            accept="image/*"
                                            onChange={(e) =>
                                                setVehicleImage(e.target.files ? e.target.files[0] : null)
                                            }
                                        />
                                        <FormErrorMessage>{formErrors.vehicleImage}</FormErrorMessage>
                                    </FormControl>
                                    {/* Type Selection */}
                                    <FormControl isInvalid={!!formErrors.type} isRequired>
                                        <FormLabel htmlFor="type">Type</FormLabel>
                                        <Select
                                            id="type"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        >
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
                                    {/* Capacity Selection */}
                                    <FormControl isInvalid={!!formErrors.capacity} isRequired>
                                        <FormLabel htmlFor="capacity">Capacity</FormLabel>
                                        <Select
                                            id="capacity"
                                            value={capacity}
                                            onChange={(e) => setCapacity(e.target.value)}
                                        >
                                            <option value="">Select Capacity</option>
                                            {[...Array(8)].map((_, i) => (
                                                <option key={i + 1} value={(i + 1).toString()}>
                                                    {i + 1}
                                                </option>
                                            ))}
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
