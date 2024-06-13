//import React, { useState } from 'react';
import React, { useState, MouseEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, HStack, Radio, RadioGroup, VStack, Text, Stack } from '@chakra-ui/react';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchDelivery = () => {


const [packageType, setPackageType] = useState('Document');
const [deliveryType, setDeliveryType] = useState('Standard delivery');
function onLogin(event: MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
}

  //const [pickupDate, setPickupDate] = useState(new Date());

  return (
    <Box
      position="relative"
      height="100vh"
      bg="white"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200%',
        height: '200%',
        //background: '(/C:\Users\DELL\Desktop\e68085d21d50e8856d9d46d33264959a.png) repeat',
       
      }}
    >
      <style>
        {`
          @keyframes moveBackground {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-50%, -50%); }
          }
        `}
      </style>
      <Box
        position="absolute"
        top="10%"
        left="50%"
        transform="translateX(-50%)"
        maxWidth="sm"
        width="100%"
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" color="black" mb={4} textAlign="center">
          Navigating Miles, Delivering Smiles
        </Text>
        <FormControl mb={4}>
          <FormLabel>Pickup Date</FormLabel>
          <Input type="date" placeholder="Enter pickup date" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Pickup Location</FormLabel>
          <Input placeholder="Enter pickup Location" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Delivery Address</FormLabel>
          <Input placeholder="Enter delivery location" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Total item weight</FormLabel>
          <HStack>
            <Input placeholder="Add weight" type="number" />
            <FormLabel>Kg</FormLabel>
          </HStack>
        </FormControl>
        <Stack spacing="6">
                <Button
                    bgColor={"black"}
                    onClick={() => {}}
                    color="white"
                    _hover={{ bgColor: "gray.700" }}
                >
                    Search
                </Button>
            </Stack>
        
        
      </Box>
    </Box>
  );
};

export default SearchDelivery ;
