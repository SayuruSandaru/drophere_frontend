import { Box, FormLabel, Center, RadioGroup, Link, Button, HStack, VStack, FormControl, Radio, Image, Stack, Text, useBreakpointValue, Heading, useMediaQuery, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { colors } from "theme/colors";
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from "router/routerConfig";




const Complain = () => {
  const [action, setAction] = useState('');

  const handleContinue = () => {
    // Handle the continue button click
    // alert(You selected: ${action});


  }


    ;

  return (
    <><Center bg='skyblue' as="h1" h='100px' color='black' fontSize="3xl">
      Resolution Center
    </Center>
      <Flex justify='center' align='center'>
        <Box p={8}
          borderWidth={7}
          borderRadius="9g"
          boxShadow="9g"
          height={330}
          justifyContent="center"
          padding={0}
          width="900%"
          maxWidth="800px"
          textAlign="center"
          alignItems={"center"}
          justifyItems="center"

        >
          <VStack spacing={4} align="center" mt={4}>

            <Text>Welcome! Here you can work things out and resolve issues regarding your orders</Text>
            <FormControl as="fieldset" >
              <FormLabel as="legend" >What can we help you do?</FormLabel>
              <RadioGroup onChange={setAction} value={action}>
                <VStack align="left">
                  <Radio value="modify">      Modify the order     </Radio>
                  <Radio value="extend">Extend the delivery time          </Radio>
                  <Radio value="cancel">Ask the buyer to cancel this order</Radio>
                </VStack>
              </RadioGroup>
            </FormControl>
            <HStack justify="center" width="100%" mt={4}>
              <Button colorScheme="teal" onClick={handleContinue} isDisabled={!action}>
                Continue
              </Button>
              <Text>Couldn’t find what you need? Contact our <Link color="teal.500" href="#">Customer Support</Link></Text>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default Complain