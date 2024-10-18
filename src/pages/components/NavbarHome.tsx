import React, { useState } from 'react';
import {
    Flex, Spacer, Button, Text, Image, HStack, Avatar, Icon, Box, useMediaQuery, IconButton, useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/routerConfig';
import { FaFilter, FaBox, FaBars } from "react-icons/fa";
import { MdBikeScooter, MdLocalShipping } from "react-icons/md";
import { driverByUser } from 'api/driver';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'state';

import AuthService from '../../api/services/authService';
import { logout } from 'api/services/logOutService';
import User from 'model/user';

function NavbarHome() {
    const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
    const [isFilterDrawerMobileOpen, setIsFilterDrawerMobileOpen] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');

    const user = useRecoilValue(userState);
    const setUser = useSetRecoilState(userState);
    const handleLogout = () => {
        logout(navigate, toast);
      };

    console.log(user);
    console.log(user);
    const handleEarnWithUsClick = async () => {
        if (user?.isDriver  && User.getDriverDetails().status === "accepted") {
            navigate(RouterPaths.DASHBOARDHOME);
        } else if(User.getDriverDetails().status !== "accepted") {
            toast({
                title: "Error",
                description: "You need to register as a driver to access this feature.",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => navigate(RouterPaths.DRIVERREGISTER)
            });
        }
    };

    // const handleSignOut = async () => {
    //     try {
    //         const response = await AuthService.logout(); // Call the logout method
    //         console.log('Logout response:', response); // Log the raw response
    
    //         setUser(null); // Clear the user state
    //         toast({
    //             title: "Signed Out",
    //             description: "You have been successfully signed out.",
    //             status: "success",
    //             duration: 3000,
    //             isClosable: true,
    //             position: "top",
    //         });
    //     } catch (error) {
    //         console.error("Error signing out:", error);
            
    //         // Log more details about the error
    //         if (error.response) {
    //             console.error('Error response:', error.response);
    //             console.error('Error response data:', error.response.data);
    //             console.error('Error response status:', error.response.status);
    //             console.error('Error response headers:', error.response.headers);
    //         } else if (error.request) {
    //             console.error('Error request:', error.request);
    //         } else {
    //             console.error('Error message:', error.message);
    //         }
    
    //         toast({
    //             title: "Sign Out Failed",
    //             description: "An error occurred while signing out. Please try again.",
    //             status: "error",
    //             duration: 3000,
    //             isClosable: true,
    //             position: "top",
    //         });
    //     }
    // };

    return (
        <Box>
            {isLargeScreen && (
                <Flex direction={{ base: "column", md: "row" }} mb={4} align="center" p={3}>
                    <Flex align="center" mb={{ base: 4, md: 0 }}>
                        <Image src="/images/Black_T.png" alt="Drop Here Logo" w="50px" />
                        <Text fontSize="xl" fontWeight="bold" color="black" ml={2}>Drop Here</Text>
                    </Flex>
                    <Spacer />
                    <HStack spacing={4}>
                    {/* <Button 
                            borderRadius={5} 
                            bgColor={"blackAlpha.800"} 
                            size={"sm"} 
                            color={"white"} 
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button> */}
                        <Button borderRadius={3} bgColor={"transparent"} size={"sm"} color={"black"} onClick={() => { navigate(RouterPaths.SEARCHDELIVERY); }}>
                            <Icon as={MdLocalShipping} w={6} h={4} color={"gray.700"} mr={1} />
                            Deliver
                        </Button>
                        <Button borderRadius={3} bgColor={"transparent"} size={"sm"} color={"black"} >
                            <Icon as={MdBikeScooter} w={6} h={4} color={"gray.700"} mr={1} />
                            My rides
                        </Button>
                        <Button borderRadius={5} bgColor={"blackAlpha.800"} size={"sm"} color={"white"} onClick={handleEarnWithUsClick}>Earn with us</Button>
                        <Button
              borderRadius={5}
              bgColor="red.500"
              size="sm"
              color="white"
              onClick={handleLogout}
            >
              Logout
            </Button>
                        {/* <Avatar size="sm" name="John" /> */}
                       

                    </HStack>
                </Flex>
            )}
            {!isLargeScreen && (
                <Flex align="center" mb={{ base: 4, md: 0 }}>
                    <Image src="/images/Black_T.png" alt="Drop Here Logo" w="50px" />
                    <Text fontSize="xl" fontWeight="bold" color="black" ml={2}>Drop Here</Text>
                    <Spacer />
                    <IconButton
                        icon={<Icon as={FaBars} w={6} h={4} color={"gray.500"} />}
                        aria-label="Filter"
                        onClick={() => setIsMenuDrawerOpen(true)}
                        borderRadius="md"
                        _hover={{ bg: "gray.200" }}
                        height="40px"
                        width="40px"
                        ml={3}
                    />
                    <IconButton
                        icon={<Icon as={FaFilter} w={6} h={4} color={"gray.500"} />}
                        aria-label="Filter"
                        onClick={() => setIsFilterDrawerMobileOpen(true)}
                        borderRadius="md"
                        _hover={{ bg: "gray.200" }}
                        height="40px"
                        width="40px"
                        ml={3}
                    />
                </Flex>
            )}
        </Box>
    );
}

export default NavbarHome;
