import React from 'react';
import { Flex, Icon, Box, Text } from '@chakra-ui/react';
import { FaDollarSign } from 'react-icons/fa'; // Ensure you import the correct icon

const FeatureCard = ({ icon, title, description }) => {
    return (
        <Flex direction="row">
            <Icon as={icon} color="teal" boxSize="5" mx={3} my={8} />
            <Box borderRadius="lg" p={4}>
                <Text fontSize="xl" fontWeight={500}>{title}</Text>
                <Text fontSize="smaller" color="gray.600">{description}</Text>
            </Box>
        </Flex>
    );
};

export default FeatureCard;
