import React, { useState, useEffect } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useToast,
    Text,
    Flex,
    Spinner,
    Stack,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
} from "@chakra-ui/react";
import { getVehicleFeeDetails, updateVehicleFee } from 'api/vehicle';

interface VehicleFee {
    id: number;
    vehicle_type: string;
    price_per_km: string;
}

interface ApiResponse {
    status: string;
    fees: VehicleFee[];
}

interface UpdateResponse {
    status: string;
    message: string;
}

const VehicleFees: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [vehicleFees, setVehicleFees] = useState<VehicleFee[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleFee | null>(null);
    const [newFee, setNewFee] = useState<string>('');
    const [updatingVehicleId, setUpdatingVehicleId] = useState<number | null>(null);
    const toast = useToast();
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        fetchVehicleFees();
    }, []);

    const fetchVehicleFees = async () => {
        setLoading(true);
        try {
            const response = await getVehicleFeeDetails();
            const data = response as ApiResponse;

            if (data.status === 'success' && Array.isArray(data.fees)) {
                setVehicleFees(data.fees);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            setError('Error fetching vehicle fees');
            console.error('Error fetching vehicle fees', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (vehicle: VehicleFee) => {
        setSelectedVehicle(vehicle);
        setNewFee(vehicle.price_per_km);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVehicle(null);
        setNewFee('');
    };

    const handleUpdateFee = async () => {
        if (selectedVehicle && newFee) {
            try {
                setUpdatingVehicleId(selectedVehicle.id);
                const response = await updateVehicleFee(selectedVehicle.vehicle_type, parseFloat(newFee));
                const data = response as UpdateResponse;

                if (data.status === 'success') {
                    setVehicleFees((prevFees) =>
                        prevFees.map((fee) =>
                            fee.id === selectedVehicle.id
                                ? { ...fee, price_per_km: newFee }
                                : fee
                        )
                    );
                    toast({
                        title: 'Fee updated',
                        description: data.message || `The fee for ${selectedVehicle.vehicle_type} has been updated to ${newFee} per km.`,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    closeModal();
                } else {
                    throw new Error(data.message || 'Failed to update fee');
                }
            } catch (error) {
                console.error('Error updating fee', error);
                toast({
                    title: 'Error updating fee',
                    description: error instanceof Error ? error.message : 'Could not update the fee. Please try again later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setUpdatingVehicleId(null);
            }
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <Flex w="full" alignItems="center" justifyContent="center">
                    <Spinner size="xl" />
                </Flex>
            );
        }

        if (error) {
            return <Box color="red">{error}</Box>;
        }

        if (isMobile) {
            return (
                <Stack spacing={4}>
                    {vehicleFees.map((fee) => (
                        <Box key={fee.id} p={4} borderWidth={1} borderRadius="md" shadow="md">
                            <Text><strong>Vehicle Type:</strong> {fee.vehicle_type}</Text>
                            <Text><strong>Price per Km:</strong> {fee.price_per_km}</Text>
                            <Button
                                mt={2}
                                size="sm"
                                colorScheme="teal"
                                onClick={() => openModal(fee)}
                                isLoading={updatingVehicleId === fee.id}
                            >
                                Update Fee
                            </Button>
                        </Box>
                    ))}
                </Stack>
            );
        }

        return (
            <Box overflowX="auto">
                <Table w="full" boxShadow="lg" borderRadius="md">
                    <Thead bg="gray.100">
                        <Tr>
                            <Th width="40%">Vehicle Type</Th>
                            <Th width="30%">Price per Km</Th>
                            <Th width="30%">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {vehicleFees.map((fee) => (
                            <Tr key={fee.id}>
                                <Td width="40%">{fee.vehicle_type}</Td>
                                <Td width="30%">{fee.price_per_km}</Td>
                                <Td width="30%">
                                    <Button
                                        size="sm"
                                        colorScheme="teal"
                                        onClick={() => openModal(fee)}
                                        isLoading={updatingVehicleId === fee.id}
                                    >
                                        Update Fee
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        );
    };

    return (
        <Box minH="100vh" p={4}>
            <Box w="full" bg="white" p={4} borderRadius="md" shadow="md">
                {renderContent()}
            </Box>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Fee</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2}>Current fee for {selectedVehicle?.vehicle_type}: {selectedVehicle?.price_per_km}</Text>
                        <Input
                            type="number"
                            value={newFee}
                            onChange={(e) => setNewFee(e.target.value)}
                            placeholder="Enter new fee"
                            step="0.01"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={handleUpdateFee}>
                            Confirm Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default VehicleFees;