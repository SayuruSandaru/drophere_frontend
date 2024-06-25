import { Box, Text, Flex, Link, VStack, Button, Input, Heading, Image, HStack, Spacer, Icon } from "@chakra-ui/react";
import Hero from "./component/hero";
import NavBarLanding from "./component/navbar";
import { FaUserPlus, FaSearch, FaDollarSign, FaUsers, FaLeaf, FaRegCalendarCheck, FaSmile } from 'react-icons/fa';
import StepCard from "./component/stepcard";
import Footer from "pages/components/footer";
import FeatureCard from "./component/featurecard";




const LandingPage = () => {

    return (
        <Box>
            <NavBarLanding />
            <Box h="90vh" display="flex" alignItems="center" justifyContent="center" >
                <Flex direction="row" alignItems="center" justifyContent="center" > {/* Ensures content is centered */}
                    <Box mr={20}> {/* Padding for spacing */}
                        <Text fontFamily={"Red Hat Display"} fontSize={"6xl"} fontWeight={900} color={"gray.800"}>Join the journey, <br />Share the ride</Text>
                        <Text color={"gray.600"} fontWeight={400} mt={4}>
                            Turn your empty seats into new friendships. <br />Join us and share the journey
                        </Text>
                        <Button bg={"teal"} color={"white"} mt={9} fontWeight={400} borderRadius={5}>Search your ride</Button>
                    </Box>

                    <Box>
                        <Flex justifyContent="center">
                            <Image src="/images/Car driving-bro.svg" h={450} alt="Illustration" />
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Box h="100vh" alignItems="center" justifyContent="center" display={"flex"} bg={"gray.100"}>
                <Box w={"40%"} p={14}>
                    <Text fontSize={"5xl"} fontWeight={500} mb={6} textAlign="left" fontFamily={"Red Hat Display"}>How it works</Text>
                    <Text fontSize={"md"} textAlign="left" color={"gray.600"}>We make your journey easy, safe, and affordable. Find your perfect ride in minutes.</Text>
                </Box>
                <Flex justify="space-evenly" wrap="wrap">
                    <StepCard
                        title="Register and Create Your Profile"
                        description="Sign up for free and set up your profile. Tell us a bit about yourself and your vehicle if you’re a driver. This helps in building trust and community."
                        icon={FaUserPlus}
                        step={1}
                    />
                    <StepCard
                        title="Search and Offer Rides"
                        description="Whether you need a ride or have extra seats, our platform makes it easy to find matches. Use our intuitive search tools to find or offer a ride that fits your route and schedule."
                        icon={FaSearch}
                        step={2}
                    />
                    <StepCard
                        title="Book and Coordinate"
                        description="Once you find your match, book your ride and coordinate the meeting details and timings directly through our secure platform. No need for a separate chat—keep all your travel arrangements in one place."
                        icon={FaRegCalendarCheck}
                        step={3}
                    />
                    <StepCard
                        title="Enjoy the Ride"
                        description="Share the journey, split the costs, and make new friendships. Travel smarter and greener by maximizing the usage of each vehicle."
                        icon={FaSmile}
                        step={4}
                    />
                </Flex>
            </Box>
            <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
                <Box w={"50%"} p={14}>
                    <Text fontSize={"5xl"} fontWeight={500} mb={6} textAlign="left" fontFamily={"Red Hat Display"}>Why Drophere?</Text>
                    <Box mt={6}>
                        <VStack align={"left"}>
                            <FeatureCard
                                icon={FaDollarSign}
                                title="Economical"
                                description="Save on travel expenses by sharing the cost of the journey."
                            />
                            <FeatureCard
                                icon={FaLeaf}
                                title="Eco-friendly"
                                description="Fewer cars on the road mean less traffic and pollution. Help us make a greener planet."
                            />
                            <FeatureCard
                                icon={FaUsers}
                                title="Community Building"
                                description="Connect with people from your community and beyond. Each ride is an opportunity to network and socialize." />

                        </VStack>
                    </Box>
                </Box>
                <Flex justify="space-evenly" wrap="wrap">
                    <Box>
                        <Image src="/images/why_us.png" h={600} alt="Illustration" borderRadius={"xl"} />
                    </Box>
                </Flex>

            </Box>
            <Box h="80vh" display="flex" alignItems="center" justifyContent="center" bg={"gray.100"}>
                <Box textAlign={"center"} >
                    <Text fontSize={"6xl"} fontWeight={500} mb={6} textAlign="center" fontFamily={"Red Hat Display"}>Join with us</Text>
                    <Text fontSize={"md"} textAlign="center" color={"gray.600"}>Join our community and start sharing your journey. Let's make the world a better place.</Text>
                    <Button bg={"teal"} color={"white"} mt={9} fontWeight={400} borderRadius={40}>Join Now</Button>
                </Box>
            </Box>
            <Footer />
        </Box >
    );
};



export default LandingPage; 