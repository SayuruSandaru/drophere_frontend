import React from 'react';
import { ChakraProvider, Box, Button, FormControl, FormLabel, Input, HStack, VStack, Grid, GridItem, Center } from '@chakra-ui/react';
import { GoogleMap } from '@react-google-maps/api';
import MapContainer from 'pages/home/components/googleMap';
import NavbarLogged from 'pages/components/NavbarLogged';
import Footer from 'pages/components/footer';
import NavbarHome from 'pages/components/NavbarHome';

const Cride = () => {
  return (
    <Box>
      <NavbarHome />
      <Box p={5}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="100%">
            <VStack spacing={4} align="stretch">
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <FormControl>
                  <FormLabel fontSize="sm" color={"gray.600"}>Pick Up</FormLabel>
                  <Input placeholder="Pick up location" />
                </FormControl>
              </Box>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <FormControl>
                  <FormLabel fontSize="sm" color={"gray.600"}>Pick Up</FormLabel>
                  <Input placeholder="Drop off location" />
                </FormControl>
              </Box>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <FormControl>
                  <FormLabel fontSize="sm" color={"gray.600"}>Pick Up</FormLabel>
                  <Input placeholder="Your preferred Vehicle" />

                </FormControl>
              </Box>

              <HStack spacing={4} w="100%">
                <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
                  <FormControl>
                    <FormLabel fontSize="sm" color={"gray.600"}>Pick Up</FormLabel>
                    <Input type="date" />
                  </FormControl>
                </Box>
                <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
                  <FormControl>
                    <FormLabel fontSize="sm" color={"gray.600"}>Pick Up</FormLabel>
                    <HStack>
                      <Input type="number" placeholder="10" max={12} min={1} />
                      <Input type="number" placeholder="30" max={59} min={0} />
                      <Input type="text" placeholder="AM/PM" />
                    </HStack>
                  </FormControl>
                </Box>
              </HStack>
              <Button bgColor={"black"}
                onClick={() => { }}
                color="white"
                _hover={{ bgColor: "gray.700" }}>Confirm the trip</Button>
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <MapContainer />
          </GridItem>
        </Grid>

      </Box>
      <Box height={10} />
      <Footer />
    </Box>
  );
};

export default Cride;
