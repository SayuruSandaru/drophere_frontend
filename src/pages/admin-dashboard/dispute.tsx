import React from 'react';
import { Text, Box } from "@chakra-ui/react";
import Disputes from './components/dispute-details';

const DisputeManagement: React.FC = () => {
    return (
        <Box p="4">
            <Text fontSize="2xl" mb="4">Dispute Management</Text>
            <Disputes />
        </Box>
    );
};

export default DisputeManagement;
