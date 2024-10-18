// src/components/DataPopup.tsx
import React, { useEffect, useState } from "react";
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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import { FaMapMarkerAlt } from "react-icons/fa";
import { format } from "date-fns";
import driverService from "api/services/driverService";
import { useShowErrorToast } from "pages/components/toast";
import MapPopup from "./map-popup";
import { Link } from "react-router-dom";
import { RouterPaths } from "router/routerConfig";

interface DataPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const DataPopup: React.FC<DataPopupProps> = ({ isOpen, onClose, data }) => {
  const [driver, setDriver] = useState<any>(null);
  const {
    isOpen: isOpenMap,
    onOpen: onOpenMap,
    onClose: onCloseMap,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const showErrorToast = useShowErrorToast();
  const formattedStartTime =
    data && data.ride
      ? format(new Date(data.ride.start_time), "do MMM yy, h:mm a")
      : "";

  const getDetails = async (driverId: string) => {
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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ride Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Flex justify="center" align="center">
                <Spinner />
              </Flex>
            ) : (
              driver && (
                <Flex direction="column" align="center">
                  <Flex direction="column" align="center" mb={4}>
                    <Avatar
                      size="md"
                      name={driver.user.username}
                      src={driver.user.profile_image}
                      mb={2}
                    />
                    <Text fontSize="lg" fontWeight="medium" color="gray.800">
                      {driver.user.username}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {driver.user.email}
                    </Text>
                    <Text fontSize="small">verified driver</Text>
                  </Flex>
                  <Box textAlign="left" w="100%" p="5">
                    <Flex direction="row">
                      <Text>
                        <strong>From: </strong>
                        {data.ride.start_location}
                      </Text>
                      <Spacer />
                      <Text>
                        <strong>To: </strong>
                        {data.ride.end_location}
                      </Text>
                    </Flex>
                    <Text mt="5px">
                      <strong>Price: </strong>
                      {` Rs.${data.price}`}
                    </Text>
                    <Text mt="5px">
                      <strong>Start Time: </strong>
                      {formattedStartTime}
                    </Text>
                    <Text mt="5px">
                      <strong>Type: </strong>
                      {data.type}
                    </Text>
                    <Button
                      as={Link}
                      to={RouterPaths.COMPLAIN}
                      size="xs"
                      mt={2}
                      variant="link"
                      fontSize="sm"
                    >
                      Make a complain
                    </Button>

                    {data.status === "ongoing" && (
                      <Button
                        size="xs"
                        leftIcon={<FaMapMarkerAlt />}
                        colorScheme="teal"
                        variant="outline"
                        mt={2}
                        onClick={onOpenMap}
                      >
                        View Location
                      </Button>
                    )}
                  </Box>
                </Flex>
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="white" bgColor="black" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {data.status === "ongoing" && (
        <MapPopup
          isOpen={isOpenMap}
          onClose={onCloseMap}
          data={data?.ride?.route}
          databasePath={`rides/R${data?.reservation_id}-I${data?.ride_id}`}
        />
      )}
    </>
  );
};

export default DataPopup;
