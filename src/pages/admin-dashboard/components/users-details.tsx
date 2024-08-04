import { Box, Button, ButtonGroup, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import React, { useState } from "react";
import TabBtn from "./tab-btn"; // Adjust path as needed

const Users = () => {
    const [selectedTab, setSelectedTab] = useState('users');
    const [loading, setLoading] = useState(false);

    const usersData = [
        { id: 1, email: 'user1@example.com', firstname: 'John', lastname: 'Doe', username: 'johndoe', phone: '123-456-7890' },
        { id: 2, email: 'user2@example.com', firstname: 'Jane', lastname: 'Doe', username: 'janedoe', phone: '098-765-4321' },
    ];

    const driversData = [
        { driver_id: 1, user_id: 1, street: '123 Main St', city: 'Anytown', province: 'CA' },
        { driver_id: 2, user_id: 2, street: '456 Oak St', city: 'Othertown', province: 'NY' },
    ];

    const tableBg = useColorModeValue('white', 'gray.800');

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <Box minH="100vh" p="4">
            <Box mb="4">
                <TabBtn
                    onUsersSelect={() => handleTabChange('users')}
                    onDriversSelect={() => handleTabChange('drivers')}
                />
            </Box>
            <Flex
                w="full"
                bg="#edf3f8"
                _dark={{ bg: "#3e3e3e" }}
                p={50}
                alignItems="center"
                justifyContent="center"
            >
                {loading ? (
                    <Spinner size="xl" />
                ) : (
                    <Table
                        w="full"
                        bg={tableBg}
                        _dark={{ bg: "gray.800" }}
                    >
                        <Thead>
                            <Tr>
                                {selectedTab === 'users' && (
                                    <>
                                        <Th>ID</Th>
                                        <Th>Email</Th>
                                        <Th>First Name</Th>
                                        <Th>Last Name</Th>
                                        <Th>Username</Th>
                                        <Th>Phone</Th>
                                    </>
                                )}
                                {selectedTab === 'drivers' && (
                                    <>
                                        <Th>Driver ID</Th>
                                        <Th>User ID</Th>
                                        <Th>Street</Th>
                                        <Th>City</Th>
                                        <Th>Province</Th>
                                    </>
                                )}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedTab === 'users' && usersData.map(user => (
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.firstname}</Td>
                                    <Td>{user.lastname}</Td>
                                    <Td>{user.username}</Td>
                                    <Td>{user.phone}</Td>
                                </Tr>
                            ))}
                            {selectedTab === 'drivers' && driversData.map(driver => (
                                <Tr key={driver.driver_id}>
                                    <Td>{driver.driver_id}</Td>
                                    <Td>{driver.user_id}</Td>
                                    <Td>{driver.street}</Td>
                                    <Td>{driver.city}</Td>
                                    <Td>{driver.province}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </Flex>
        </Box>
    );
};

export default Users;
