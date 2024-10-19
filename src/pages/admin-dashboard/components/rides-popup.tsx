import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Text,
    Box,
    Heading,
    Divider,
    useBreakpointValue,
} from '@chakra-ui/react';
import RideService from 'api/services/rideService';

interface Ride {
    ride_id: number;
    start_location: string;
    end_location: string;
    start_time: string;
    status: string;
    passenger_count: number;
}

interface RidesPopupProps {
    isOpen: boolean;
    onClose: () => void;
    driverId: number | undefined;
}

const RidesPopup: React.FC<RidesPopupProps> = ({ isOpen, onClose, driverId }) => {
    const [rides, setRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const modalSize = useBreakpointValue({ base: 'full', md: 'xl' }); // Responsive size for mobile and larger screens

    useEffect(() => {
        if (isOpen && driverId) {
            fetchRides();
        }
    }, [isOpen, driverId]);

    const fetchRides = async () => {
        if (!driverId) return;

        setLoading(true);
        setError(null);
        try {
            const response = await RideService.getRideByIdfor(driverId?.toString());
            if (response.status === "success") {
                setRides(response.rides || []);
            } else {
                throw new Error(response.message || "Failed to fetch rides");
            }
        } catch (error) {
            console.error("Error fetching rides:", error);
            setError("No rides available for this driver.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
            <ModalOverlay />
            <ModalContent
                maxWidth={{ base: '100%', md: '800px' }} // Responsive max width
                mx="auto" // Center on the screen
                maxHeight="90vh" // Prevent overflowing the viewport height
                overflowY="auto" // Add scrolling if content exceeds max height
            >
                <ModalHeader>
                    <Heading size="lg">Driver Rides</Heading>
                    <Divider mt={2} />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading ? (
                        <Box textAlign="center">
                            <Spinner size="xl" />
                        </Box>
                    ) : error ? (
                        <Text color="red.500" textAlign="center">
                            {error}
                        </Text>
                    ) : rides.length === 0 ? (
                        <Box textAlign="center" p={4}>
                            <Text fontSize="lg">No rides available for this driver.</Text>
                        </Box>
                    ) : (
                        <Table variant="simple"  mt={4} size="sm">
                            <Thead>
                                <Tr>
                                    <Th>From</Th>
                                    <Th>To</Th>
                                    <Th>Date</Th>
                                    <Th>Status</Th>
                                    <Th>Passengers</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {rides.map((ride) => (
                                    <Tr key={ride.ride_id}>
                                        <Td>{ride.start_location}</Td>
                                        <Td>{ride.end_location}</Td>
                                        <Td>{formatDate(ride.start_time)}</Td>
                                        <Td>{ride.status}</Td>
                                        <Td>{ride.passenger_count}</Td>
                                        <Td>
                                            <Button
                                                colorScheme="blue"
                                                size="sm"
                                                onClick={() => alert(`Viewing live location for ride ID: ${ride.ride_id}`)}
                                            >
                                                View Live Location
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RidesPopup;
