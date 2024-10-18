import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Stat, StatLabel, StatNumber, Heading, useColorModeValue, Flex, Icon } from '@chakra-ui/react';
import { FaUserTie, FaCity, FaUserClock, FaUsers } from 'react-icons/fa';
import DriverService from '../../../src/api/services/driverService';
import UserService from '../../../src/api/services/userService';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface Driver {
  id: string;
  street: string;
  city: string;
  province: string;
  proof_document: string;
  status: string;
}

const AdminHome = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await UserService.getUserDetails();
        if (response.status !== "error") {
          setUser(response.users || []);
          console.log(response);
        } else {
          throw new Error(response.message || "Failed to fetch user details");
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setIsLoading(true);
        const response = await DriverService.getDriver();
        if (response.status !== "error") {
          setDrivers(response.drivers || []);
        } else {
          throw new Error(response.message || "Failed to fetch drivers");
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setError("Failed to load driver data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const errorColor = 'red.500';

  if (isLoading) {
    return <Box></Box>;
  }

  if (error) {
    return <Box color={errorColor}>{error}</Box>;
  }

  const totalDrivers = drivers.length;
  const uniqueCities = drivers.reduce((acc: string[], driver) => {
    if (!acc.includes(driver.city)) {
      acc.push(driver.city);
    }
    return acc;
  }, []);
  const pendingDrivers = drivers.filter(driver => driver.status === "pending");

  const totalUsers = user.length;

  return (
    <Box minH="100vh" p="4" bg={bgColor}>
      <Heading mb={6}>Admin Dashboard</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <DashboardCard label="Total Drivers" number={totalDrivers.toString()} icon={FaUserTie} color="blue.500" />
        <DashboardCard label="Registered Cities" number={uniqueCities.length.toString()} icon={FaCity} color="green.500" />
        <DashboardCard label="Pending Drivers" number={pendingDrivers.length.toString()} icon={FaUserClock} color="orange.500" />
        <DashboardCard label="Total Users" number={totalUsers.toString()} icon={FaUsers} color="purple.500" />
      </Grid>
    </Box>
  );
};

const DashboardCard = ({ label, number, icon, color }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <GridItem colSpan={{ base: 3, md: 1 }}>
      <Box
        bg={bgColor}
        borderRadius="lg"
        boxShadow="sl"
        p={5}
        borderWidth="1px"
        borderColor={borderColor}
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-2px)', boxShadow: '1xl' }}
      >
        <Flex justify="space-between" align="center">
          <Stat>
            <StatLabel fontSize="lg" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
              {label}
            </StatLabel>
            <StatNumber fontSize="4xl" fontWeight="bold" mt={2}>
              {number}
            </StatNumber>
          </Stat>
          <Icon as={icon} boxSize={12} color={color} />
        </Flex>
      </Box>
    </GridItem>
  );
};

export default AdminHome;