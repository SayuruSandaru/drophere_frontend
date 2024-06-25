import {
  Box,
  Center,
  RadioGroup,
  Link,
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
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const steps = [
  { title: "Select Action" },
  { title: "Add Details & Submit" },
];

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
  const [action, setAction] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const toast = useToast();

  const handleContinue = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSubmit = (values, actions) => {
    toast({
      title: `Form submitted with action: ${action}`,
      description: `Details: ${values.details}, Contact: ${values.contact}, First Name: ${values.firstName}, Last Name: ${values.lastName}, Phone: ${values.phone}`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    contact: Yup.string().email("Invalid email address").required("Contact is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().matches(/^[0-9]+$/, "Phone number is not valid").required("Phone number is required"),
  });

  return (
    <>
      <Center bg="skyblue" as="h1" h="60px" color="black" fontSize="3xl">
        Resolution Center
      </Center>
      <Flex direction="column" align="center" justify="center" minHeight="100vh">
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
                Welcome! Here you can work things out and resolve issues
                regarding your orders.
              </Text>
              <Box />
              <FormControl as="fieldset">
                <FormLabel as="legend">What can we help you do?</FormLabel>
                <RadioGroup onChange={setAction} value={action}>
                  <VStack align="left">
                    <Radio value="modify">Make a complain</Radio>
                    <Radio value="cancel">
                      Request to cancel the ride
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
              <HStack justify="center" width="100%" mt={4}>
                <Button
                  colorScheme="teal"
                  onClick={handleContinue}
                  isDisabled={!action}
                >
                  Continue
                </Button>
              </HStack>
            </VStack>
          )}

          {activeStep === 1 && (
            <Formik
              initialValues={{
                details: "",
                contact: "",
                firstName: "",
                lastName: "",
                phone: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form style={{ width: "100%" }}>
                  <VStack spacing={4} align="center" mt={4} width="100%">
                    <Heading size="md">Add Details & Submit</Heading>
                    <Text>
                      Here you can add more details about your complaint and
                      submit it.
                    </Text>
                    <Field name="firstName">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.firstName && form.touched.firstName}
                        >
                          <FormLabel htmlFor="firstName">First Name</FormLabel>
                          <Input {...field} id="firstName" placeholder="" />
                          <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastName">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.lastName && form.touched.lastName}
                        >
                          <FormLabel htmlFor="lastName">Last Name</FormLabel>
                          <Input {...field} id="lastName" placeholder="" />
                          <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.phone && form.touched.phone}
                        >
                          <FormLabel htmlFor="phone">Phone Number</FormLabel>
                          <Input {...field} id="phone" placeholder="" />
                          <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="additionalInfo">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.additionalInfo && form.touched.additionalInfo}
                        >
                          <FormLabel htmlFor="additionalInfo">Describe your problem in details</FormLabel>
                          <Textarea {...field} id="additionalInfo" placeholder="" />
                          <FormErrorMessage>{form.errors.additionalInfo}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex justify="flex-end" width="100%" mt={4}>
                      <Button
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Flex>
                  </VStack>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Complain;
