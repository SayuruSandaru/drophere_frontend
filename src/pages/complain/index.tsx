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
  Heading,
  Input,
  Textarea,
  useToast,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import UserService from "api/services/userService";

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
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);



  const handleContinue = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSubmit = (values, actions) => {
    console.log("Form submitted with values: ", values);
    toast({
      title: "Form submitted successfully",
      description: "Your complaint has been recorded. We will contact you shortly.",
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

  const createDispute = async (disputeData) => {
    try {
      setLoading(true);
      const response = await UserService.createDispute({
        category: "complain",
        status: "pending",
        message: details,
      });

      toast({
        title: "Dispute created successfully",
        description: "Your dispute has been created. We will contact you shortly.",
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error creating dispute: ", error);
    }
  };

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
              <Text>Welcome! Here you can work things out and resolve issues regarding your orders.</Text>
              <FormControl as="fieldset">
                <FormLabel as="legend">What can we help you do?</FormLabel>
                <RadioGroup onChange={setAction} value={action}>
                  <VStack align="left">
                    <Radio value="modify">Make a complaint</Radio>
                    <Radio value="cancel">Request to cancel the ride</Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
              <Button colorScheme="teal" onClick={handleContinue} isDisabled={!action}>
                Continue
              </Button>
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
                <Form>
                  <VStack spacing={4} align="center" mt={4}>
                    <Heading size="md">Add Details & Submit</Heading>
                    <Field name="firstName">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                          <FormLabel htmlFor="firstName">First Name</FormLabel>
                          <Input {...field} id="firstName" placeholder="Your first name" />
                          <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastName">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                          <FormLabel htmlFor="lastName">Last Name</FormLabel>
                          <Input {...field} id="lastName" placeholder="Your last name" />
                          <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.phone && form.touched.phone}>
                          <FormLabel htmlFor="phone">Phone Number</FormLabel>
                          <Input {...field} id="phone" placeholder="Your phone number"
                            onChange={e => {
                              form.setFieldValue("phone", e.target.value);
                              setPhone(e.target.value);
                            }}
                            value={field.value}
                          />
                          <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="details">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.details && form.touched.details}>
                          <FormLabel htmlFor="details">Details</FormLabel>
                          <Textarea {...field} id="details" placeholder="Describe your issue"
                            onChange={e => {
                              form.setFieldValue("details", e.target.value); // Update Formik's state
                              setDetails(e.target.value); // Update local state
                            }}
                            value={field.value}
                          />
                          <FormErrorMessage>{form.errors.details}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button colorScheme="teal" isLoading={isSubmitting} type="submit" onClick={createDispute}>
                      {loading ? "" : "Submit"}
                      {loading && <Spinner size="sm" />}
                    </Button>
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
