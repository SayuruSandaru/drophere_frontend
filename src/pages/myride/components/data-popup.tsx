// src/components/DataPopup.tsx
import React, { useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Flex,
    Avatar,
    Text,
    Spacer,
    Tag,
    Spinner
} from '@chakra-ui/react';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import driverService from 'api/services/driverService';
import { useShowErrorToast } from 'pages/components/toast';

interface DataPopupProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
}

const DataPopup: React.FC<DataPopupProps> = ({ isOpen, onClose, data }) => {
    const [driver, setDriver] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const showErrorToast = useShowErrorToast();
    const formattedStartTime = format(new Date(data.ride.start_time), 'do MMM yy, h:mm a');

    const getDetails = async (driverId) => {
        try {
            setLoading(true);
            const res = await driverService.getDriverById(driverId);
            console.log(res);
            setDriver(res.driver);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showErrorToast("Error getting driver details");
        }
    };

    useEffect(() => {
        if (data) {
            getDetails(data.driver_id);

        }
    }, [data]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Ride Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading && (
                        <Flex justify="center" align="center">
                            <Spinner />
                        </Flex>

                    )}
                    {!loading && driver && (
                        <>
                            <Flex direction={"column"} align="center">
                                <Flex direction="column" align="center" mb={4}>
                                    <Avatar size="md" name={driver.user.username} src={driver.user.profile_image} mb={2} />
                                    <Text fontSize={"lg"} fontWeight={'medium'} color={"gray.800"}>{driver.user.username}</Text>
                                    <Text fontSize={"sm"} color={"gray.600"}>{driver.user.email}</Text>
                                    <Text fontSize={"small"}>verified driver</Text>
                                </Flex>
                                <Box textAlign="left" w="100%" p={"5"}>
                                    <Flex direction={"row"}>
                                        <Text><strong>From: </strong>{data.ride.start_location}</Text>
                                        <Spacer />
                                        <Text><strong>To: </strong>{data.ride.end_location}</Text>
                                    </Flex>
                                    <Text mt={"5px"}><strong>Price: </strong>{` Rs.${data.price}`}</Text>
                                    <Text mt={"5px"}><strong>Start Time: </strong>{formattedStartTime}</Text>
                                    <Text mt={"5px"}><strong>Type:</strong> {data.type}</Text>
                                    {data.status === 'ongoing' && (
                                        <>
                                            <Button size="xs" leftIcon={<FaMapMarkerAlt />} colorScheme="teal" variant="outline" mt={2}>
                                                View Location
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </Flex>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color={"white"} bgColor="black" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DataPopup;
