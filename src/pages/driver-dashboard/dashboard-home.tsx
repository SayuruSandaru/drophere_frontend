// src/pages/driver-dashboard/dashboard-home.tsx
import React, { useEffect } from 'react';
import { Box, Grid, HStack, Text, Spinner } from '@chakra-ui/react';
import OngoingRideCard from './components/ongoing-ride-card';
import VehicleDetails from './components/vehicle-card';
import ReservationService from 'api/services/reservationService';
import VehicleService from 'api/services/vehicleService';
import User from 'model/user';

const DashboardHome = () => {
    const [loading, setLoading] = React.useState(false);
    const [ongoing, setOngoing] = React.useState([]);
    const [vehicles, setVehicles] = React.useState([]);

    useEffect(() => {
        fetchVehicles();
        fetchReservations('ongoing');
    }, []);

    const fetchReservations = async (status) => {
        try {
            setLoading(true);
            const result = await ReservationService.getReservationsByStatus(status, User.getUserId());
            const reservations = result.data || result;

            // Fetch vehicle details for each reservation
            const reservationsWithVehicles = await Promise.all(
                reservations.map(async (reservation) => {
                    const vehicle = await getVehicleById(reservation.ride.vehicle_id);
                    return { ...reservation, vehicle };
                })
            );

            setOngoing(reservationsWithVehicles);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching ride requests:', error);
        }
    };

    const getVehicleById = async (vehicleId) => {
        try {
            const result = await VehicleService.getVehicleById(vehicleId);
            return result.vehicle;
        } catch (error) {
            console.error('Error fetching vehicle:', error);
            return null;
        }
    };

    const fetchVehicles = async () => {
        try {
            console.log('Fetching vehicles...');
            const driverDetails = User.getDriverDetails();
            if (!driverDetails) {
                throw new Error('Driver details not found');
            }
            const driverId = driverDetails.driver_id;
            console.log('Driver Details:', driverId);
            const result = await VehicleService.getVehicleByOwenerId(driverId.toString());
            console.log('Vehicles:', result.vehicles);
            setVehicles(result.vehicles);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleViewRide = (rideId) => {
        console.log(`View ride ${rideId}`);
        // Navigate to the ride details page or perform another action
    };

    const handleEditVehicle = (vehicleId) => {
        console.log(`Edit vehicle ${vehicleId}`);
        // Implement edit vehicle functionality
    };

    const handleDeleteVehicle = (vehicleId) => {
        console.log(`Delete vehicle ${vehicleId}`);
        // Implement delete vehicle functionality
    };

    return (
        <Box minH="100vh" p="4">
            <HStack mb={4}>
                <Text fontSize="2xl" fontWeight="bold">Ongoing rides</Text>
            </HStack>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {ongoing.length > 0 ? (
                        ongoing.map((ride) => (
                            <OngoingRideCard
                                key={ride.id}
                                imageUrl={ride.vehicle?.image_url || 'https://via.placeholder.com/150'}
                                from={ride.ride.start_location || 'Unknown'}
                                to={ride.ride.end_location || 'Unknown'}
                                onViewRide={() => handleViewRide(ride.id)}
                            />
                        ))
                    ) : (
                        <Text>No ongoing rides found</Text>
                    )}
                </Grid>
            )}
            <Box h="20" />
            <HStack mb={4}>
                <Text fontSize="2xl" fontWeight="bold">Vehicles available</Text>
            </HStack>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <VehicleDetails
                            key={vehicle.vehicle_id}
                            imageUrl={vehicle.image_url || 'https://via.placeholder.com/150'}
                            model={vehicle.model}
                            plateNumber={vehicle.license_plate}
                            onEdit={() => handleEditVehicle(vehicle.vehicle_id)}
                            onDelete={() => handleDeleteVehicle(vehicle.vehicle_id)}
                        />
                    ))
                ) : (
                    <Text>No vehicles found</Text>
                )}
            </Grid>
        </Box>
    );
};

export default DashboardHome;
