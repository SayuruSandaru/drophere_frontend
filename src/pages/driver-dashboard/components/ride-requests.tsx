import { Box, Button, ButtonGroup, Flex, Spinner, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import CustomAlertDialog from "./alert-dialog";
import ReservationService from "api/services/reservationService";
import TabBtn from "./tab-btn";
import User from "model/user";

const RideReqTable = () => {
  const { isOpen: isOpenDecline, onOpen: onOpenDecline, onClose: onCloseDecline } = useDisclosure();
  const { isOpen: isOpenStart, onOpen: onOpenStart, onClose: onCloseStart } = useDisclosure();
  const headerOngoing = ["From", "To", "Price", "Type", "Actions"];
  const headerOther = ["From", "To", "Price", "Type"];
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
                  <Td
                    display={{ base: "table-cell", md: "none" }}
                    sx={{
                      "@media print": { display: "none" },
                      textTransform: "uppercase",
                      color: color1,
                      fontSize: "xs",
                      fontWeight: "bold",
                      letterSpacing: "wider",
                      fontFamily: "heading",
                    }}
                  >
                    From
                  </Td>
                  <Td color={"gray.500"} fontSize="md" fontWeight="light">
                    {token.ride.start_location}
                  </Td>
                  <Td
                    display={{ base: "table-cell", md: "none" }}
                    sx={{
                      "@media print": { display: "none" },
                      textTransform: "uppercase",
                      color: color1,
                      fontSize: "xs",
                      fontWeight: "bold",
                      letterSpacing: "wider",
                      fontFamily: "heading",
                    }}
                  >
                    To
                  </Td>
                  <Td color={"gray.500"} fontSize="md" fontWeight="light">
                    {token.ride.end_location}
                  </Td>
                  <Td
                    display={{ base: "table-cell", md: "none" }}
                    sx={{
                      "@media print": { display: "none" },
                      textTransform: "uppercase",
                      color: color1,
                      fontSize: "xs",
                      fontWeight: "bold",
                      letterSpacing: "wider",
                      fontFamily: "heading",
                    }}
                  >
                    Price
                  </Td>
                  <Td color={"gray.500"} fontSize="md" fontWeight="light">
                    {token.price}
                  </Td>
                  <Td
                    display={{ base: "table-cell", md: "none" }}
                    sx={{
                      "@media print": { display: "none" },
                      textTransform: "uppercase",
                      color: color1,
                      fontSize: "xs",
                      fontWeight: "bold",
                      letterSpacing: "wider",
                      fontFamily: "heading",
                    }}
                  >
                    Type
                  </Td>
                  <Td color={"gray.500"} fontSize="md" fontWeight="light">
                    {token.type}
                  </Td>
                  <Td
                    display={{ base: "table-cell", md: "none" }}
                    sx={{
                      "@media print": { display: "none" },
                      textTransform: "uppercase",
                      color: color2,
                      fontSize: "xs",
                      fontWeight: "bold",
                      letterSpacing: "wider",
                      fontFamily: "heading",
                    }}
                  >
                    Actions
                  </Td>
                  <Td>
                    {selectedStatus === "confirmed" && (
                      <>
                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                          <Button
                            colorScheme="green"
                            onClick={() => {
                              onOpenStart();
                              setSelectedReservation(token);
                            }}
                          >
                            Start
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              onOpenDecline();
                              setSelectedReservation(token);
                            }}
                          >
                            Decline
                          </Button>
                        </ButtonGroup>
                      </>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        <CustomAlertDialog
          isOpen={isOpenDecline}
          onClose={onCloseDecline}
          onVerify={handleDecline}
          title="Decline Ride"
          message="Are you sure you want to decline this ride?"
          mainBtnText={"Decline"}
          primaryColor={"red"}
        />
        <CustomAlertDialog
          isOpen={isOpenStart}
          onClose={onCloseStart}
          onVerify={handleStart}
          title="Start Ride"
          message="Are you sure you want to start this ride?"
          mainBtnText={"Start"}
        primaryColor={"green"}
        />
      </Flex>
    </Box>
  );
};

export default RideReqTable;
