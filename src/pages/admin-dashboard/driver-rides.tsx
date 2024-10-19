// src/pages/driver-dashboard/rides.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import RideListAdmin from './components/ride-table';
import { useParams } from 'react-router-dom';

const AdminViewRides = () => {
    const { driverId } = useParams<{ driverId: string }>();
    return (
        <Box minH="100vh" p="4">
            <Text>Available rides</Text>
            <RideListAdmin driverId={driverId}/>
        </Box>
    );
};

export default AdminViewRides;
