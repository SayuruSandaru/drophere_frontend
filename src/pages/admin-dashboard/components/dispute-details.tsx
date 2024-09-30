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
} from "@chakra-ui/react";
import { getDispatchDetails, updateDisputeStatus } from "api/dispatch";
import { getUserById } from "api/user";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    // Add other fields as needed
}

interface Dispute {
    DisputeId: number;
    UserId: string;
    Category: string;
    Message: string;
    Status: string;
    user?: User;
}

const DispatchDetails: React.FC = () => {
    const [disputesData, setDisputesData] = useState<Dispute[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<'complain' | 'cancel'>('complain');
    const [updatingDisputeId, setUpdatingDisputeId] = useState<number | null>(null);
    const toast = useToast();

    const isMobile = useBreakpointValue({ base: true, md: false });

    const fetchDispatchDetails = async () => {
        try {
            setLoading(true);
            const data = await getDispatchDetails();
            
            const disputesWithUserDetails = await Promise.all(data.map(async (dispute: Dispute) => {
                try {
                    const response = await getUserById(dispute.UserId);
                    if (response.status === "success" && response.user) {
                        return { 
                            ...dispute, 
                            user: response.user
                        };
                    }
                    return dispute;
                } catch (error) {
                    console.error(`Error fetching user details for UserId ${dispute.UserId}:`, error);
                    return dispute;
                }
            }));

            setDisputesData(disputesWithUserDetails);
        } catch (err) {
            setError("Failed to load dispatch details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDispatchDetails();
    }, []);

    const handleTabChange = (tab: 'complain' | 'cancel') => {
        setSelectedTab(tab);
    };

    const handleStatusChange = async (disputeId: number, newStatus: string) => {
        try {
            setUpdatingDisputeId(disputeId);
            await updateDisputeStatus(disputeId, newStatus);
            await fetchDispatchDetails(); // Refetch to reflect the new status
            toast({
                title: "Status updated",
                description: "The dispute status has been successfully updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error updating status: ", error);
            toast({
                title: "Update failed",
                description: "Failed to update the dispute status. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setUpdatingDisputeId(null);
        }
    };

    const filteredDisputes = disputesData.filter(dispute =>
        selectedTab === 'complain' ? dispute.Category === 'complain' : dispute.Category === 'cancel'
    );

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'yellow';
            case 'solved':
                return 'green';
            default:
                return 'gray';
        }
    };

    const renderTableContent = () => {
        if (loading) return <Spinner size="lg" />;
        if (error) return <Box color="red">{error}</Box>;

        if (isMobile) {
            return (
                <Stack spacing={4}>
                    {filteredDisputes.map((dispute) => (
                        <Box key={dispute.DisputeId} p={4} borderWidth={1} borderRadius="md" shadow="md">
                            <Text><strong>Dispute ID:</strong> {dispute.DisputeId}</Text>
                            <Text><strong>User:</strong> {dispute.user?.firstname} {dispute.user?.lastname}</Text>
                            <Text><strong>Phone:</strong> {dispute.user?.phone}</Text>
                            <Text><strong>Email:</strong> {dispute.user?.email}</Text>
                            <Text><strong>Category:</strong> {dispute.Category}</Text>
                            <Text><strong>Message:</strong> {dispute.Message}</Text>
                            <Flex alignItems="center" mt={2}>
                                <Text mr={2}><strong>Status:</strong></Text>
                                <Badge colorScheme={getStatusColor(dispute.Status)}>{dispute.Status}</Badge>
                            </Flex>
                            <Select 
                                mt={2}
                                value={dispute.Status} 
                                onChange={(e) => handleStatusChange(dispute.DisputeId, e.target.value)}
                                isDisabled={updatingDisputeId === dispute.DisputeId}
                            >
                                <option value="pending">Pending</option>
                                <option value="solved">Solved</option>
                            </Select>
                            {updatingDisputeId === dispute.DisputeId && <Spinner size="sm" mt={2} />}
                        </Box>
                    ))}
                </Stack>
            );
        }

        return (
            <Box overflowX="auto">
                <Table w="full" boxShadow="lg" borderRadius="md">
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Dispute ID</Th>
                            <Th>User</Th>
                            <Th>Contact</Th>
                            <Th>Category</Th>
                            <Th>Message</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredDisputes.map((dispute) => (
                            <Tr key={dispute.DisputeId}>
                                <Td>{dispute.DisputeId}</Td>
                                <Td>
                                    <Text>{dispute.user?.firstname} {dispute.user?.lastname}</Text>
                                    <Text fontSize="sm" color="gray.500">{dispute.UserId}</Text>
                                </Td>
                                <Td>
                                    <Text>{dispute.user?.phone}</Text>
                                    <Text fontSize="sm" color="gray.500">{dispute.user?.email}</Text>
                                </Td>
                                <Td>{dispute.Category}</Td>
                                <Td>{dispute.Message}</Td>
                                <Td>
                                    <Badge colorScheme={getStatusColor(dispute.Status)}>{dispute.Status}</Badge>
                                </Td>
                                <Td>
                                    <Select 
                                        value={dispute.Status} 
                                        size="sm"
                                        onChange={(e) => handleStatusChange(dispute.DisputeId, e.target.value)}
                                        isDisabled={updatingDisputeId === dispute.DisputeId}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="solved">Solved</option>
                                    </Select>
                                    {updatingDisputeId === dispute.DisputeId && <Spinner size="sm" ml={2} />}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        );
    };

    return (
        <Box minH="100vh" p={4}>
            <Stack direction={["column", "row"]} spacing={4} mb={4}>
                <Button 
                    onClick={() => handleTabChange('complain')} 
                    colorScheme={selectedTab === 'complain' ? 'blue' : 'gray'}
                    flex={1}
                >
                    Complain
                </Button>
                <Button 
                    onClick={() => handleTabChange('cancel')} 
                    colorScheme={selectedTab === 'cancel' ? 'blue' : 'gray'}
                    flex={1}
                >
                    Ride Cancel
                </Button>
            </Stack>

            <Box w="full" bg="white" p={4} borderRadius="md" shadow="md">
                {renderTableContent()}
            </Box>
        </Box>
    );
};

export default DispatchDetails;