// src/pages/admin-dashboard/admin-home.tsx
import React from 'react';
import { Box, Grid, GridItem, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Heading, useColorModeValue } from '@chakra-ui/react';

const AdminHome = () => {
    return (
        <Box minH="100vh" p="4">
            <Heading mb={6}>Admin Dashboard</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                <DashboardCard label="Total Users" number="1,200" changePercentage="10" />
                <DashboardCard label="Total Drivers" number="300" changePercentage="5" />
                <DashboardCard label="Total Passengers" number="900" changePercentage="15" />
                <DashboardCard label="New Users (Last Month)" number="120" changePercentage="20" />
            </Grid>
        </Box>
    );
};

const DashboardCard = ({ label, number, changePercentage }) => {
    const bgColor = useColorModeValue('white', 'gray.800');

    return (
        <GridItem colSpan={{ base: 4, md: 1 }}>
            <Box
                bg={bgColor}
                borderRadius="lg"
                boxShadow="md"
                p={6}
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
                <Stat>
                    <StatLabel>{label}</StatLabel>
                    <StatNumber>{number}</StatNumber>
                    <StatHelpText>
                        <StatArrow type="increase" />
                        {changePercentage}% from last month
                    </StatHelpText>
                </Stat>
            </Box>
        </GridItem>
    );
};

export default AdminHome;
