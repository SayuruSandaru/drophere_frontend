// VehicleFees.js
'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import VehicleFee from './components/vehicleFeeDetails';

const VehicleFees = () => {
    return (
        <Box p={5}>
            <Text fontSize="2xl">Vehicle Fees</Text>
            <VehicleFee />
        </Box>
    );
};

export default VehicleFees;
