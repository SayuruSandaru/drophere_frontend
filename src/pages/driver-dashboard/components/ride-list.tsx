import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import RideService from "api/services/rideService";

const RideListPage = () => {
  const [ride, setRide] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isErrorModalOpen, 
    onOpen: onErrorModalOpen, 
    onClose: onErrorModalClose 
  } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef();
  
  const headers = ["From", "To", "Date", "Status", "Passengers", "Actions"];

  useEffect(() => {
    fetchRide();
  }, [currentId]);

  const fetchRide = async () => {
    try {
      setLoading(true);
      const response = await RideService.getRideByIdfor("1");
      if (response.status === "success") {
        setRide(response.ride);
      } else {
        console.error("Failed to fetch ride:", response);
        toast({
          title: "Failed to fetch ride",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching ride:", error);
      toast({
        title: "Error fetching ride",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRide) return;
    
    try {
      setLoading(true);
      const response = await RideService.deleteRide(selectedRide.ride_id);
      if (response.status === "success") {
        setRide(null);
        toast({
          title: "Ride deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(response.message || "Failed to delete ride");
      }
    } catch (error) {
      console.error("Error deleting ride:", error);
      if (error.message.includes("foreign key constraint fails")) {
        onErrorModalOpen();
      } else {
        toast({
          title: "Failed to delete ride",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const nextRide = () => {
    setCurrentId(prevId => prevId + 1);
  };

  const prevRide = () => {
    setCurrentId(prevId => Math.max(1, prevId - 1));
  };

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
        {loading ? (
          <Spinner size="xl" />
        ) : ride ? (
          <Table
            w="full"
            bg="white"
            _dark={{ bg: "gray.800" }}
            display={{ base: "block", md: "table" }}
            sx={{ "@media print": { display: "table" } }}
          >
            <Thead
              display={{ base: "none", md: "table-header-group" }}
              sx={{ "@media print": { display: "table-header-group" } }}
            >
              <Tr>
                {headers.map((x) => (
                  <Th key={x}>{x}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody
              display={{ base: "block", lg: "table-row-group" }}
              sx={{ "@media print": { display: "table-row-group" } }}
            >
              <Tr
                display={{ base: "grid", md: "table-row" }}
                sx={{
                  "@media print": { display: "table-row" },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
              >
                <Td color={"gray.500"} fontSize="md" fontWeight="light">
                  {ride.start_location}
                </Td>
                <Td color={"gray.500"} fontSize="md" fontWeight="light">
                  {ride.end_location}
                </Td>
                <Td color={"gray.500"} fontSize="md" fontWeight="light">
                  {formatDate(ride.start_time)}
                </Td>
                <Td color={"gray.500"} fontSize="md" fontWeight="light">
                  {ride.status}
                </Td>
                <Td color={"gray.500"} fontSize="md" fontWeight="light">
                  {ride.passenger_count}
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      setSelectedRide(ride);
                      onOpen();
                    }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        ) : (
          <Box>No ride found</Box>
        )}
      </Flex>
      <Flex justifyContent="space-between" mt={4}>
        <Button onClick={prevRide} disabled={currentId === 1}>Previous Ride</Button>
        <Button onClick={nextRide}>Next Ride</Button>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Ride
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this ride?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={loading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isErrorModalOpen} onClose={onErrorModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cannot Delete Ride</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This ride cannot be deleted because it is associated with existing reservations.
            Please remove all associated reservations before deleting this ride.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onErrorModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RideListPage;