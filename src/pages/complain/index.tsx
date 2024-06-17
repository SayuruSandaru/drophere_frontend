import {
  Box,
  FormLabel,
  Center,
  RadioGroup,
  Link,
  Button,
  HStack,
  VStack,
  FormControl,
  Radio,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Complain = () => {
  const [action, setAction] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
  ];

  console.log("Steps:", steps);
  console.log("Active Step:", activeStep);

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setActiveStep(0);
  };

  const handleContinue = () => {
    // Handle the continue button click
    alert(`You selected: ${action}`);
  };

  return (
    <>
      <Center bg="skyblue" as="h1" h="100px" color="black" fontSize="3xl">
        Resolution Center
      </Center>
      <Flex justify="center" align="center">
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          height={330}
          justifyContent="center"
          padding={4}
          width="100%"
          maxWidth="800px"
          textAlign="center"
          alignItems={"center"}
          justifyItems="center"
        >

          <VStack spacing={4} align="center" mt={4}>
            <Text>Welcome! Here you can work things out and resolve issues regarding your orders</Text>
            <FormControl as="fieldset">
              <FormLabel as="legend">What can we help you do?</FormLabel>
              <RadioGroup onChange={setAction} value={action}>
                <VStack align="left">
                  <Radio value="modify">Modify the order</Radio>
                  <Radio value="extend">Extend the delivery time</Radio>
                  <Radio value="cancel">Ask the buyer to cancel this order</Radio>
                </VStack>
              </RadioGroup>
            </FormControl>
            <HStack justify="center" width="100%" mt={4}>
              <Button colorScheme="teal" onClick={handleContinue} isDisabled={!action}>
                Continue
              </Button>
              <Text>
                Couldn’t find what you need? Contact our{" "}
                <Link color="teal.500" href="#">
                  Customer Support
                </Link>
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default Complain;
