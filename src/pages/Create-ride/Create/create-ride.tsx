import React from 'react';
import { ChakraProvider, Box, Button, FormControl, FormLabel, Input, HStack, VStack, Grid, GridItem, Center } from '@chakra-ui/react';

const Cride = () => {
  return (
    <ChakraProvider>
      <Box p={5}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="100%">
            <VStack spacing={4} align="stretch">
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <FormControl>
                  <FormLabel>Pick-up</FormLabel>
                  <Input placeholder="Pick up location" />
                </FormControl>
              </Box>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <FormControl>
                  <FormLabel>Drop-off</FormLabel>
                  <Input placeholder="Drop off location" />
                </FormControl>
              </Box>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <FormControl>
                  <FormLabel>Vehicle</FormLabel>
                  <Input placeholder="Your preferred Vehicle" />
                  
                </FormControl>
              </Box>
              
              <HStack spacing={4} w="100%">
                <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
                  <FormControl>
                    <FormLabel>Travel date</FormLabel>
                    <Input type="date" />
                  </FormControl>
                </Box>
                <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
                  <FormControl>
                    <FormLabel>Travel time</FormLabel>
                    <HStack>
                      <Input type="number" placeholder="10" max={12} min={1} />
                      <Input type="number" placeholder="30" max={59} min={0} />
                      <Input type="text" placeholder="AM/PM" />
                    </HStack>
                  </FormControl>
                </Box>
              </HStack>
              <Button bgColor={"black"}
              onClick={() => {}}
              color="white"
              _hover={{ bgColor: "gray.700" }}>Confirm the trip</Button>
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" h="100%">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6336110.144449231!2d78.32361149927517!3d7.833304641529931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a253655c0bb%3A0x6d0e5b8a924c6243!2sSri%20Lanka!5e0!3m2!1sen!2s!4v1675727758125!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </Box>
          </GridItem>
        </Grid>
        
      </Box>
    </ChakraProvider>
  );
};

export default Cride;
