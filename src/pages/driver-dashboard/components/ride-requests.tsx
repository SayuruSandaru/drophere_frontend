import { Box, IconButton, Flex, Spinner, useColorModeValue, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Image, Button } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { FaEye } from "react-icons/fa"; // Import the eye icon
import React, { useEffect, useState } from "react";
import CustomAlertDialog from "./alert-dialog";
import ReservationService from "api/services/reservationService";
import TabBtn from "./tab-btn";
import User from "model/user";

const RideReqTable = () => {
  const { isOpen: isOpenDecline, onOpen: onOpenDecline, onClose: onCloseDecline } = useDisclosure();
  const { isOpen: isOpenStart, onOpen: onOpenStart, onClose: onCloseStart } = useDisclosure();
  
  // Modal controls
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  const [selectedSignature, setSelectedSignature] = useState(null); // State to store selected signature

  const headerOngoing = ["From", "To", "Price", "Type", "Actions"];
  const headerOther = ["From", "To", "Price", "Type"]; // Default without Actions for other tabs
  const headerCompleted = ["From", "To", "Price", "Type", "Actions"]; // Completed tab includes Actions
  const [data, setData] = useState([]);
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");
  const [loading, setLoading] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("ongoing");

  useEffect(() => {
    fetchReservations("confirmed");
  }, []);

  const fetchReservations = async (status: string) => {
    try {
      setLoading(true);
      setData([]);
      console.log("Driver ID:", User.getDriverDetails().driver_id); // Update to get the driver's ID
      const result = await ReservationService.getReservationsByStatusDriverId(status, User.getDriverDetails().driver_id); // Use driver ID
      console.log("Fetched reservations:", result);
      const reservations = result.data || result;

    if (reservations.length > 0) {
      const mappedData = reservations.map(reservation => ({
        ...reservation,
        id: reservation.id || reservation._id || reservation.reservation_id
      }));
      setLoading(false);
      setData(mappedData);
    }else{
      setLoading(false);}


    } catch (error) {
      setLoading(false);
      console.error("Error fetching ride requests: ", error);
    }
  };

  const handleStart = async () => {
    console.log("handleStart called, selectedReservation:", selectedReservation);
    try {
      onCloseStart();
      setLoading(true);
      if (!selectedReservation) {
        console.error("No reservation selected");
        setLoading(false);
        return;
      }
      if (!selectedReservation.id) {
        console.error("Reservation ID is missing", selectedReservation);
        setLoading(false);
        return;
      }
      const result = await ReservationService.updateReservationStatus(selectedReservation.id, "ongoing");
      console.log("Update result:", result);
      setData(data.map(item => item.id === selectedReservation.id ? { ...item, status: "ongoing" } : item));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating reservation status: ", error);
    }
  };

  const handleDecline = async () => {
    try {
      onCloseDecline();
      setLoading(true);
      if (!selectedReservation || !selectedReservation.id) {
        console.error("No reservation selected or reservation ID is missing");
        setLoading(false);
        return;
      }
      console.log("Declining ride for reservation:", selectedReservation);
      const result = await ReservationService.updateReservationStatus(selectedReservation.id, "cancelled");
      console.log("Update result:", result);
      setData(data.map(item => item.id === selectedReservation.id ? { ...item, status: "cancelled" } : item));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating reservation status: ", error);
    }
  };

  const handleOngoingSelect = async () => {
    setSelectedStatus("ongoing");
    await fetchReservations("ongoing");
  };

  const handleConfirmedSelect = async () => {
    setSelectedStatus("confirmed");
    await fetchReservations("confirmed");
  };

  const handleCancelledSelect = async () => {
    setSelectedStatus("cancelled");
    await fetchReservations("cancelled");
  };

  const handleCompletedSelect = async () => {
    setSelectedStatus("completed");
    await fetchReservations("completed");
  };

  // Handle opening modal for viewing signature
  const handleViewSignature = (signatureUrl) => {
    setSelectedSignature(signatureUrl);
    onOpenModal();
  };

  return (
    <Box>
      <Box mt={"20px"}>
        <TabBtn
          onCancelledSelect={handleCancelledSelect}
          onConfirmedSelect={handleConfirmedSelect}
          onOngoingSelect={handleOngoingSelect}
          onCompletedSelect={handleCompletedSelect}
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
                {selectedStatus === "completed" ? (
                  headerCompleted.map((x) => <Th key={x}>{x}</Th>)
                ) : (
                  headerOther.map((x) => <Th key={x}>{x}</Th>)
                {selectedStatus === "confirmed" && (
                  <>
                    {headerOngoing.map((x) => (
                      <Th key={x}>{x}</Th>
                    ))}
                  </>
                )}
                {selectedStatus !== "confirmed" && (
                  <>
                    {headerOther.map((x) => (
                      <Th key={x}>{x}</Th>
                    ))}
                  </>
                )}
              </Tr>
            </Thead>
            <Tbody
              display={{ base: "block", lg: "table-row-group" }}
              sx={{ "@media print": { display: "table-row-group" } }}
            >
              {data.map((token, tid) => (
                <Tr
                  key={tid}
                  display={{ base: "grid", md: "table-row" }}
                  sx={{
                    "@media print": { display: "table-row" },
                    gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                    gridGap: "10px",
                  }}
                >
                  <Td color={"gray.500"} fontSize="md" fontWeight="light">
                    {token.ride.start_location}
                  </Td>
                  <Td color={"gray.500"} fontSize="md" fontWeight="light">
                    {token.ride.end_location}
                  </Td>
                  <Td color={"gray.500"} fontSize="md" fontWeight="light">
                    {token.price}
                  </Td>
                  <Td color={"gray.500"} fontSize="md" fontWeight="light">
                    {token.type}
                  </Td>

                  {/* Actions column for Completed tab */}
                  {selectedStatus === "completed" && (
                    <Td>
                      {token.type === "delivery" && (
                        <IconButton
                          colorScheme="blue"
                          icon={<FaEye />}
                          aria-label="View Signature"
                          onClick={() => handleViewSignature(token.delivery_details.signature)} // Pass the signature URL
                        />
                      )}
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>

      {/* Modal for viewing signature */}
      <Modal isOpen={isOpenModal} onClose={onCloseModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Signature</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSignature ? (
              <Image src={selectedSignature} alt="Signature" />
            ) : (
              <p>No signature available</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CustomAlertDialog
        mainBtnText={"Decline"}
        primaryColor={"red"}
        title={"Decline request"}
        message={"Are you sure you want to decline this request"}
        isOpen={isOpenDecline}
        onClose={onCloseDecline}
        onVerify={handleDecline}
      />
      <CustomAlertDialog
        mainBtnText={"Start"}
        primaryColor={"green"}
        />
      </Flex>
    </Box>
  );
};

export default RideReqTable;
