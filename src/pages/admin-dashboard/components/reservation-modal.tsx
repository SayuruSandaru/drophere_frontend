import { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Spinner,
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import reservationService from "api/services/reservationService";
import MapPopup from "pages/myride/components/map-popup";
import rideService from "api/services/rideService";

interface Reservation {
    reservation_id: number;
    status: string;
    price: string;
    user_id: number;
    driver_id: number;
    ride_id: number;
    type: string;
}

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    rideId: number;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, rideId }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]); // Expecting an array of reservations
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRoute, setSelectedRoute] = useState<string | null>(null); 
    const [reservation_id, setReservationId] = useState<number | null>(null);
    const [ride_id, setRideId] = useState<number | null>(null);

    const {
        isOpen: isOpenMap,
        onOpen: onOpenMap,
        onClose: onCloseMap,
    } = useDisclosure();

    useEffect(() => {
        if (isOpen) {
            fetchReservations();
        }
    }, [isOpen]);

    const fetchReservations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await reservationService.getReservationsByRideId(rideId);
            if (response.status === "success") {
                setReservations(response.data); // Expect an array of reservations
            } else {
                throw new Error(response.message || "Failed to fetch reservations");
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
            setError("No reservations found.");
        } finally {
            setLoading(false);
        }
    };

    const fetchRide = async (rideId: number) => {
        try {
            console.log("Fetching ride details for ride ID:", rideId);
            const response = await rideService.getRideById(rideId);
            console.log("Ride details fetched:", response);
            if (response.status === "success") {
                return response?.ride?.route; // Return the route from the ride data
            } else {
                throw new Error(response.message || "Failed to fetch ride details");
            }
        } catch (error) {
            console.error("Error fetching ride details:", error);
            return null;
        }
    };

    const handleViewLocation = async (rideId: number, reservation: number) => {
        const route = await fetchRide(rideId);
        setReservationId(reservation);
        setRideId(rideId);
        if (route) {
            setSelectedRoute(route); // Set the route in state to pass to the MapPopup
            onOpenMap(); // Open the map modal
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent maxHeight="80vh">
                <ModalHeader>Reservations for Ride ID: {rideId}</ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="auto">
                    {loading ? (
                        <Box textAlign="center">
                            <Spinner size="xl" />
                        </Box>
                    ) : error ? (
                        <Text color="red.500" textAlign="center">
                            {error}
                        </Text>
                    ) : reservations.length === 0 ? (
                        <Text textAlign="center">No reservations available for this ride.</Text>
                    ) : (
                        <>
                            <Table variant="simple" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Reservation ID</Th>
                                        <Th>Status</Th>
                                        <Th>Price</Th>
                                        <Th>Type</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {reservations.map((reservation) => (
                                        <Tr key={reservation.reservation_id}>
                                            <Td>{reservation.reservation_id}</Td>
                                            <Td>{reservation.status}</Td>
                                            <Td>{reservation.price}</Td>
                                            <Td>{reservation.type}</Td>
                                            <Td>
                                                {/* Icon Button for View Location */}
                                                {reservation.status === "ongoing" && (
                                                    <IconButton
                                                        aria-label="View Location"
                                                        icon={<FaMapMarkerAlt />}
                                                        colorScheme="green"
                                                        onClick={() => handleViewLocation(reservation.ride_id, reservation.reservation_id)} // Pass ride ID for fetching route
                                                        size="sm"
                                                    />
                                                )}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>

            {/* Map Popup to view location */}
            <MapPopup
                isOpen={isOpenMap}
                onClose={onCloseMap}
                data={selectedRoute} // Pass the selected route data to the map popup
                databasePath={`rides/R${reservation_id}-I${ride_id}`} // Assuming you need a database path based on the ride ID
            />
        </Modal>
    );
};

export default ReservationModal;
