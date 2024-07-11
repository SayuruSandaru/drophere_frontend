import { Box, Flex, Icon, Spacer, Text } from "@chakra-ui/react";

const StepCard = ({ title, description, icon, step }) => {
    return (
        <Flex
            direction="column"
            p={5}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            bg="white"
            maxW="sm"
            boxShadow="lg"
            m={2}
            _hover={{ bg: "purple.50", cursor: "pointer" }}  // Hover effect
            transition="background-color 0.3s ease-in-out"  // Smooth transition
        >
            <Flex direction="row">
                <Box>
                    <Text fontSize="sm" fontWeight="600" mt={3} color="purple.500">{`Step ${step}`}</Text>
                    <Text fontSize="xl" fontWeight="400">{title}</Text>
                </Box>
                <Spacer />
                <Box mt={4}>
                    <Box h={10} w={10} display="flex" justifyContent="center" alignItems="center" boxShadow="lg" borderRadius="lg">
                        <Icon as={icon} m="auto" color="purple.500" />
                    </Box>
                </Box>
            </Flex>
            <Text textAlign="left" fontSize="small" mt={4}>{description}</Text>
        </Flex>
    );
};

export default StepCard;
