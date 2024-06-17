import React from 'react';
import { Box, Flex, Text, Link, IconButton, Stack, Image, Spacer } from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { ceil } from 'lodash';
import { useNavigate } from 'react-router';
import { RouterPaths } from 'router/routerConfig';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <Box bg="black" color="gray.200" py={5}>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                maxW="6xl"
                mx="auto"
                px={4}
                align="center"
                justify="center"
            >
                <Flex direction={"column"} align="center" justify={"center"}>
                    <Image src="/images/White_T.png" w={24} />
                    <Text fontSize="lg" fontWeight="bold">
                        Drophere
                    </Text>
                    <Text fontWeight={200} fontSize={"sm"}>
                        Join the Journey, <br />Share the Road
                    </Text>
                </Flex>
                <Spacer />
                <Stack direction={{ base: 'column', md: 'row' }} spacing={6} mt={{ base: 4, md: 0 }} align={"center"} justify={"center"}>
                    <Link href={RouterPaths.SEARCHDELIVERY} _hover={{ textDecoration: 'none', color: 'gray.400' }}>
                        Ride
                    </Link>
                    <Link href={RouterPaths.SEARCHDELIVERY} _hover={{ textDecoration: 'none', color: 'gray.400' }}>
                        Delivery
                    </Link>
                    <Link href={RouterPaths.SEARCHDELIVERY} _hover={{ textDecoration: 'none', color: 'gray.400' }}>
                        Earn with us
                    </Link>
                </Stack>
                <Spacer />
                <Stack direction="row" spacing={4} mt={{ base: 4, md: 0 }}>
                    <IconButton
                        as="a"
                        href="https://twitter.com"
                        aria-label="Twitter"
                        icon={<FaTwitter />}
                        bg="gray.700"
                        _hover={{ bg: 'gray.600' }}
                    />
                    <IconButton
                        as="a"
                        href="https://facebook.com"
                        aria-label="Facebook"
                        icon={<FaFacebook />}
                        bg="gray.700"
                        _hover={{ bg: 'gray.600' }}
                    />
                    <IconButton
                        as="a"
                        href="https://instagram.com"
                        aria-label="Instagram"
                        icon={<FaInstagram />}
                        bg="gray.700"
                        _hover={{ bg: 'gray.600' }}
                    />
                </Stack>
            </Flex>
            <Text textAlign="center" mt={8} fontSize="sm" color="gray.500">
                © {new Date().getFullYear()} Drophere. All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;
