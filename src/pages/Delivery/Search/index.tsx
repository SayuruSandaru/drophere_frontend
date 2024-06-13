import {
    Box,
    Flex,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Heading,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

const SearchDelivery = () => {
    const isBreakpoint = useBreakpointValue({ base: true, md: false });
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    return (
        <Box>
            <Flex>
                <Heading>{isBreakpoint ? 'Mobile View' : 'Desktop View'}</Heading>
                <Text>{isLargerThan768 ? 'Screen is larger than 768px' : 'Screen is smaller than 768px'}</Text>
            </Flex>
        </Box>
    );
};

export default SearchDelivery;