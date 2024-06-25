import React from 'react';
import { Box, Text, Flex, useMediaQuery } from '@chakra-ui/react';
import { FaUserPlus, FaSearch, FaRegCalendarCheck, FaSmile } from 'react-icons/fa';
import StepCard from './stepcard';

const HowItWorks = () => {
    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
    return (
        <Box
            h={{ base: "auto", md: "100vh" }}
            alignItems="center"
            justifyContent="center"
            display="flex"
            bg="gray.100"
            py={{ base: 10, md: 0 }}
        >
            {isLargeScreen && (
                <Box w={{ base: "90%", md: "40%" }} p={14}>
                    <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight={500} mb={6} textAlign={{ base: "center", md: "left" }} fontFamily="Red Hat Display">
                        How it works
                    </Text>
                    <Text fontSize="md" textAlign={{ base: "center", md: "left" }} color="gray.600">
                        We make your journey easy, safe, and affordable. Find your perfect ride in minutes.
                    </Text>
                </Box>
            )}
            <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-evenly"
                wrap="wrap"
                w="100%"
            >
                {
                    !isLargeScreen && (
                        <Box w={{ base: "90%", md: "40%" }} p={4}>
                            <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight={900} textAlign={{ base: "center", md: "left" }} fontFamily="Red Hat Display">
                                How it works
                            </Text>
                            <Text fontSize="smaller" textAlign={{ base: "center", md: "left" }} color="gray.600">
                                We make your journey easy, safe, and affordable. Find your perfect ride in minutes.
                            </Text>
                        </Box>
                    )
                }
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
    );
};

export default HowItWorks;
