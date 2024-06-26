import {
  Box,
  Flex,
  Heading,
  useMediaQuery,
  Image,
  Text,
} from "@chakra-ui/react";
import Footer from "pages/components/footer";
import React, { useState } from "react";
import DriverDetails from "./components/driver_details";
import VehicleDetails from "./components/vehicle_details";

const Register: React.FC = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 992px)");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = React.useState('');


  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleErrorMessage = (message) => {
    setErrorMessage(message);
  };



  return (
    <Flex direction="column" minHeight="100vh">
      {errorMessage && (
        <Box p={2} color="white" bg={"red.400"} textAlign="center">
          {errorMessage}
        </Box>
      )}
      {!isLargeScreen && (
        <Flex direction="row" bg="#05aed0" p="5">
          <Heading m="auto" color="white">
            Drop Here
          </Heading>
        </Flex>
      )}
      <Flex direction="row" flex="1">
        {isLargeScreen && (
          <Box
            w={["100%", "100%", "50%"]}
            bg="#05aed0"
            backgroundImage="url('/images/vehicle.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
          >
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              p="50"
              h="100%"
              textAlign="center"
            >
              <Flex alignItems="center" mb={4}>
                <Image src="/images/Black_T.png" w="14" />
                <Text fontSize="30px" fontWeight="800" color="black" ml={-2}>
                  Drop Here
                </Text>
              </Flex>
              <Text fontSize="40px" fontWeight="600" color="black" lineHeight="shorter">
                Wants to Earn Money!
              </Text>
              <Text color="black">
                Then, Join with us.
              </Text>
            </Flex>
          </Box>
        )}
        {step === 1 && <DriverDetails onNext={handleNext} onError={handleErrorMessage} />}
        {step === 2 && <VehicleDetails onBack={handleBack} onError={handleErrorMessage} />}
      </Flex>
      <Box mt={1}>
        <Footer />
      </Box>
    </Flex>
  );
};

export default Register;
