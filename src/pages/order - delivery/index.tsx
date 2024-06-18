//import React, { useState, MouseEvent } from 'react';
    // import { Box, Button, FormControl, FormLabel, Input, HStack, VStack, Text, Stack, useDisclosure } from '@chakra-ui/react';
    // import 'react-datepicker/dist/react-datepicker.css';
import React from "react";
import { Box, Flex, Heading, VStack, Input, Button, Icon, Image, Text } from "@chakra-ui/react";
//import { RouterPaths } from "router/routerConfig";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";


const OrderDelivery = () => {
  
  

  return (
    <Flex
      direction="column"
      bg="gray.200"
      p={6}
      alignItems="center"

    >
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        Review your delivery
      </Heading>

      <Flex w="full" justifyContent="space-between">
        <VStack spacing={4} align="stretch" w="60%">

          {/* pickup details */}
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
            maxW="600px"
            w="full"
          >

            <VStack spacing={3} align="start" as="div">
              <Heading as="h3" size="lg">
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
              <Flex align="center" mt={6}>
                <Icon as={FaUser} w={5} h={5} color="black" mr={2} />
                <Text fontSize="md">Sayuru</Text>
              </Flex>

            </VStack>
          </Box>

          {/* delivery details */}
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
            maxW="600px"
            w="full"
          >

            <VStack spacing={2} align="start" as="div">
              <Heading as="h3" size="lg" >
                Recipient details
              </Heading>


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

              <Button colorScheme="blue" variant="solid" >
                Save Details
              </Button>
            </VStack>
          </Box>

          {/* guidelines */}
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
            maxW="600px"
            w="full"
          >
            <VStack spacing={2} align="stretch">
              <Heading as="h3" size="lg" >
                Guidlines
              </Heading>

              <Text >General Guideliness:</Text>
              <h6>1.Listen actively to clients The first step in professional service delivery is to wholly understand your clients' needs and expectations. Active listening is a crucial part of this process. ...</h6>
              <h6>2. Set clear expectations & deliverables ...</h6>
              <h6>3. Create a service delivery plan ...</h6>
            </VStack>
          </Box>
        </VStack>

        {/* Order Summary */}
        
        <VStack align="stretch"  w="50%">
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="lg"
            w="full"
          >

            <Heading as="h3" size="lg" p={4} >Order Summary</Heading>
            <Text><strong>Product Name:</strong> Sample Product</Text>
            <Text><strong>Description:</strong> This is a sample product description.</Text>
            <Text><strong>Date and Time:</strong> June 17, 2024, 6:00 PM</Text>
            <Text><strong>Price:</strong> $100.00</Text>

            <Flex justifyContent="center" w="full">
              <Image
                src="https://via.placeholder.com/150"
                alt="Passenger Image"
                objectFit="cover"
                borderRadius="md"
              />
            </Flex>
            

          </Box>
          
          <Button colorScheme="blue" variant="solid">
            Book
          </Button>

          </VStack>
        
      </Flex>
    </Flex>
    
  );

};
export default OrderDelivery;
