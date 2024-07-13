// src/pages/driver-dashboard/dashboard-home.tsx
import React from 'react';
import { Icon, Image, Box, Button, Grid, HStack, Text, useColorModeValue, VStack, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react';
import { FiEdit, FiMapPin, FiMoreVertical, FiSend, FiTrash2 } from 'react-icons/fi';
import OngoingRideCard from './components/ongoing-ride-card';
import VehicleDetails from './components/vehicle-card';

const DashboardHome = () => {
    return (
        <Box minH="100vh" p="4">
            <HStack>
                <Text>Ongoing rides</Text>
            </HStack>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} >
                <OngoingRideCard />
                <OngoingRideCard />
                <OngoingRideCard />
            </Grid>
            <Box h={"20"} />
            <HStack>
                <Text>Vehicles available</Text>
            </HStack>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} >
                <VehicleDetails />
                <VehicleDetails />
                <VehicleDetails />
            </Grid>
        </Box>
    );
};

export default DashboardHome;
