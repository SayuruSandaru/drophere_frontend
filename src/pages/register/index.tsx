import { Box, Flex, Spacer, Image, Stack, useTheme, Text } from "@chakra-ui/react";
import React from "react";

import { Cards, Footer, Header, Main } from "components";
import { Login } from "../login/login";
import { colors } from "theme/colors";

const Register: React.FC = () => {
    return (
        <Flex direction="row" minH="100vh">
            <Box w="50%" bgColor={colors.primary[100]}>
                <Stack direction={"column"} align="center" justify="center" h="100%" spacing={4}>
                    <Image src="/images/L01.svg" w={300} />
                    <Text fontSize="4xl" fontWeight="400" color={"black"}>Drop Here</Text>
                    <Text fontSize="14px" fontWeight="300" color={"gray.600"} maxW="50%" textAlign="center">
                        Lorem ipsum dolor sit consecteturis amet, consecteturis dolor sit amet
                    </Text>
                </Stack>
            </Box>
            <Login onLogin={() => { }} />
        </Flex>
    );
};

export default Register;

