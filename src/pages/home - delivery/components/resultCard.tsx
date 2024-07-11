import {
  Box,
  Stack,
  Flex,
  Text,
  Image,
  Icon,
  Badge,
  Spacer,
  Avatar,
  Divider,
  Button,
} from "@chakra-ui/react";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RouterConfig, { RouterPaths } from "router/routerConfig";

interface CarInfoProps {
  imageUrl: string;
  altText: string;
  carName: string;
  date: string;
  from: string;
  to: string;
  availability: string;
  seatsLeft: string;
  price: string;
  onClick: () => void
  onBook: () => void
  name: string;
}

const CarInfo: React.FC<CarInfoProps> = ({ imageUrl, altText, carName, date, from, to, availability, seatsLeft, price, name, onClick, onBook }) => {
  return (
    <Box borderRadius="md" borderWidth="1px" p={1} onClick={onClick} _hover={{ bg: "gray.50", cursor: "pointer", borderRadius: "md" }}>
      <Flex direction={{ base: "column", md: "row" }}>
        <Image
          boxSize={{ base: "100%", md: "144px" }}
          objectFit="cover"
          borderRadius={"md"}
          m={{ base: "auto", md: 5 }}
          src={imageUrl}
          alt={altText}
        />
        <Box m={4}>
          <Stack spacing={2}>
            <Text fontSize="lg">
              <Box as="span" fontWeight="bold">{carName}</Box>{" "}
            </Text>

            <Text fontSize="sm">{date}</Text>
            <Text fontSize="sm" mb={1}>
              From: {from}
            </Text>
            <Text fontSize="sm" mb={1}>
              To: {to}
            </Text>

            <Flex align="center">
              <Badge colorScheme="green" w={75}>{availability}</Badge>
              <Box ml={2} />
              <Icon as={MdAirlineSeatReclineExtra} w={4} h={4} color="gray.500" mt={0} />
              <Text ml={2}>{seatsLeft} seats left</Text>
            </Flex>
            <Divider
              sx={{
                height: "3px",
                borderRadius: "md",
                backgroundColor: "gray.200",
              }}
            />
            <Box  >
              <Flex align={"center"}>
                <Avatar
                  size="sm"
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                />
                <Text pl={"4"}>{name}</Text>
              </Flex>
            </Box>
          </Stack>
        </Box>
        <Spacer />
        <Text fontSize="xl" fontWeight="bold" m={{ base: 4, md: 5 }}>{price}</Text>
        <Button bg="black" color={"white"} m={4} onClick={onBook} >Book</Button>
      </Flex>
    </Box>
  );
};

export default CarInfo;

