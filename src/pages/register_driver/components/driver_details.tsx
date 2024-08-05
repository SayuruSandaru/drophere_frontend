import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Flex,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { createDriver } from 'api/driver';
import { fileUpload } from 'api/common';
import { updateUserData } from 'api/auth';

interface DriverDetailsProps {
  onNext: () => void;
  onError: (error: string) => void;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({ onNext, onError }) => {
  const [proofDocument, setProofDocument] = useState<File | null>(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (proofDocument && street && city && province) {
      onError(''); // Clear any previous error
      await uploadProofDocument();
    } else {
      onError('Please fill all the fields');
    }
  };

  const driver = async (imageurl: string) => {
    try {
      const res = await createDriver({
        street: street,
        city: city,
        province: province,
        proof_document: imageurl,
      });
      await updateUserData();

      setLoading(false);
      if (res) {
        onNext();
      } else {
        onError('Driver already exists.');
      }

    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.message || 'Failed to create driver. Please try again.';
      onError(errorMessage);
    }
  };

  const uploadProofDocument = async () => {
    try {
      if (!proofDocument) {
        return;
      }
      setLoading(true);
      const res = await fileUpload(proofDocument);
      await driver(res);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error.message || 'Failed to upload document. Please try again.';
      onError(errorMessage);
    }
  };

  return (
    <Flex direction="column" justifyContent="center" m="auto">
      <Container
        maxW="xl"
        pt={{ base: "12", md: "24 " }}
        py={{ base: "12", md: "24 " }}
        px={{ base: "0", sm: "8" }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing="8">
            <Stack>
              <Image src="/images/Black_T.png" w={"24"} m="auto" />
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size="md">Create Your Driver Account</Heading>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              bg={{ base: "transparent", sm: "bg.surface" }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl isRequired>
                    <FormLabel htmlFor="proofDocument">Upload Proof Document (ID/Driving License)</FormLabel>
                    <Input
                      id="proofDocument"
                      type="file"
                      border='none'
                      onChange={(e) => setProofDocument(e.target.files ? e.target.files[0] : null)}
                      required
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="street">Street</FormLabel>
                    <Input
                      id="street"
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="province">Province</FormLabel>
                    <Input
                      id="province"
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                    />
                  </FormControl>
                </Stack>
                <Stack mt="6" spacing="6">
                  <Button
                    bgColor={"black"}
                    color="white"
                    _hover={{ bgColor: "gray.700" }}
                    width="100%"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="md" /> : "Next"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Container>
    </Flex>
  );
};

export default DriverDetails;
