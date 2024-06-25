import React from 'react';
import { Box, Text, VStack, Flex, Image } from '@chakra-ui/react';
import { FaDollarSign, FaLeaf, FaUsers } from 'react-icons/fa';
import FeatureCard from './featurecard';

const WhyDrophere = () => {
    return (
        <Box h={{ base: "auto", md: "100vh" }} display="flex" flexDirection={{ base: "column", md: "row" }} alignItems="center" justifyContent="center">
            <Box w={{ base: "90%", md: "50%" }} px={{ base: 4, md: 14 }} py={{ base: 6, md: 14 }}>
                <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight={500} mb={6} textAlign={{ base: "center", md: "left" }} fontFamily="Red Hat Display">
                    Why Drophere?
                </Text>
                <Box mt={6}>
                    <VStack align={"left"} spacing={4}>
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
                            description="Connect with people from your community and beyond. Each ride is an opportunity to network and socialize."
                        />
                    </VStack>
                </Box>
            </Box>
            <Flex justify="center" wrap="wrap" w={{ base: "100%", md: "50%" }} p={{ base: 4, md: 0 }}>
                <Image src="/images/why_us.png" maxH={{ base: "300px", md: "600px" }} alt="Illustration" borderRadius="xl" />
            </Flex>
        </Box>
    );
};

export default WhyDrophere;
