import { Box, Text, Flex, Link, VStack, Button, Input, Heading, Image, HStack, Spacer, Icon, useMediaQuery } from "@chakra-ui/react";
import Hero from "./component/hero";
import NavBarLanding from "./component/navbar";
import { FaUserPlus, FaSearch, FaDollarSign, FaUsers, FaLeaf, FaRegCalendarCheck, FaSmile } from 'react-icons/fa';
import StepCard from "./component/stepcard";
import Footer from "pages/components/footer";
import FeatureCard from "./component/featurecard";
import HowItWorks from "./component/howItWorks";
import WhyDrophere from "./component/whyDropHere";
import { useNavigate } from "react-router-dom";
import { RouterPaths } from "router/routerConfig";






const LandingPage = () => {
    const navigate = useNavigate();
    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
    return (
        <Box>
            <NavBarLanding />
            <Box h="90vh" display="flex" alignItems="center" justifyContent="center">
                <Flex direction="row" alignItems="center" justifyContent="center">
                    <Box ml={{ base: 0, lg: 20 }} mr={{ base: 0, lg: 20 }} textAlign={{ base: 'center', lg: 'left' }}>
                        <Text fontFamily="Red Hat Display" fontSize="6xl" fontWeight={900} color="gray.800">
                            Join the journey, Share the ride
                        </Text>
                        <Text color="gray.600" fontWeight={400} mt={4}>
                            Turn your empty seats into new friendships. <br />Join us and share the journey
                        </Text>
                        <Button bg="teal" color="white" mt={9} fontWeight={400} borderRadius={5} onClick={() => { navigate(RouterPaths.LOGIN) }}>
                            Search your ride
                        </Button>
                    </Box>

                    {isLargeScreen && (
                        <Box mt={4} display="flex" justifyContent="center" width="100%">
                            <Image src="/images/Car driving-bro.svg" h="400px" alt="Illustration" />
                        </Box>
                    )}
                </Flex>
            </Box>
            <HowItWorks />
            <WhyDrophere />
            <Box h="80vh" display="flex" alignItems="center" justifyContent="center" bg={"gray.100"}>
                <Box textAlign={"center"} >
                    <Text fontSize={"6xl"} fontWeight={500} mb={6} textAlign="center" fontFamily={"Red Hat Display"}>Join with us</Text>
                    <Text fontSize={"md"} textAlign="center" color={"gray.600"}>Join our community and start sharing your journey. Let's make the world a better place.</Text>
                    <Button bg={"teal"} color={"white"} mt={9} fontWeight={400} borderRadius={40} onClick={() => { navigate(RouterPaths.REGISTER) }} >Join Now</Button>
                </Box>
            </Box>
            <Footer />
        </Box >
    );
};



export default LandingPage; 