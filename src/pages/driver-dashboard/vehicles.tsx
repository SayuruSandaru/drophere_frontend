// src/pages/driver-dashboard/rides.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import RideReqTable from './components/ride-requests';
import RideListTable from './components/ride-list';

const Vehicles = () => {
    return (
        <Box minH="100vh" p="4">
            <Text>Vehicles</Text>
            <RideListTable />
        </Box>
    );
};

export default Vehicles;
