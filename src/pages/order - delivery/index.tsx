import React from "react";
import { Box, Flex, Heading, VStack, Input, Button, Icon, Image, Text, Stack, useBreakpointValue } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

const OrderDelivery = () => {
  const flexDirection = useBreakpointValue({ base: "column", lg: "row" } )as "column" | "row" ;
  const containerWidth = useBreakpointValue({ base: "100%", md: "90%", lg: "80%" });
  const inputWidth = useBreakpointValue({ base: "100%", md: "350px" });

  return (
    <Box>
      <Flex
        direction="column"
        bg="gray.100"
        p={[4, 6]}
        alignItems="center"
      >
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          Review your delivery
        </Heading>

        <Flex w={containerWidth} direction={flexDirection} justifyContent="center">
          <Stack spacing={4} align="stretch" w={["100%", "100%", "60%"]} mr={[0, 0, 4]}>
            <Box
              bg="white"
              p={[4, 6]}
              borderRadius="md"
              boxShadow="md"
              w="100%"
            >
              <VStack spacing={3} align="start" as="div">
                <Heading as="h3" size="md" mb={2}>
                  Pickup details
                </Heading>

                <Flex align="center" mb={4}>
                  <Icon as={FaMapMarkerAlt} w={5} h={5} color="black" mr={2} />
                  <Text fontSize="md">Nittambuwa</Text>
                </Flex>

                <VStack spacing={2} w="100%">
                  <Input placeholder="Business / building name" />
                  <Input placeholder="Apt / Suite / Floor" />
                </VStack>
              </VStack>
            </Box>

            <Box
              bg="white"
              p={[4, 6]}
              borderRadius="md"
              boxShadow="md"
              w="100%"
            >
              <VStack spacing={2} align="start" as="div">
                <Heading as="h3" size="md" mb={2}>
                  Recipient details
                </Heading>
                <Flex align="center" mb={4}>
                  <Icon as={FaMapMarkerAlt} w={5} h={5} color="black" mr={2} />
                  <Text fontSize="md">Colombo</Text>
                </Flex>
                <Stack spacing={2} w="100%">
                  <Flex align="center" direction={["column", "row"]}>
                    <Text width={["100%", "150px"]} mb={[2, 0]}>Name:</Text>
                    <Input placeholder="Name of the recipient" w={inputWidth} />
                  </Flex>
                  <Flex align="center" direction={["column", "row"]}>
                    <Text width={["100%", "150px"]} mb={[2, 0]}>Address:</Text>
                    <Input placeholder="Street , City , State" w={inputWidth} />
                  </Flex>
                  <Flex align="center" direction={["column", "row"]}>
                    <Text width={["100%", "150px"]} mb={[2, 0]}>Contact Number:</Text>
                    <Input placeholder="Contact" w={inputWidth} />
                  </Flex>
                </Stack>
              </VStack>
            </Box>

            <Box
              bg="white"
              p={[4, 6]}
              borderRadius="md"
              boxShadow="md"
              w="100%"
            >
              <VStack spacing={2} align="stretch">
                <Heading size="md">
                  Guidelines
                </Heading>

                <Text size="md">General Guidelines:</Text>
                <Text size="xs" fontWeight={300}>1. Please make sure that the package is properly packed.</Text>
                <Text size="xs" fontWeight={300}>2. Please make sure details are correct.</Text>
                <Text size="xs" fontWeight={400}>Prohibited items:</Text>
                <Text size="xs" fontWeight={300}>Prohibited items are Alcohol, medication, drugs, firearms, and dangerous or illegal items are prohibited.</Text>
              </VStack>
            </Box>
          </Stack>

          <VStack align="stretch" w={["100%", "100%", "40%"]} mt={[4, 4, 0]}>
            <Box
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="md"
              w="100%"
            >
              <Flex justifyContent="center">
                <Image
                  src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=860&h=750&dpr=1"
                  alt="Passenger Image"
                  objectFit="cover"
                  borderRadius="md"
                  maxH="200px"
                />
              </Flex>
              <Text><strong>From:</strong> Kandy</Text>
              <Text><strong>To:</strong> Badulla.</Text>
              <Text><strong>Date and Time:</strong> June 17, 2024, 6:00 PM</Text>
              <Text><strong>Price:</strong> $100.00</Text>
            </Box>

            <Button bg="black" variant="solid" color="white" mt={4}>
              Book
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OrderDelivery;