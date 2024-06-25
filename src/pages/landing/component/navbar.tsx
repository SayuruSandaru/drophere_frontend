import { Box, Flex, Button, Text, Link, Image, Spacer, HStack, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, useDisclosure, DrawerHeader } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/routerConfig';
import { FaBars } from 'react-icons/fa';

function NavBarLanding() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    return (
        <Flex justify="space-between" align="center" p={4} bg="transparent" color="white">
            <IconButton
                aria-label="Open Menu"
                icon={<FaBars color='black' />}
                display={{ base: 'flex', md: 'none' }}  // Only show hamburger on small screens
                onClick={onOpen}
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Drophere</DrawerHeader>
                    <DrawerBody>
                        <Flex direction="column" align="center" mt={2}>
                            <Link href={RouterPaths.LANDING} p={2} onClick={onClose}>Home</Link>
                            <Link href={RouterPaths.REGISTER} p={2} onClick={onClose}>Earn with us</Link>
                            <Link href={RouterPaths.CONTACT} p={2} onClick={onClose} mb={5}>Contact us</Link>
                            <Button mt={4} w={90} color="black" variant="outline" onClick={() => navigate(RouterPaths.LOGIN)}>Log in</Button>
                            <Button mt={2} w={90} bg="black" color="white" variant="solid" onClick={() => navigate(RouterPaths.REGISTER)}>Sign Up</Button>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Flex display={{ base: 'none', md: 'flex' }} align="center" w={"100vw"}>
                <Image src="images/Black_T.png" alt="Logo" h="12" />
                <Text color="black" mt={2} mb={2}>Drophere</Text>
                <Spacer />
                <HStack spacing={4} mr={20}>
                    <Link href={RouterPaths.LANDING} p={2} color="black">Home</Link>
                    <Link href={RouterPaths.REGISTER} p={2} color="black">Earn with us</Link>
                    <Link href={RouterPaths.CONTACT} p={2} color="black">Contact us</Link>
                </HStack>
                <Flex gap={2}>
                    <Button size="sm" color="black" variant="outline" onClick={() => navigate(RouterPaths.LOGIN)}>Log in</Button>
                    <Button size="sm" bg="black" color="white" variant="solid" onClick={() => navigate(RouterPaths.REGISTER)}>Sign Up</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default NavBarLanding;
