import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  useColorModeValue,
  SimpleGrid,
  Text,
  Flex,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { FaUserTie, FaCity, FaUserClock, FaUsers, FaCar, FaBus, FaBiking, FaShuttleVan, FaMotorcycle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import DriverService from '../../../src/api/services/driverService';
import UserService from '../../../src/api/services/userService';
import RideService from '../../../src/api/services/rideService';
import vehicleService from '../../../src/api/services/vehicleService';

interface Vehicle {
  type: string;
}

interface Ride {
  ride_id: string;
  user_id: string;
  status: string;
  pickup_address: string;
  destination_address: string;
  created_at: string;
  updated_at: string;
}

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

const AdminAnalytics = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [rides, setRides] = useState<Ride[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [driversRes, usersRes, ridesRes, vehiclesRes] = await Promise.all([
          DriverService.getDriver(),
          UserService.getUserDetails(),
          RideService.getRides(),
          vehicleService.getVehicle()
        ]);

        setDrivers(driversRes.drivers || []);
        setUsers(usersRes.users || []);
        setRides(ridesRes.rides || []);
        setVehicles(vehiclesRes.vehicles || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box color="red.500">{error}</Box>;

  const driverStats = getDriverStats(drivers);
  const vehicleStats = getVehicleStats(vehicles);
  const rideStats = getRideStats(rides);

  return (
    <Box minH="100vh" p={6} bg={bgColor}>
      <Heading mb={6}>Analytics Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Section title="Driver Statistics">
          <StatGrid items={[
            { label: "Total Drivers", value: driverStats.totalDrivers, icon: FaUserTie, color: "blue.500" },
            { label: "Registered Cities", value: driverStats.uniqueCities, icon: FaCity, color: "green.500" },
            { label: "Pending Drivers", value: driverStats.pendingDrivers, icon: FaUserClock, color: "orange.500" },
            { label: "Accepted Drivers", value: driverStats.acceptedDrivers, icon: FaUserTie, color: "green.500" },
            { label: "Rejected Drivers", value: driverStats.rejectedDrivers, icon: FaUserTie, color: "red.500" },
            { label: "Suspended Drivers", value: driverStats.suspendedDrivers, icon: FaUserTie, color: "yellow.500" },
          ]} />
        </Section>
        <Section title="User & Ride Statistics">
          <StatGrid items={[
            { label: "Total Users", value: users.length, icon: FaUsers, color: "purple.500" },
            { label: "Total Rides", value: rides.length, icon: FaCar, color: "cyan.500" },
          ]} />
        </Section>
        <Section title="Vehicle Distribution">
          <VehiclePieChart data={vehicleStats} />
        </Section>
        <Section title="Ride Status">
          <RideStatusBarChart data={rideStats} />
        </Section>
      </SimpleGrid>
    </Box>
  );
};

const Section = ({ title, children }) => (
  <Box bg={useColorModeValue('white', 'gray.800')} p={5} borderRadius="lg" boxShadow="md">
    <Heading size="md" mb={4}>{title}</Heading>
    {children}
  </Box>
);

const StatGrid = ({ items }) => (
  <SimpleGrid columns={2} spacing={4}>
    {items.map((item, index) => (
      <Stat key={index}>
        <Flex align="center">
          <Icon as={item.icon} boxSize={8} color={item.color} mr={2} />
          <Box>
            <StatLabel>{item.label}</StatLabel>
            <StatNumber>{item.value}</StatNumber>
          </Box>
        </Flex>
      </Stat>
    ))}
  </SimpleGrid>
);

const VehiclePieChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const RideStatusBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const getDriverStats = (drivers: Driver[]) => ({
  totalDrivers: drivers.length,
  uniqueCities: new Set(drivers.map(d => d.city)).size,
  pendingDrivers: drivers.filter(d => d.status === "pending").length,
  acceptedDrivers: drivers.filter(d => d.status === "accepted").length,
  rejectedDrivers: drivers.filter(d => d.status === "rejected").length,
  suspendedDrivers: drivers.filter(d => d.status === "suspended").length,
});

const getVehicleStats = (vehicles: Vehicle[]) => {
  const types = ['car', 'bus', 'bike', 'van', 'tuktuk'];
  return types.map(type => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: vehicles.filter(v => v.type === type).length
  }));
};

const getRideStats = (rides: Ride[]) => {
  const statusCounts = rides.reduce((acc, ride) => {
    acc[ride.status] = (acc[ride.status] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));
};

export default AdminAnalytics;