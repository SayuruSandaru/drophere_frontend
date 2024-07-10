//import React, { useState, MouseEvent } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, HStack, VStack, Text, Stack, useDisclosure } from '@chakra-ui/react';
// import 'react-datepicker/dist/react-datepicker.css';
import React from "react";
import { Box, Flex, Heading, VStack, Input, Button, Icon, Image, Text } from "@chakra-ui/react";
//import { RouterPaths } from "router/routerConfig";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";


const OrderDelivery = () => {



  return (
    <Box>
      <Flex
        direction="column"
        bg="gray.100"
        p={6}
        alignItems="center"

      >
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          Review your delivery
        </Heading>

        <Flex w={"80%"} justifyContent="center">
          <VStack spacing={4} align="stretch" w="100%">

            <Box
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="md"
              w="90%"
            >

              <VStack spacing={3} align="start" as="div">
                <Heading as="h3" size="md" mb={2}>
                  Pickup details
                </Heading>

                <Flex align="center" mb={4}>
                  <Icon as={FaMapMarkerAlt} w={5} h={5} color="black" mr={2} />
                  <Text fontSize="md">Nittambuwa</Text>
                </Flex>

                <VStack spacing={2} w="400px">
                  <Input placeholder="Business / building name" />
                  <Input placeholder="Apt / Suite / Floor" />
                </VStack>
              </VStack>
            </Box>

            <Box
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="md"
              w={"90%"}
            >
              <VStack spacing={2} align="start" as="div">
                <Heading as="h3" size="md" mb={2}>
                  Recipient details
                </Heading>
                <Flex align="center" mb={4}>
                  <Icon as={FaMapMarkerAlt} w={5} h={5} color="black" mr={2} />
                  <Text fontSize="md">Colombo</Text>
                </Flex>
                <Flex align="center">
                  <Text width="150px">Name:</Text>
                  <Input placeholder="Name of the recipient" w="350px" />
                </Flex>
                <Flex align="center">
                  <Text width="150px">Address:</Text>
                  <Input placeholder="Street , City , State" w="350px" />
                </Flex>
                <Flex align="center">
                  <Text width="150px">Contact Number:</Text>
                  <Input placeholder="Contact" w="350px" />
                </Flex>
              </VStack>
            </Box>

            <Box
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="md"
              w={"90%"}
            >
              <VStack spacing={2} align="stretch">
                <Heading size="md" >
                  Guidlines
                </Heading>

                <Text size="md">General Guideliness:</Text>
                <Text size="xs" fontWeight={300}>1. Please make sure that the package is properly packed.</Text>
                <Text size="xs" fontWeight={300}>2. Please make sure details are correct.</Text>
                <Text size="xs" fontWeight={400}>Prohibited items:</Text>
                <Text size="xs" fontWeight={300}>Prohibited items are Alcohol, medication, drugs, firearms, and dangerous or illegal items are prohibited.</Text>

              </VStack>
            </Box>
          </VStack>

          <VStack align="stretch" w="50%">
            <Box
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="md"
              w="full"
            >

              {/* <Heading as="h3" size="lg" p={4} >Order Summary</Heading> */}
              <Flex justifyContent="center">
                <Image
                  src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=860&h=750&dpr=1"
                  alt="Passenger Image"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Flex>
              <Text><strong>From:</strong> Kandy</Text>
              <Text><strong>To:</strong> Badulla.</Text>
              <Text><strong>Date and Time:</strong> June 17, 2024, 6:00 PM</Text>
              <Text><strong>Price:</strong> $100.00</Text>

            </Box>

            <Button bg="black" variant="solid" color={'white'}>
              Book
            </Button>
          </VStack>

        </Flex>
      </Flex >
    </Box>
  );

};
export default OrderDelivery;
