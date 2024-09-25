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
} from "@chakra-ui/react";
import { getDispatchDetails, updateDisputeStatus } from "api/dispatch"; // Adjust import based on your file structure

const DispatchDetails = () => {
    const [disputesData, setDisputesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<'complain' | 'cancel'>('complain');

    const fetchDispatchDetails = async () => {
        try {
            const data = await getDispatchDetails();
            console.log("Fetched dispatch details: ", data);
            setDisputesData(data);
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
            await updateDisputeStatus(disputeId, newStatus);
            fetchDispatchDetails(); // Optionally refetch to reflect the new status
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    // Filter the disputes based on the selected tab
    const filteredDisputes = disputesData.filter(dispute =>
        selectedTab === 'complain' ? dispute.Category === 'complain' : dispute.Category === 'cancel'
    );

    const renderTableContent = () => {
        if (loading) return <Spinner size="lg" />;
        if (error) return <Box color="red">{error}</Box>;

        return (
            <Table w="full" boxShadow="lg" borderRadius="md">
                <Thead bg="white" h={16}>
                    <Tr>
                        <Th>Dispute ID</Th>
                        <Th>Category</Th>
                        <Th>Status</Th>
                        <Th>Message</Th>
                        <Th>User ID</Th>
                        <Th>Action</Th> {/* Add Action column */}
                    </Tr>
                </Thead>
                <Tbody bg="gray.100">
                    {filteredDisputes.map((dispute) => (
                        <Tr key={dispute.DisputeId}>
                            <Td>{dispute.DisputeId}</Td>
                            <Td>{dispute.Category}</Td>
                            <Td>{dispute.Status}</Td>
                            <Td>{dispute.Message}</Td>
                            <Td>{dispute.UserId}</Td>
                            <Td>
                                <Select 
                                    defaultValue={dispute.Status} 
                                    size="sm"
                                    onChange={(e) => handleStatusChange(dispute.DisputeId, e.target.value)} // Handle the status change
                                >
                                    <option value="pending">Pending</option>
                                    <option value="solved">Solved</option>
                                </Select>
                            </Td>
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
                <Button onClick={() => handleTabChange('complain')} colorScheme={selectedTab === 'complain' ? 'blue' : 'gray'} mr={4}>
                    Complain
                </Button>
                <Button onClick={() => handleTabChange('cancel')} colorScheme={selectedTab === 'cancel' ? 'blue' : 'gray'}>
                    Ride Cancel
                </Button>
            </Box>

            {/* Render table content */}
            <Flex w="full" bg="#edf3f8" p={50} alignItems="center" justifyContent="center">
                {renderTableContent()}
            </Flex>
        </Box>
    );
};

export default DispatchDetails;
