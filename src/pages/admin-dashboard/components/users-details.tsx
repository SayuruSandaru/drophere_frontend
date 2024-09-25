import React, { useState, useEffect } from "react";
import { Box, Spinner, Flex, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import TabBtn from "./tab-btn";
import { getUserDetails } from 'api/user';
import driverService from 'api/services/driverService';

const Users = () => {
    const [selectedTab, setSelectedTab] = useState('users');
    const [loading, setLoading] = useState(false);
    const [driversLoading, setDriversLoading] = useState(false);
    const [usersData, setUsersData] = useState<any[]>([]);
    const [driversData, setDriversData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch data based on the selected tab
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getUserDetails();
                if (data.status === "success") {
                    setUsersData(data.users);
                } else {
                    setError('Failed to fetch user details');
                }
            } catch (error) {
                setError('Error fetching user details');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDrivers = async () => {
            setDriversLoading(true);
            try {
                const data = await driverService.getDriver();
                if (data.status === "success") {
                    setDriversData(data.drivers);
                } else {
                    setError('Failed to fetch driver details');
                }
            } catch (error) {
                setError('Error fetching driver details');
                console.error(error);
            } finally {
                setDriversLoading(false);
            }
        };

        if (selectedTab === 'users') {
            fetchUsers();
        } else if (selectedTab === 'drivers') {
            fetchDrivers();
        }
    }, [selectedTab]);

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
        setError(null);
    };

    // Loading and error handling
    const renderContent = () => {
        if (loading && selectedTab === 'users') {
            return (
                <Flex w="full" alignItems="center" justifyContent="center">
                    <Spinner size="xl" />
                </Flex>
            );
        }

        if (driversLoading && selectedTab === 'drivers') {
            return (
                <Flex w="full" alignItems="center" justifyContent="center">
                    <Spinner size="xl" />
                </Flex>
            );
        }

        if (error) {
            return <Box>{error}</Box>;
        }

        // Render table content based on the selected tab
        return (
            <Table w="full" boxShadow="lg" borderRadius="md">
                <Thead bg="white" h={16}>
                    <Tr>
                        {selectedTab === 'users' && (
                            <>
                                <Th fontSize="md">ID</Th>
                                <Th fontSize="md">Email</Th>
                                <Th fontSize="md">First Name</Th>
                                <Th fontSize="md">Last Name</Th>
                                <Th fontSize="md">Username</Th>
                                <Th fontSize="md">Phone</Th>
                            </>
                        )}
                        {selectedTab === 'drivers' && (
                            <>
                                <Th fontSize="md">Driver ID</Th>
                                <Th fontSize="md">User ID</Th>
                                <Th fontSize="md">Street</Th>
                                <Th fontSize="md">City</Th>
                                <Th fontSize="md">Province</Th>
                            </>
                        )}
                    </Tr>
                </Thead>
                <Tbody>
                    {selectedTab === 'users' && usersData.map((user) => (
                        <Tr key={user.id} bg="gray.100">
                            <Td>{user.id}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.firstname}</Td>
                            <Td>{user.lastname}</Td>
                            <Td>{user.username}</Td>
                            <Td>{user.phone}</Td>
                        </Tr>
                    ))}
                    {selectedTab === 'drivers' && driversData.map((driver) => (
                        <Tr key={driver.driver_id} bg="gray.100">
                            <Td>{driver.driver_id}</Td>
                            <Td>{driver.user_id}</Td>
                            <Td>{driver.street}</Td>
                            <Td>{driver.city}</Td>
                            <Td>{driver.province}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        );
    };

    return (
        <Box minH="100vh" p="4">
            {/* Tab buttons */}
            <Box mb="4">
                <TabBtn
                    selectedTab={selectedTab}
                    onUsersSelect={() => handleTabChange('users')}
                    onDriversSelect={() => handleTabChange('drivers')}
                />
            </Box>

            {/* Render table content based on selected tab */}
            <Flex w="full" bg="#edf3f8" p={50} alignItems="center" justifyContent="center">
                {renderContent()}
            </Flex>
        </Box>
    );
};

export default Users;
