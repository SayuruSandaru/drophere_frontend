import { Box, Flex, Button, Text } from '@chakra-ui/react';
import NavBarLanding from './navbar';

function Hero() {
    return (
        <Box position="relative" bgImage="url('/images/landing_background.jpg')" bgSize="cover" bgPos="center" h="100vh">
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bg="linear-gradient(to top right, rgba(0, 0, 0, 0.9) 40%, rgba(0, 0, 0, 0))"
            >
                <NavBarLanding />
                <Box margin={20} mt={20} pt={20}>
                    <Text fontSize="6xl" fontWeight="bold" mb={4} color="white">You Will Never <br />Drive Alone</Text>
                    <Text fontSize="sm" mb={8} color="white">
                        Drive on a platform with the largest network of driver communities <br />where you can get paid just for not driving alone.
                    </Text>
                    <Button size="md" colorScheme="teal" color="white" fontWeight={300}>Search ride</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Hero;
