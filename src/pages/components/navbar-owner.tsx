import React, { useState } from 'react';
import {
    Flex, Spacer, Button, Text, Image, HStack, Avatar, Icon, Box, useMediaQuery, IconButton, Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/routerConfig';
import { FaFilter, FaBox, FaBicycle, FaBars } from "react-icons/fa";






function NavbarOwner() {
    const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
    const [isFilterDrawerMobileOpen, setIsFilterDrawerMobileOpen] = useState(false);
    const navigate = useNavigate();

    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
    const handleUpdateClick = () => {
        navigate(RouterPaths.DASHBOARDRIDES);
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
                        <button onClick={handleUpdateClick}>Dashboard</button>
                        <Button borderRadius={3} bgColor={"transparent"} size={"sm"} color={"black"} onClick={() => { navigate(RouterPaths.SEARCHDELIVERY); }}>
                            <Icon as={FaBicycle} w={6} h={4} color={"gray.700"} mr={1} />
                            Ride
                        </Button>

                        {/* <Avatar size="sm" name="John" /> */}
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
                    </Flex>

                )
            )}
        </Box>

    );
}

export default NavbarOwner;



