import { Box, Flex, Button, Text, Link, Image, Spacer, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/routerConfig';

function NavBarLanding() {
    const navigator = useNavigate();
    return (
        <Flex justify="space-between" align="center" p={4} bg="transparent" color="white">
            <Flex direction={"row"}>
                <Image src="images/Black_T.png" alt="Logo" h="12" />
                <Text color={"black"} mt={2} mb={2}>Drophere</Text>
            </Flex>
            <Spacer />
            <HStack spacing={4} mr={20}>
                <Link href={RouterPaths.LANDING} p={2} color={"black"}  >Home</Link>
                <Link href={RouterPaths.REGISTER} p={2} color={"black"} >Earn with us</Link>
                <Link href={RouterPaths.CONTACT} p={2} color={"black"} >Contact us</Link>
            </HStack>
            <Flex gap={2}>
                <Button size={"sm"} color={"black"} variant="outline" style={{ borderColor: 'black' }} onClick={() => navigator(RouterPaths.LOGIN)}>Log in</Button>
                <Button size={"sm"} bg="black" variant="solid" onClick={() => navigator(RouterPaths.REGISTER)}>Sign Up</Button>
            </Flex>
        </Flex>
    );
}

export default NavBarLanding;
