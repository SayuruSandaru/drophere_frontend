import React, { useState } from 'react';
import {
    Flex, Spacer, Button, Text, Image, HStack, Avatar, Icon, Box, useMediaQuery, IconButton, toast, useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/routerConfig';
import { useRecoilValue } from 'recoil';
import { FaFilter, FaBox, FaBars } from "react-icons/fa";
import { isDriverState } from 'state';
import { driverByUser } from 'api/driver';



function NavbarHome() {
    const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
    const [isFilterDrawerMobileOpen, setIsFilterDrawerMobileOpen] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();


    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');

    const handleEarnWithUsClick = async () => {
        const res = await driverByUser();
        if (!res) {
            navigate(RouterPaths.CREATERIDE);
        } else {
            toast({
                title: "Driver Registration Required",
                description: "You need to register as a driver to access this feature.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => navigate(RouterPaths.DRIVERREGISTER)
            });

        }
    };

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
                        <Button borderRadius={3} bgColor={"transparent"} size={"sm"} color={"black"} onClick={() => { navigate(RouterPaths.SEARCHDELIVERY); }}>
                            <Icon as={FaBox} w={6} h={4} color={"gray.700"} mr={1} />
                            Deliver
                        </Button>
                        <Button borderRadius={5} bgColor={"blackAlpha.800"} size={"sm"} color={"white"} onClick={handleEarnWithUsClick}>Earn with us</Button>
                        <Avatar size="sm" name="John" />
                    </HStack>
                </Flex>
            )}
            {!isLargeScreen && (
                (

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

                )
            )}
        </Box>

    );
}

export default NavbarHome;



