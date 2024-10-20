import {
  Box,
  Center,
  RadioGroup,
  Button,
  VStack,
  FormControl,
  Radio,
  Text,
  Flex,
  FormLabel,
  HStack,
  useToast,
  Heading,
  Textarea,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import dispatchService from "api/services/dispatchService";
import User from "model/user"; // Assuming this fetches the user's data

const steps = [{ title: "Select Action" }, { title: "Add Details & Submit" }];

const Stepper = ({ steps, activeStep }) => {
  return (
    <Flex width="100%" justify="center" my={4}>
      {steps.map((step, index) => (
        <VStack key={index} align="center" flex={1}>
          <Box
            borderRadius="50%"
            width="30px"
            height="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={index <= activeStep ? "teal.500" : "gray.300"}
            color="white"
          >
            {index + 1}
          </Box>
          <Text>{step.title}</Text>
        </VStack>
      ))}
    </Flex>
  );
};

const Complain = () => {
  const [action, setAction] = useState(""); // Radio button value for 'category'
  const [activeStep, setActiveStep] = useState(0); // Step control for form steps
  const [formData, setFormData] = useState({
    userId: "", // User ID
    status: "pending", // Status is always pending for new disputes
    category: "", // 'complain' or 'cancel'
    message: "", // User's message (complaint details)
  });
  const toast = useToast();

  useEffect(() => {
    const userId = User.getUserId();
    setFormData((prevData) => ({
      ...prevData,
      userId: userId,
    }));
  }, []);

  // Proceed to next step in form
  const handleContinue = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // Create the dispute
  const createDispute = async (dispute) => {
    try {
      const response = await dispatchService.createDispute(dispute);
      return response;
    } catch (error) {
      console.error("Error creating dispute: ", error);
      throw error;
    }
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    // Final data to be submitted
    const disputeData = {
      ...formData,
      category: action, // category will be set by the radio button ('complain' or 'cancel')
    };

    try {
      const response = await createDispute(disputeData); // Call the dispute creation API
      console.log("Dispute created:", response);
      if (response) {
        toast({
          title: "Complaint submitted successfully",
          description: "Your complaint has been submitted successfully.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });

        // Reset form data and move back to the first step
        setFormData({
          userId: formData.userId, // Keep the userId
          status: "pending",
          category: "",
          message: "",
        });
        setAction(""); // Reset the action to allow a new selection
        setActiveStep(0); // Reset back to the first step
      } else {
        toast({
          title: "Error submitting the form",
          description: "There was an error submitting your complaint.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Error submitting the form",
        description:
          error.message || "There was an error submitting your complaint.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Center bg="skyblue" as="h1" h="60px" color="black" fontSize="3xl">
        Resolution Center
      </Center>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
      >
        <Box
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          width="100%"
          maxWidth="800px"
          textAlign="center"
        >
          <Stepper steps={steps} activeStep={activeStep} />

          {activeStep === 0 && (
            <VStack spacing={4} align="center" mt={4}>
              <Text>
                Welcome! Please select the action you want to take regarding
                your orders.
              </Text>
              <FormControl as="fieldset">
                <FormLabel as="legend">What can we help you do?</FormLabel>
                <RadioGroup onChange={setAction} value={action}>
                  <VStack align="left">
                    <Radio value="complain">Make a complaint</Radio>
                    <Radio value="cancel">Request to cancel the ride</Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
              <HStack justify="center" width="100%" mt={4}>
                <Button
                  colorScheme="teal"
                  onClick={handleContinue}
                  isDisabled={!action} // Button is disabled until an action is selected
                >
                  Continue
                </Button>
              </HStack>
            </VStack>
          )}

          {activeStep === 1 && (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="center" mt={4} width="100%">
                <Heading size="md">Add Details & Submit</Heading>
                <Text>
                  Here you can add more details about your complaint and submit
                  it.
                </Text>

                <FormControl>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input
                    name="firstName"
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input
                    name="lastName"
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="message">Describe your problem</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your problem"
                    required
                  />
                </FormControl>

                <Flex justify="flex-end" width="100%" mt={4}>
                  <Button colorScheme="teal" type="submit">
                    Submit
                  </Button>
                </Flex>
              </VStack>
            </form>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Complain;
