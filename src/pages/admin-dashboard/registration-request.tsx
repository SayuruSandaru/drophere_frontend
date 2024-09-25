import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  useDisclosure,
  Image,
  useToast,
  Select,
  Spinner,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Eye, User, MapPin, FileText, ActivitySquare, Settings } from 'lucide-react';
import DriverService from '../../../src/api/services/driverService';

interface Driver {
  driver_id: number;
  user_id: number;
  street: string;
  city: string;
  province: string;
  proof_document: string;
  status: string;
}

const RegistrationRequestPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      const response = await DriverService.getDriver();
      setDrivers(response.drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast({
        title: 'Error fetching drivers',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (driverId: number, newStatus: string) => {
    setIsLoading(true);
    try {
      const response = await DriverService.updateDriverStatus(driverId, newStatus);
      console.log('Status update response:', response);  

      setDrivers(drivers.map(driver => 
        driver.driver_id === driverId ? { ...driver, status: newStatus } : driver
      ));
      toast({
        title: 'Status updated',
        description: `Driver ${driverId} status changed to ${newStatus}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating driver status:', error);
      let errorMessage = 'There was an error updating the driver status. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Error details:', error.stack);  
      }
      toast({
        title: 'Error updating status',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'accepted': return 'green';
      case 'rejected': return 'red';
      case 'suspended': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={5}>Driver Registration Requests</Text>
      {isLoading ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <TableContainer borderWidth="2px" borderColor="gray.300" borderRadius="lg" boxShadow="md">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th borderBottom="2px" borderColor="gray.300">
                  <Flex align="center">
                    <User size={16} style={{ marginRight: '8px' }} />
                    <Text>Driver ID</Text>
                  </Flex>
                </Th>
                <Th borderBottom="2px" borderColor="gray.300">
                  <Flex align="center">
                    <User size={16} style={{ marginRight: '8px' }} />
                    <Text>User ID</Text>
                  </Flex>
                </Th>
                <Th borderBottom="2px" borderColor="gray.300">
                  <Flex align="center">
                    <MapPin size={16} style={{ marginRight: '8px' }} />
                    <Text>Address</Text>
                  </Flex>
                </Th>
                <Th borderBottom="2px" borderColor="gray.300">
                  <Flex align="center">
                    <FileText size={16} style={{ marginRight: '8px' }} />
                    <Text>Document</Text>
                  </Flex>
                </Th>
                <Th borderBottom="2px" borderColor="gray.300">
                  <Flex align="center">
                    <ActivitySquare size={16} style={{ marginRight: '8px' }} />
                    <Text>Status</Text>
                  </Flex>
                </Th>
                <Th borderBottom="2px" borderColor="gray.300">
                  <Flex align="center">
                    <Settings size={16} style={{ marginRight: '8px' }} />
                    <Text>Action</Text>
                  </Flex>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {drivers.map((driver) => (
                <Tr key={driver.driver_id}>
                  <Td borderBottom="1px" borderColor="gray.200">{driver.driver_id}</Td>
                  <Td borderBottom="1px" borderColor="gray.200">{driver.user_id}</Td>
                  <Td borderBottom="1px" borderColor="gray.200">
                    <Text>{driver.street}</Text>
                    <Text fontSize="sm" color="gray.500">{`${driver.city}, ${driver.province}`}</Text>
                  </Td>
                  <Td borderBottom="1px" borderColor="gray.200">
                    <Button
                      leftIcon={<Eye size={16} />}
                      size="sm"
                      onClick={() => openImageModal(driver.proof_document)}
                      colorScheme="blue"
                    >
                      View
                    </Button>
                  </Td>
                  <Td borderBottom="1px" borderColor="gray.200">
                    <Badge colorScheme={getStatusColor(driver.status)} borderRadius="full" px={2} py={1}>
                      {driver.status.toUpperCase()}
                    </Badge>
                  </Td>
                  <Td borderBottom="1px" borderColor="gray.200">
                    <Select
                      size="sm"
                      value={driver.status}
                      onChange={(e) => handleStatusChange(driver.driver_id, e.target.value)}
                      isDisabled={isLoading}
                      borderColor="gray.300"
                      _hover={{ borderColor: "gray.400" }}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="suspended">Suspended</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Proof Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedImage && (
              <Image src={selectedImage} alt="Proof Document" maxW="100%" maxH="80vh" objectFit="contain" />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RegistrationRequestPage;