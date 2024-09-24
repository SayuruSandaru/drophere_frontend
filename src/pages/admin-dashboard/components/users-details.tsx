import { Box, Spinner, useColorModeValue, Flex, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import TabBtn from "./tab-btn"; // Adjust path as needed
import { getUserDetails } from 'api/user'; // Assuming this is where the API call is made
import driverService from 'api/services/driverService'; // Import the driver service

const Users = () => {
    const [selectedTab, setSelectedTab] = useState('users'); // Default selected tab
    const [loading, setLoading] = useState(true); // Loading state for users
    const [driversLoading, setDriversLoading] = useState(true); // Loading state for drivers
    const [usersData, setUsersData] = useState<any[]>([]); // User data array
    const [driversData, setDriversData] = useState<any[]>([]); // Driver data array
    const [error, setError] = useState<string | null>(null); // Error handling

    // Fetch user details from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUserDetails(); // Fetch user details
                if (data.status === "success") {
                    setUsersData(data.users); // Store users in state
                } else {
                    setError('Failed to fetch user details');
                }
            } catch (error) {
                setError('Error fetching user details'); // Catch and set error
                console.error(error);
            } finally {
                setLoading(false); // Loading finished
            }
        };

        const fetchDrivers = async () => {
            setDriversLoading(true); // Set loading for drivers
            try {
                const data = await driverService.getDriver(); // Fetch driver details
                if (data.status === "success") {
                    setDriversData(data.drivers); // Store drivers in state
                } else {
                    setError('Failed to fetch driver details');
                }
            } catch (error) {
                setError('Error fetching driver details'); // Catch and set error
                console.error(error);
            } finally {
                setDriversLoading(false); // Loading finished for drivers
            }
        };

        fetchUsers(); // Call fetch function for users on component mount

        // Fetch drivers if the selected tab is 'drivers'
        if (selectedTab === 'drivers') {
            fetchDrivers();
        }
    }, [selectedTab]); // Add selectedTab as a dependency

    const tableBg = useColorModeValue('white', 'gray.800'); // Background color based on color mode

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab); // Update selected tab
    };

    // Render loading state
    if (loading) {
        return (
            <Flex
                w="full"
                h="100vh"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner size="xl" />
            </Flex>
        );
    }

    // Render error state
    if (error) {
        return <Box>{error}</Box>;
    }

    // Main component render
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
                <Table w="full" bg={tableBg} _dark={{ bg: "gray.800" }}>
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
                        {selectedTab === 'users' && Array.isArray(usersData) && usersData.map((user) => (
                            <Tr key={user.id}>
                                <Td>{user.id}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.firstname}</Td>
                                <Td>{user.lastname}</Td>
                                <Td>{user.username}</Td>
                                <Td>{user.phone}</Td>
                            </Tr>
                        ))}
                        {selectedTab === 'drivers' && driversLoading ? (
                            <Tr>
                                <Td colSpan={5} textAlign="center">
                                    <Spinner size="lg" />
                                </Td>
                            </Tr>
                        ) : (
                            Array.isArray(driversData) && driversData.map(driver => (
                                <Tr key={driver.driver_id}>
                                    <Td>{driver.driver_id}</Td>
                                    <Td>{driver.user_id}</Td>
                                    <Td>{driver.street}</Td>
                                    <Td>{driver.city}</Td>
                                    <Td>{driver.province}</Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </Flex>
        </Box>
    );
};

export default Users;
