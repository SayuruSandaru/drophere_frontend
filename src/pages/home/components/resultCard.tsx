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
} from "@chakra-ui/react";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
  name: string;
}

const CarInfo: React.FC<CarInfoProps> = ({
  imageUrl,
  altText,
  carName,
  date,
  from,
  to,
  availability,
  seatsLeft,
  price,
  name,
}) => {
    const navigate = useNavigate();
  return (
    <Box borderRadius="md" borderWidth="1px">
      <Flex direction={"row"}>
        <Image
          boxSize="144"
          objectFit="cover"
          borderRadius={"md"}
          m={5}
          src={imageUrl}
          alt={altText}
        />
        <Box m={4}>
          <Stack spacing={2}>
            <Text fontSize="lg">
              <Box as="span" fontWeight="bold">
                {carName}
              </Box>{" "}
            </Text>

            <Text fontSize="sm">{date}</Text>
            <Text fontSize="sm" mb={1}>
              From: {from}
            </Text>
            <Text fontSize="sm" mb={1}>
              To: {to}
            </Text>

            <Flex align="center">
              <Badge colorScheme="green" w={75}>
                {availability}
              </Badge>
              <Box ml={2} />
              <Icon
                as={MdAirlineSeatReclineExtra}
                w={4}
                h={4}
                color="gray.500"
                mt={0}
              />
              <Text ml={2}>{seatsLeft} seats left</Text>
            </Flex>

            <Divider
              sx={{
                height: "3px",
                borderRadius: "md",
                backgroundColor: "gray.200",
              }}
            />
            <Box
              onClick={() => navigate("/profile")}
              _hover={{ bg: "gray.50", cursor: "pointer",borderRadius:"md" }}
              cursor="pointer"
            >
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
        <Text fontSize="xl" fontWeight="bold" m={5}>
          {price}
        </Text>
      </Flex>
    </Box>
  );
};

export default CarInfo;
