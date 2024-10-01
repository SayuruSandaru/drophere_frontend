// src/pages/driver-dashboard/index.tsx
import { Text, Box, Drawer, DrawerContent, useDisclosure, useColorModeValue, useToast } from "@chakra-ui/react";
import User from "model/user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MobileNav from "./components/mobile-nav";
import SidebarContent from "./dashboard-content";

const DriverDashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();
  
    useEffect(() => {
        console.log("User.getDriverDetails().status", User.getDriverDetails().status);
        const verifyUser = async () => {
            try {
                if(User.getDriverDetails().status === "pending"){
                    navigate(-1);
                    toast({
                        title: "Error",
                        description: "Your account is still pending approval. Please wait for approval",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                }else{
                    
                }
            } catch (error) {
                console.error("Error verifying user:", error);
                navigate(-1);
            }
        };
      
        verifyUser();
    }, [navigate]);

    // const accessbility
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Outlet />
            </Box>
        </Box>
    );
};

export default DriverDashboard;
