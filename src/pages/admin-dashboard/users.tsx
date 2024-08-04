import React from 'react';
import { Text, Box } from "@chakra-ui/react";
import Users from './components/users-details';

const UserManagement: React.FC = () => {
    return (
        <Box p="4">
            <Text fontSize="2xl" mb="4">User Management</Text>
            <Users />
        </Box>
    );
};

export default UserManagement;
