import React, { useState, useEffect } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    Flex,
    Spinner,
    Button,
    useToast,
    Text,
    Badge,
    Stack,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { getUserDetails, updateUserStatus } from 'api/user';
import driverService from 'api/services/driverService';
import RidesPopup from './rides-popup';

interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    phone: string;
    status: string;
}

interface Driver {
    driver_id: number;
    user_id: number;
    street: string;
    city: string;
    province: string;
    status: string;
}

const Users: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'users' | 'drivers'>('users');
    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState<User[]>([]);
    const [driversData, setDriversData] = useState<Driver[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [userIdToUpdate, setUserIdToUpdate] = useState<number | null>(null);
    const [newStatus, setNewStatus] = useState('');
    const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isRidesPopupOpen, setIsRidesPopupOpen] = useState(false);
    const toast = useToast();
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        if (selectedTab === 'users') {
            fetchUsers();
        } else if (selectedTab === 'drivers') {
            fetchDrivers();
        }
    }, [selectedTab]);

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
        setLoading(true);
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
            setLoading(false);
        }
    };

    const handleTabChange = (tab: 'users' | 'drivers') => {
        setSelectedTab(tab);
        setError(null);
    };

    const handleStatusChange = (userId: number, status: string) => {
        setUserIdToUpdate(userId);
        setNewStatus(status);
        setIsStatusModalOpen(true);
    };

    const closeStatusModal = () => {
        setIsStatusModalOpen(false);
        setUserIdToUpdate(null);
        setNewStatus('');
    };

    const handleUpdateStatus = async () => {
        if (userIdToUpdate && newStatus) {
            try {
                setUpdatingUserId(userIdToUpdate);
                const response = await updateUserStatus(userIdToUpdate, newStatus);
                if (response && response.status === "success") {
                    setUsersData(usersData.map(user => 
                        user.id === userIdToUpdate ? {...user, status: newStatus} : user
                    ));
                    toast({
                        title: "Status updated",
                        description: response.message || `User status has been successfully updated to ${newStatus}.`,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    throw new Error(response.message || "Failed to update user status");
                }
            } catch (error) {
                console.error(`Failed to update user status: `, error);
                toast({
                    title: "Error",
                    description: error.message || "Failed to update user status. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setUpdatingUserId(null);
                closeStatusModal();
            }
        }
    };

    const handleViewRides = (driver: Driver) => {
        setSelectedDriver(driver);
        setIsRidesPopupOpen(true);
    };

    const closeRidesPopup = () => {
        setIsRidesPopupOpen(false);
        setSelectedDriver(null);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'green';
            case 'suspended':
                return 'yellow';
            case 'deleted':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getStatusColorDriver = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'yellow';   
            case 'accepted':
                return 'green';    
            case 'rejected':
                return 'red';      
            case 'suspended':
                return 'orange';   
            default:
                return 'gray';     
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <Flex w="full" alignItems="center" justifyContent="center">
                    <Spinner size="xl" />
                </Flex>
            );
        }

        if (error) {
            return <Box color="red">{error}</Box>;
        }

        if (isMobile) {
            return (
                <Stack spacing={4}>
                    {selectedTab === 'users' ? 
                        usersData.map((user) => (
                            <Box key={user.id} p={4} borderWidth={1} borderRadius="md" shadow="md">
                                <Text><strong>ID:</strong> {user.id}</Text>
                                <Text><strong>Email:</strong> {user.email}</Text>
                                <Text><strong>Name:</strong> {user.firstname} {user.lastname}</Text>
                                <Text><strong>Username:</strong> {user.username}</Text>
                                <Text><strong>Phone:</strong> {user.phone}</Text>
                                <Flex alignItems="center" mt={2}>
                                    <Text mr={2}><strong>Status:</strong></Text>
                                    <Badge colorScheme={getStatusColor(user.status)}>{user.status}</Badge>
                                </Flex>
                                <Select 
                                    mt={2}
                                    value={user.status}
                                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                    isDisabled={updatingUserId === user.id}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Suspended">Suspended</option>
                                    <option value="Deleted">Deleted</option>
                                </Select>
                                {updatingUserId === user.id && <Spinner size="sm" mt={2} />}
                            </Box>
                        ))
                    : 
                        driversData.map((driver) => (
                            <Box key={driver.driver_id} p={4} borderWidth={1} borderRadius="md" shadow="md">
                                <Text><strong>Driver ID:</strong> {driver.driver_id}</Text>
                                <Text><strong>User ID:</strong> {driver.user_id}</Text>
                                <Text><strong>Street:</strong> {driver.street}</Text>
                                <Text><strong>City:</strong> {driver.city}</Text>
                                <Text><strong>Province:</strong> {driver.province}</Text>
                                <Flex alignItems="center" mt={2}>
                                    <Text mr={2}><strong>Status:</strong></Text>
                                    <Badge colorScheme={getStatusColorDriver(driver.status)}>{driver.status}</Badge>
                                </Flex>
                                <Button
                                    mt={2}
                                    size="sm"
                                    colorScheme="blue"
                                    onClick={() => handleViewRides(driver)}
                                >
                                    View Rides
                                </Button>
                            </Box>
                        ))
                    }
                </Stack>
            );
        }

        return (
            <Box overflowX="auto">
                <Table w="full" boxShadow="lg" borderRadius="md">
                    <Thead bg="gray.100">
                        <Tr>
                            {selectedTab === 'users' ? (
                                <>
                                    <Th width="10%">ID</Th>
                                    <Th width="20%">Email</Th>
                                    <Th width="15%">Name</Th>
                                    <Th width="15%">Username</Th>
                                    <Th width="15%">Phone</Th>
                                    <Th width="10%">Status</Th>
                                    <Th width="15%">Action</Th>
                                </>
                            ) : (
                                <>
                                    <Th width="15%">Driver ID</Th>
                                    <Th width="15%">User ID</Th>
                                    <Th width="15%">Street</Th>
                                    <Th width="15%">City</Th>
                                    <Th width="15%">Province</Th>
                                    <Th width="15%">Status</Th>
                                    <Th width="10%">Action</Th>
                                </>
                            )}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {selectedTab === 'users' ? 
                            usersData.map((user) => (
                                <Tr key={user.id}>
                                    <Td width="10%">{user.id}</Td>
                                    <Td width="20%">{user.email}</Td>
                                    <Td width="15%">{user.firstname} {user.lastname}</Td>
                                    <Td width="15%">{user.username}</Td>
                                    <Td width="15%">{user.phone}</Td>
                                    <Td width="10%">
                                        <Badge colorScheme={getStatusColor(user.status)}>{user.status}</Badge>
                                    </Td>
                                    <Td width="15%">
                                        <Select 
                                            value={user.status}
                                            size="sm"
                                            onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                            isDisabled={updatingUserId === user.id}
                                            width="full"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Suspended">Suspended</option>
                                            <option value="Deleted">Deleted</option>
                                        </Select>
                                        {updatingUserId === user.id && <Spinner size="sm" ml={2} />}
                                    </Td>
                                </Tr>
                            ))
                        : 
                            driversData.map((driver) => (
                                <Tr key={driver.driver_id}>
                                    <Td width="15%">{driver.driver_id}</Td>
                                    <Td width="15%">{driver.user_id}</Td>
                                    <Td width="15%">{driver.street}</Td>
                                    <Td width="15%">{driver.city}</Td>
                                    <Td width="15%">{driver.province}</Td>
                                    <Td width="15%">
                                        <Badge colorScheme={getStatusColorDriver(driver.status)}>{driver.status}</Badge>
                                    </Td>
                                    <Td width="10%">
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => handleViewRides(driver)}
                                        >
                                            View Rides
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </Box>
        );
    };

    return (
        <Box minH="100vh" p={4}>
            <Stack direction={["column", "row"]} spacing={4} mb={4}>
                <Button 
                    onClick={() => handleTabChange('users')} 
                    colorScheme={selectedTab === 'users' ? 'blue' : 'gray'}
                    flex={1}
                >
                    Users
                </Button>
                <Button 
                    onClick={() => handleTabChange('drivers')} 
                    colorScheme={selectedTab === 'drivers' ? 'blue' : 'gray'}
                    flex={1}
                >
                    Drivers
                </Button>
            </Stack>

            <Box w="full" bg="white" p={4} borderRadius="md" shadow="md">
                {renderContent()}
            </Box>

            <Modal isOpen={isStatusModalOpen} onClose={closeStatusModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Status Change</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to change the user's status to {newStatus}?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={closeStatusModal}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={handleUpdateStatus} ml={3}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <RidesPopup
                isOpen={isRidesPopupOpen}
                onClose={closeRidesPopup}
                driverId={selectedDriver?.driver_id}
            />
        </Box>
    );
};

export default Users;