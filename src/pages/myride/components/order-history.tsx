import React, { useEffect, useState } from 'react';
import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr, Tag, useDisclosure, IconButton } from "@chakra-ui/react";
import ActionMenu from './action-menu';
import DataPopup from './data-popup';
import driverService from 'api/services/driverService';
import { FaEye } from 'react-icons/fa';

const OrderHistoryTable = ({ data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedData, setSelectedData] = useState(null);
    const [driver, setDriver] = useState(null);


    const header = ["Reservation No", "From", "To", "Status", "Type"];

    const handleStart = (data) => {
        setSelectedData(data);
        onOpen();
    };

    const handleDecline = () => {
        console.log('Decline action triggered');
    };

    const getDriverById = async (id) => {
        try {
            const response = await driverService.getDriverById(id);
            console.log(response);
            setDriver(response);
            return response.data;
        } catch (error) {
            console.log("Error getting driver by user: ", error);
        }
    };

    useEffect(() => {
        if (selectedData === null) {
            return;
        } else {
            console.log(selectedData);
            getDriverById(selectedData.driver_id);
        }
    }, []);

    return (
        <Box>
            <Flex
                w="full"
                bg="#edf3f8"
                _dark={{ bg: "#3e3e3e" }}
                p={50}
                alignItems="center"
                justifyContent="center"
            >
                <Table
                    w="full"
                    bg="white"
                    borderBottomRadius={"20px"}
                    borderTop="2px solid teal"
                    _dark={{ bg: "gray.800" }}
                    display={{ base: "block", md: "table" }}
                    sx={{ "@media print": { display: "table" } }}
                >
                    <Thead
                        display={{ base: "none", md: "table-header-group" }}
                        sx={{ "@media print": { display: "table-header-group" } }}
                    >
                        <Tr>
                            {header.map((headerItem) => (
                                <Th key={headerItem}>{headerItem}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody
                        display={{ base: "block", lg: "table-row-group" }}
                        sx={{ "@media print": { display: "table-row-group" } }}
                    >
                        {data.map((item, index) => (
                            <Tr
                                key={index}
                                display={{ base: "grid", md: "table-row" }}
                                sx={{
                                    "@media print": { display: "table-row" },
                                    gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                                    gridGap: "10px",
                                    borderBottom: "1px solid gray"
                                }}
                            >
                                <Td>{`RE-00${item.reservation_id}`}</Td>
                                <Td>{item.ride.start_location}</Td>
                                <Td>{item.ride.end_location}</Td>
                                <Td>
                                    <StatusTag key={item.id} status={item.status} />
                                </Td>
                                <Td>{item.type}</Td>
                                <Td>
                                    {/* <ActionMenu onStart={() => handleStart(item)} onDecline={handleDecline} /> */}
                                    <IconButton
                                        aria-label="View item"
                                        icon={<FaEye />}
                                        onClick={() => handleStart(item)}
                                        colorScheme="gray"
                                        ml={2}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Flex>
            {selectedData !== null && (
                <DataPopup isOpen={isOpen} onClose={onClose} data={selectedData} />
            )}
        </Box >
    );
};

export default OrderHistoryTable;



const StatusTag = ({ status }) => {
    const getColorScheme = (status) => {
        switch (status) {
            case 'ongoing':
                return 'green';
            case 'completed':
                return 'teal';
            case 'confirmed':
                return 'blue';
            case 'cancelled':
                return 'red';
            default:
                return 'gray';
        }
    };

    return (
        <Tag colorScheme={getColorScheme(status)}>
            {status}
        </Tag>
    );
};

