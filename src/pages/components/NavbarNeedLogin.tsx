import React, { useState } from "react";
import {
  Flex,
  Spacer,
  Button,
  Text,
  Image,
  HStack,
  Avatar,
  Icon,
  Box,
  useMediaQuery,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RouterPaths } from "router/routerConfig";
import { FaBicycle, FaBox, FaBars } from "react-icons/fa";
import user from "model/user";
import { logout } from "../../api/services/logOutService";

function Navbar({ isDelivery = true }) {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isFilterDrawerMobileOpen, setIsFilterDrawerMobileOpen] =
    useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout(navigate, toast);
  };

  const [isLargeScreen] = useMediaQuery("(min-width: 992px)");

  const handleEarnWithUsClick = async () => {
    if (user?.isDriver) {
      navigate(RouterPaths.DASHBOARDHOME);
    } else {
      toast({
        title: "Driver Registration Required",
        description: "You need to register as a driver to access this feature.",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => navigate(RouterPaths.DRIVERREGISTER),
      });
    }
  };

  return (
    <Box>
      {isLargeScreen && (
        <Flex
          direction={{ base: "column", md: "row" }}
          mb={4}
          align="center"
          p={3}
        >
          <Flex align="center" mb={{ base: 4, md: 0 }}>
            <Image src="/images/Black_T.png" alt="Drop Here Logo" w="50px" />
            <Text fontSize="xl" fontWeight="bold" color="black" ml={2}>
              Drop Here
            </Text>
          </Flex>
          <Spacer />
          <HStack spacing={4}>
            <Button
              borderRadius={3}
              bgColor={"transparent"}
              size={"sm"}
              color={"black"}
              onClick={() => {
                {
                  isDelivery
                    ? navigate(RouterPaths.SEARCHDELIVERY)
                    : navigate(RouterPaths.SEARCHRIDE);
                }
              }}
            >
              {isDelivery ? (
                <Icon as={FaBox} w={6} h={4} color={"gray.700"} mr={1} />
              ) : (
                <Icon as={FaBicycle} w={6} h={4} color={"gray.700"} mr={1} />
              )}
              {isDelivery ? "Deliver" : "Ride"}
            </Button>
            {/* <Button borderRadius={2} bgColor={"white"} size={"sm"} color={"black"} onClick={() => { navigate(RouterPaths.LOGIN) }}>Login</Button> */}
            {/* <Button borderRadius={5} bgColor={"#2b8ab0"} size={"sm"} color={"white"} onClick={() => { navigate(RouterPaths.REGISTER) }}>Register</Button> */}
            <Button
              borderRadius={5}
              bgColor={"#2b8ab0"}
              size={"sm"}
              color={"white"}
              onClick={handleEarnWithUsClick}
            >
              Earn with us
            </Button>
            <Button
              borderRadius={5}
              bgColor="red.500"
              size="sm"
              color="white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </HStack>
        </Flex>
      )}
      {!isLargeScreen && (
        <Flex align="center" mb={{ base: 4, md: 0 }}>
          <Image src="/images/Black_T.png" alt="Drop Here Logo" w="50px" />
          <Text fontSize="xl" fontWeight="bold" color="black" ml={2}>
            Drop Here
          </Text>
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
      )}
    </Box>
  );
}

export default Navbar;

{
  /* <Flex align="center" mb={{ base: 4, md: 0 }}>
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
          </Flex> */
}
