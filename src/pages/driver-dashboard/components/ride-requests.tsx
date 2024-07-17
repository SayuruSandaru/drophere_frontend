import { Box, Button, ButtonGroup, Flex, Spinner, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import CustomAlertDialog from "./alert-dialog";
import ReservationService from "api/services/reservationService";

const RideReqTable = () => {
  const { isOpen: isOpenDecline, onOpen: onOpenDecline, onClose: onCloseDecline } = useDisclosure();
  const { isOpen: isOpenStart, onOpen: onOpenStart, onClose: onCloseStart } = useDisclosure();
  const header = ["From", "To", "Price", "Type", "Actions"];
  const [data, setData] = useState([]);
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");
  const [loading, setLoading] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await ReservationService.getReservationsByStatus("confirmed");
        console.log("Raw fetched reservations:", result);

        // Check if result.data exists, otherwise use result directly
        const reservations = result.data || result;

        // Map the data to ensure each reservation has an id
        const mappedData = reservations.map(reservation => ({
          ...reservation,
          id: reservation.id || reservation._id || reservation.reservation_id
        }));

        console.log("Mapped reservations:", mappedData);

        setLoading(false);
        setData(mappedData);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching ride requests: ", error);
      }
    };

    fetchData();
  }, []);

  const handleStart = async () => {
    console.log("handleStart called, selectedReservation:", selectedReservation);
    try {
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
      onCloseStart();
    } catch (error) {
      setLoading(false);
      console.error("Error updating reservation status: ", error);
      // Add error handling here, e.g., displaying an error message to the user
    }
  };

  const handleDecline = async () => {
    try {
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
      onCloseDecline();
    } catch (error) {
      setLoading(false);
      console.error("Error updating reservation status: ", error);
      // Add error handling here, e.g., displaying an error message to the user
    }
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
                {header.map((x) => (
                  <Th key={x}>{x}</Th>
                ))}
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
                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                      <Button colorScheme="green" onClick={() => {
                        console.log("Selected reservation for start:", token);
                        setSelectedReservation(token);
                        onOpenStart();
                      }}>Start</Button>
                      <Button colorScheme="red" onClick={() => {
                        console.log("Selected reservation for decline:", token);
                        setSelectedReservation(token);
                        onOpenDecline();
                      }}>Decline</Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
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
        title={"Start ride"}
        message={"Are you sure you want to start ride, You need to turn on tracking via app"}
        isOpen={isOpenStart}
        onClose={onCloseStart}
        onVerify={handleStart}
      />
    </Box>
  );
};

export default RideReqTable;
