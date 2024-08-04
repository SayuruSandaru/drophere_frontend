
import { Box, Flex, Icon, Image, Stack, Text, Heading, useMediaQuery, Spinner, Spacer, Divider, Alert, VStack, AlertIcon, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RouterPaths } from "router/routerConfig";
import Footer from "pages/components/footer";
import { colors } from "theme/colors";
import { login } from "api/auth";
import { driverByUser } from "api/driver";
import { useSetRecoilState } from "recoil";
import { tokenState, userState } from '../../state';
import User from "model/user";
import OrderHistoryTable from "./components/order-history";
import OrderStatusTabs from "./components/button-group";
import SortByMenu from "./components/sort-by-menu";
import { useShowErrorToast, useShowSuccessToast, } from "pages/components/toast";
import reservationService from "api/services/reservationService";
import { set } from "date-fns";
import NavbarHome from "pages/components/NavbarHome";
import { BiSearchAlt } from 'react-icons/bi';

const MyRide: React.FC = () => {
    const showtoast = useShowSuccessToast();
    const showErrorToast = useShowErrorToast();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const getReservationByStatus = async (status: string) => {
        try {
            setLoading(true);
            const response = await reservationService.getReservationsByStatus(status, User.getUserId());
            console.log(response);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("Error getting reservations by status: ", error);
            showErrorToast("Error getting reservations by status: ");
        }
    }

    useEffect(() => {
        getReservationByStatus("ongoing");
    }, []);

    const handleOngoingSelect = async () => {
        await getReservationByStatus("ongoing");
    };

    const handleCompletedSelect = async () => {
        await getReservationByStatus("completed");
    };

    const handleCancelledSelect = async () => {
        await getReservationByStatus("cancelled");
    };

    const handleConfirmedSelect = async () => {
        await getReservationByStatus("confirmed");
    };

    return (
        <Box bgColor={"gray.100"} minH="100vh">
            <NavbarHome />
            <Box>
                <Text fontSize={"xl"} px={"15px"} py={"30px"} fontWeight={"bold"}>Reservation history</Text>
                <Flex direction={"row"} mx={"48px"}>
                    <OrderStatusTabs
                        onCancelledSelect={handleCancelledSelect}
                        onCompletedSelect={handleCompletedSelect}
                        onOngoingSelect={handleOngoingSelect}
                        onConfirmedSelect={handleConfirmedSelect}
                    />
                    {/* <Spacer /> */}
                    {/* <SortByMenu onSortChange={/() => { }} /> */}
                </Flex>
                {!loading && (
                    <>
                        {data && Array.isArray(data) && data.length > 0 ? (
                            <OrderHistoryTable data={data} />
                        ) : (
                            <VStack align="center" spacing={3} mt={"140px"}>
                                <Icon as={BiSearchAlt} boxSize="50px" />
                                <Text>No ride available</Text>
                            </VStack>
                        )}
                    </>
                )}
                {loading && (
                    <Flex justifyContent={"center"} alignItems={"center"} h={"60vh"}>
                        <Spinner size={"lg"} />
                    </Flex>
                )}
            </Box>
            {/* <Footer /> */}
        </Box>
    );
};

export default MyRide;
